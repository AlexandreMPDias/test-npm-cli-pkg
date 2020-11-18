import { pipe } from 'ramda';
import CommandBuilder from '../../services/command';
import pullRequest from './pull-request';
import release from './release';

const subCommands = {
	'pull-request': pullRequest,
	release,
};

const addCommands = pipe(subCommands['pull-request'], subCommands.release);

const command = CommandBuilder.create({
	command: 'git',
	description: 'Git related commands',
	builder: (yargs) => addCommands(yargs.demandCommand(1).version('alfa')),
	validation: (argv) => {
		console.log(argv);
		if (!CommandBuilder.utils.paramIncludesAny(argv, ...Object.keys(subCommands))) {
			return `Unsupported method [ ${argv._[1]} ]`;
		}
	},
});

export default command;
