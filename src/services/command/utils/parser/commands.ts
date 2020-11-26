import { Argv } from 'yargs';
import * as types from './types';

const getInstance = (yargs: Argv) => {
	const y: any = yargs;
	if ('getUsageInstance' in y) {
		return y.getUsageInstance();
	}
	return null;
};

const getCommands = (yargs: Argv): types.ICommand[] => {
	const i = getInstance(yargs);

	const parseCommand = (cmd: any[]): types.ICommand => {
		const [usage, description, idk1, idk2, idk3] = cmd;
		const name = usage.replace(/(\[.+\])|(<.+>)/g, '').trim();
		return { usage, description, name };
	};

	if (i) {
		return i.getCommands().map(parseCommand);
	}

	return (yargs as any).getCommands().map(parseCommand);
};

export default getCommands;
