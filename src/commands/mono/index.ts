import { pipe } from 'ramda';
import CommandBuilder from '../../services/command';
import clone from './clone';

const subCommands = {
	clone,
};

const addCommands = pipe(subCommands.clone);

const command = CommandBuilder.create({
	command: 'mono',
	description: 'Mono-repo related commands',
	builder: (yargs) => addCommands(yargs.demandCommand(1).usage('mono [method]')),
	middlewares: ['requireKnownCommands'],
});

export default command;
