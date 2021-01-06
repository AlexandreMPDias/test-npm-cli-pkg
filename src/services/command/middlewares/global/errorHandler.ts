import chalk from 'chalk';
import { Argv } from 'yargs';
import parser from '../../utils/parser';
import prettifyParsed from '../../utils/prettifyParsed';

const prettyHelpMiddleware = <T = {}>(y: Argv<T>): Argv<T> => {
	return y.fail((msg, err, yargs) => {
		if (err) {
			console.log(prettifyParsed(parser(yargs)));
			console.log(chalk.red(msg));
			process.exit(1);
		}
	});
};

export default prettyHelpMiddleware;
