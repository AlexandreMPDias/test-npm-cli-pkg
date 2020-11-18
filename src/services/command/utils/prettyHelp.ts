import chalk from 'chalk';

type Group = { cmd: string; desc: string };

const transpose = <T>(m: T[][]): T[][] => m[0].map((_, i) => m.map((x) => x[i]));

const applyForNonEmpty = (cb: (ss: string) => string) => {
	return (s: string) => {
		return s ? cb(s) : s;
	};
};

const colors = {
	cmd: applyForNonEmpty(chalk.green),
	method: applyForNonEmpty(chalk.yellow),
	methodArg: {
		required: applyForNonEmpty(chalk.cyan),
		optional: applyForNonEmpty(chalk.hex('#ffa500')),
	},
	option: {
		label: applyForNonEmpty(chalk.yellow),
		value: applyForNonEmpty(chalk.magenta),
	},
};

const PART_SIZE = 33;
const SPLIT_KEY = '__START_KEY__';
const JOIN_KEY = '__JOIN_KEY__';

const paint = (split: string[], version?: string) => {
	const iter = { nested: '' as any };

	return split.map((line, index) => {
		if (index === 0) {
			const name = line.replace(/^(.+)/, '$1');
			if (version) {
				return colors.cmd(`{ ${name}@v${version} }`);
			}
			return colors.cmd(`{ ${name} }`);
		}
		if (index === 1) {
			return null;
		}
		if (iter.nested !== null && line.match(/^\S/)) {
			iter.nested = null;
		}
		if (line.startsWith('Commands')) {
			iter.nested = 'commands';
			return '\n' + line;
		}
		if (line.startsWith('Options')) {
			iter.nested = 'options';
			return '\n' + line;
		}
		switch (iter.nested) {
			case 'commands': {
				const isStart = line.match(/^\s{2}\w/);
				const cmd = line.slice(0, PART_SIZE).trim();
				const desc = ' ' + line.slice(PART_SIZE).trim();
				if (cmd) {
					const prefix = isStart ? SPLIT_KEY : JOIN_KEY;
					return [prefix + cmd, desc];
				}
				return [cmd, desc];
			}
			case 'options': {
				const transforms: Array<(s: string) => string> = [
					(s) => s.replace(/(--?\S+)/g, colors.option.label('$1')),
					(s) => s.replace(/(\[[a-z\. ,]+\])/g, colors.option.value('$1')),
				];
				return transforms.reduce((curr, trans) => trans(curr), line);
			}
		}
		return line;
	});
};

export default (args: string, version?: string) => {
	const split: string[] = args.replace(/index\.js\s+/gm, '').split('\n');
	const formatted: Array<string[]> = paint(split, version)
		.filter((x) => x !== null)
		.map((row) => (Array.isArray(row) ? row! : [row!, '']));

	const transposed = transpose(formatted);

	const carry = { start: null as any, out: null as any };
	const output: Array<string | Group> = new Array(formatted.length).fill('');

	formatted.forEach((_, index) => {
		const left = transposed[0][index] || '';
		const right = transposed[1][index] || '';

		if (left.match(SPLIT_KEY)) {
			carry.start = index;
			output[index] = {
				cmd: '',
				desc: '',
			};
		}
		if (carry.start !== null) {
			(output[carry.start] as any).cmd += left;
			(output[carry.start] as any).desc += right;
		} else {
			output[index] = left;
		}
		if (left.match(JOIN_KEY)) {
			carry.start = null;
		}
	});
	const v3 = output.map((o) => {
		if (typeof o === 'object') {
			const transforms: Array<(s: string) => string> = [
				(s) => s.replace(SPLIT_KEY, '• '),
				(s) => s.replace(/^(.{2})(\S+)\s/g, `$1${colors.method('$2')} `),
				(s) => s.replace(/(\[[a-zA-Z\-\. ]+\])/g, colors.methodArg.required('$1')),
				(s) => s.replace(/(<[a-zA-Z\-\. ]+>)/g, colors.methodArg.optional('$1')),
			];
			const cmd = transforms.reduce((curr, trans) => trans(curr), o.cmd);
			return `${cmd}\n${o.desc}`;
		}
		return o;
	});
	const v4 = v3
		.join('\n')
		.split('\n')
		.map((x) => x.replace(JOIN_KEY, ' ').replace(/^\s+/, ''));

	const v5 = v4
		.map((x) => x.trim())
		.join('\n')
		.replace(/\n\n/gm, '\n');

	console.log(v5);
};
