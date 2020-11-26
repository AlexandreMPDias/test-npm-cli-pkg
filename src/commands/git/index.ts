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
	builder: (yargs) => addCommands(yargs.demandCommand(1).usage('git [method]')),
	middlewares: ['requireKnownCommands'],
});

export default command;
