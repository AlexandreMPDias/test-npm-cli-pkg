import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Log from '../../../services/log';

const command = CommandBuilder.create({
	command: 'clone target',
	description: 'Clones a repository to the current directory',
	builder: (yargs) =>
		yargs
			.positional('target', {
				description: 'What to clone',
				choices: ['mobile'] as const,
				demandOption: true,
			})
			.usage(`${chalk.yellow('clone')} ${chalk.cyan.bold('[target]')}`)
			.example(
				`${chalk.yellow('clone')} ${chalk.cyan.bold('mobile')}`,
				'Clones a repository to the current directory',
			),
}).handle(async (yargs) => {
	Log.info(`cloning [ ${chalk.cyan(yargs.target)}`);
	switch (yargs.target) {
		case 'mobile': {
			const superRepoHandler = await import('./superRepo');
			superRepoHandler.clone();
			break;
		}
		default: {
			throw new Error('Invalid Clone method');
		}
	}
	Log.success(`cloned [ ${chalk.cyan(yargs.target)}`);
});

export default command;
