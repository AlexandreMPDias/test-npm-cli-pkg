import { pipe } from 'ramda';
import CommandBuilder from '../../services/command';
import create from './create';

const subCommands = {
	create,
};

const addCommands = pipe(subCommands.create);

const command = CommandBuilder.create({
	command: 'config',
	description: 'Config related commands',
	builder: (yargs) => addCommands(yargs.demandCommand(1).usage('create [method]')),
	middlewares: ['requireKnownCommands'],
});

export default command;
