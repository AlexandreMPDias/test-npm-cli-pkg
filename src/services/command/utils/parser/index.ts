import { Argv } from 'yargs';
import * as types from './types';
import getCommands from './commands';
import getOptions from './options';
import getBasic from './basic';

export * from './types';
export { getCommands, getOptions, getBasic };

export default (yargs: Argv): types.IShape => {
	return {
		...getBasic(yargs),
		commands: getCommands(yargs),
		options: getOptions(yargs),
	};
};
