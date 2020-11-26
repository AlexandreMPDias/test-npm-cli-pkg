import parser from '../../utils/parser';
import prettifyParsed from '../../utils/prettifyParsed';
import { Argv } from 'yargs';

const prettyHelpMiddleware = <T>(yargs: Argv<T>): Argv<T> => {
	return yargs.help(false).check((argv) => {
		if (argv.help || argv.h) {
			console.log(prettifyParsed(parser(yargs)));
			process.exit(0);
		}
	}, true);
};

export default prettyHelpMiddleware;
