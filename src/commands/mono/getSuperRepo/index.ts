import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Log from '../../../services/log';

const command = CommandBuilder.create({
	command: 'getSuperRepo',
	description: 'Copies the super repo structure to the current directory',
	builder: (yargs) =>
		yargs
			.usage(`${chalk.yellow('getSuperRepo')}`)
			.example(`${chalk.yellow('getSuperRepo')}`, 'Copies the super repo structure to the current directory'),
}).handle(async (yargs) => {
	Log.info(`copying [ ${chalk.cyan('super-repo')}`);
	const superRepoHandler = await import('../getSuperRepo/handler');
	superRepoHandler.clone();
	Log.success(`copied [ ${chalk.cyan(yargs.target)}`);
});

export default command;
