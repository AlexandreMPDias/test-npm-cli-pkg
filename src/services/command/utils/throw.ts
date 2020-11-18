import chalk from 'chalk';
import { Argv } from "yargs";
import prettyHelp from './prettyHelp';

interface IErrorOptions {
	/**
	 * Command's version
	 */
	version?: string;

	/**
	 * Calls process.exit(1) on end
	 */
	exit?: boolean
}

export default (y: Argv, error: string, options: IErrorOptions = {}) => {
	y.showHelp((args) => {
		console.error(chalk.red(`Error: ${error}`));
		prettyHelp(args, options.version);

	});
	if (options.exit) {
		process.exit(1)
	}
}