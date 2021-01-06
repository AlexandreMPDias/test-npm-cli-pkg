import { pipe } from 'ramda';
import CommandBuilder from '../../services/command';
import clone from './clone';
import getSuperRepo from './getSuperRepo';

const subCommands = {
	clone,
	getSuperRepo,
};

const addCommands = pipe(subCommands.clone, subCommands.getSuperRepo);

const command = CommandBuilder.create({
	command: 'mono',
	description: 'Mono-repo related commands',
	builder: (yargs) => addCommands(yargs.demandCommand(1).usage('mono [method]')),
	middlewares: ['requireKnownCommands'],
});

export default command;
