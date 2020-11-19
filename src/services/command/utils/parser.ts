import { white } from 'chalk';
import { Argv } from 'yargs';

export interface IOptions {
	alias: string;
	desc: string;
	flags: string;
}

export interface ICommand {
	name: string;
	usage: string;
	description: string;
}

export interface IShape {
	name: string;
	description: string;
	commands: ICommand[];
	options: IOptions[];
}

const getInstance = (yargs: Argv) => {
	const y: any = yargs;
	if ('getUsageInstance' in y) {
		return y.getUsageInstance();
	}
	return y;
};

export const getOptions = (yargs: Argv) => {
	const opts: Array<string> = [];
	yargs.showHelp((help) => {
		let curr: string = '';
		let inOptions: boolean = false;
		let pastOptions: boolean = false;
		help.split('\n').forEach((line, index) => {
			if (line.startsWith('Options')) {
				inOptions = true;
				pastOptions = true;
				return;
			}
			if (inOptions) {
				if (line.match(/^\s*$/)) {
					inOptions = false;
					if (curr) {
						opts.push(curr);
					}
					return;
				}
				if (line.match(/^\s+-/)) {
					if (curr) {
						opts.push(curr.trimLeft());
					}
					curr = line;
				} else {
					curr = `${curr} ${line.trim()}`;
				}
			} else if (pastOptions) {
				console.log(line);
			}
		});
	});
	const options = opts
		.map((opt) => opt.replace(/\s\s+/gm, '\t'))
		.map((opt) => {
			const [alias, desc, flags] = opt.split('\t').map((x) => x.trim());
			return { alias, desc, flags };
		});
	return options;
};

export const getCommands = (yargs: Argv): ICommand[] => {
	const i = getInstance(yargs);

	const parseCommand = (cmd: any[]): ICommand => {
		const [usage, description, idk1, idk2, idk3] = cmd;
		const name = usage.replace(/(\[.+\])|(<.+>)/g, '').trim();
		return { usage, description, name };
	};

	return i.getCommands().map(parseCommand);
};

export const getBasic = (yargs: Argv) => {
	const _out = { name: '', description: '' };

	yargs.showHelp((help) => {
		let inDesc = false;
		help.split('\n')
			.map((x) => x.trim())
			.forEach((line, index) => {
				if (index === 0) {
					if (line.match(/^[a-zA-Z\.]+\s<command>$/)) {
						_out.name = '';
					} else {
						_out.name = line.replace(/^\S+\s+/, '');
					}
				}
				if (index === 1) {
					inDesc = true;
				}
				if (inDesc && !line.length) {
					inDesc = false;
				}
				if (inDesc) {
					_out.description += line;
				}
			});
	});

	return _out;
};

export default (yargs: Argv): IShape => {
	return {
		...getBasic(yargs),
		commands: getCommands(yargs),
		options: getOptions(yargs),
	};
};
