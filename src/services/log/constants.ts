import chalk, { Chalk } from 'chalk';
import * as types from './types';

export const INITIAL_OPTIONS: types.ILogOptions = {
	debugLevel: 'log',
	mode: 'extended',
};

export const COLORS: Record<types.LogType, Record<'base' | 'bright', Chalk> & { tag: string }> = {
	warn: {
		tag: 'warning',
		base: chalk.yellow,
		bright: chalk.yellowBright,
	},
	error: {
		tag: 'error',
		base: chalk.red,
		bright: chalk.redBright,
	},
	info: {
		tag: 'log',
		base: chalk.white,
		bright: chalk.whiteBright,
	},
	success: {
		tag: 'success',
		base: chalk.greenBright,
		bright: chalk.greenBright,
	},
};
