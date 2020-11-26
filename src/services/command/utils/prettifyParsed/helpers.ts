import { IShape } from '../parser';
import { compose as _ramdaCompose } from 'ramda';
import chalk from 'chalk';

const compose = (_ramdaCompose as unknown) as (...args: Utils.PipeFn<string>[]) => Utils.PipeFn<string>;

const applyForNonEmpty = (cb: Utils.PipeFn<string>) => (s: string = '$1') => (s ? cb(s) : s);


type WUT = `x${1 | 2 | 3 | 4 | 5 | 6}`;

const basicTab = ' '.repeat(2);
const tab: string & Record<WUT,string> = Object.assign(basicTab, {
	x1: basicTab,
	x2: basicTab.repeat(2),
	x3: basicTab.repeat(3),
	x4: basicTab.repeat(4),
	x5: basicTab.repeat(5),
	x6: basicTab.repeat(6),
})

const colors = {
	name: applyForNonEmpty(chalk.green.underline.bold),
	description: applyForNonEmpty(chalk.white),
	commands: {
		description: applyForNonEmpty(chalk.white),
		name: applyForNonEmpty(chalk.yellow.underline),
		args: {
			required: applyForNonEmpty(chalk.cyan),
			optional: applyForNonEmpty(chalk.hex('#ffa500')),
		},
	},
	option: {
		desc: applyForNonEmpty(chalk.white),
		alias: applyForNonEmpty(chalk.cyan),
		flags: applyForNonEmpty(chalk.magenta),
	},
};

const paintFlags = (flags: string[]) => {
	return flags.map(flag => flag.slice(1).replace(/\]$/,'')).map(flag => {
		if(['boolean', 'string', 'array', 'number'].includes(flag)) {
			return chalk.yellowBright;
		}
		if(flag.startsWith('[default')) {
			return chalk.underline.blue;
		}
		return chalk.bold.greenBright;
	}).map((color, index) => color(flags[index]))
}

export const paintParsed = (parsed: IShape) => {
	return {
		name: colors.name(parsed.name),
		description: colors.description(parsed.description),
		commands: parsed.commands.map((cmd) => {
			const col = colors.commands;
			const dot = chalk.bold('·');

			const usage =
				`${tab}${dot} ${col.name(cmd.name)} ` +
				compose(
					(s: string) => s.replace(/^\S+/, '').trim(),
					(s: string) => s.replace(/(\[[a-zA-Z\-\. ]+\])/g, col.args.required()),
					(s: string) => s.replace(/(<[a-zA-Z\-\. ]+>)/g, col.args.optional()),
				)(cmd.usage);

			const description = col.description(cmd.description);

			if (description) {
				return [usage, tab.x3 + description, ''].join('\n');
			}
			return usage;
		}),
		options: parsed.options.map((opt) => {
			const col = colors.option;
			const alias = `${tab}${opt.aliases.join(', ')}`.padEnd(20, ' ');
			const painted = {
				alias: col.alias(alias),
				desc: col.desc(opt.desc),
				flags: paintFlags(opt.flags).join(' '),
			};
			return `${painted.alias}\t${painted.flags}\n${tab.x2}${painted.desc}`;
		}),
	};
};
