import chalk from 'chalk';
import { Argv } from 'yargs';
import prettyHelp from './prettyHelp';
import yargsParser from './parser';

interface IErrorOptions {
	/**
	 * Command's version
	 */
	version?: string;

	/**
	 * Calls process.exit(1) on end
	 */
	exit?: boolean;
}

export default (y: Argv, error: string, options: IErrorOptions = {}) => {
	if (error) {
		// console.log(yargsParser(y));
		y.showHelp((help: string) => {
			// console.error(chalk.red(`Error: [${error}]`));
			// console.log(detailed(help));
			// prettyHelp(help, options.version);
		});
	}
	if (options.exit) {
		process.exit(1);
	}
};
