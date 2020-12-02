import chalk from 'chalk';
import { Arguments } from 'yargs';
import { LogInstance } from '../../../services/log';
import * as consts from '../constants';
import align from './align';

const colors = [chalk.red, chalk.greenBright, chalk.red];

const header = (argv: Arguments<consts.IConfig>, log: LogInstance) => {
	const { fileName, mode, prop } = argv;

	const values = align.center(fileName, mode, prop);
	const optionsName = align
		.left(...[`File`, `File's props`, `Mode`].map((s) => `${s} set to:`))
		.map((s) => chalk.cyan(s));

	optionsName.forEach((optionName: string, index: number) => {
		const value = values[index];
		const color = colors[index];
		log.simple.info(`${optionName} [ ${color(value)} ]`);
	});
	log.simple.info('');
};

export default header;
