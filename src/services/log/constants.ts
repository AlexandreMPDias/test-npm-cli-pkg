import chalk from 'chalk';
import * as types from './types';

export const INITIAL_OPTIONS: types.ILogOptions = {
	debugLevel: 'log',
	mode: 'extended',
};

export const COLORS = {
	warning: {
		base: chalk.yellow,
		bright: chalk.yellowBright,
	},
	error: {
		base: chalk.red,
		bright: chalk.redBright,
	},
	log: {
		base: chalk.white,
		bright: chalk.whiteBright,
	},
};
