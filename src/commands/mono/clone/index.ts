import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import * as repos from '../../../assets/git/repositories';
import * as types from './types';

const choices: types.Choices = repos.list.reduce((total, curr) => {
	return total.concat(curr.alias);
}, [] as any[]);

const command = CommandBuilder.create({
	command: 'clone <target...>',
	description: 'Clones a repository to the current directory',
	builder: (yargs) =>
		yargs
			.positional('target', {
				description: 'What to clone',
				choices, // ! DOESNT WORK...
				demandOption: true,
			})
			.usage(`${chalk.yellow('clone')} ${chalk.cyan.bold('[target]')}`)
			.example(
				`${chalk.yellow('clone')} ${chalk.cyan.bold('native')} ${chalk.cyan.bold('tutor')}`,
				'Clones a repository to the current directory',
			),
	middlewares: ['requireKnownCommands'],
}).handle(async (yargs) => {
	const { handler } = await import('./handler');
	handler(yargs as any);
});

export default command;
