import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Exec from '../../../services/exec';
import * as releaseUtils from './utils';

const command = CommandBuilder.create({
	command: 'release [sprint] [name] <source>',
	description: 'Creates a release branch at the remote',
	builder: (yargs) =>
		yargs
			.positional('sprint', {
				description: 'The current sprint',
				type: 'number',
				demandOption: true,
			})
			.positional('name', {
				description: 'An identifier for the branch',
				type: 'string',
				demandOption: true,
			})
			.positional('source', {
				description: "The source branch's name",
				type: 'string',
				default: 'dev',
			}),
}).handle(({ sprint, name, source }) => {
	const targetBranchName = releaseUtils.join({ sprint, name, source });

	console.log(`Creating branch: [ ${chalk.cyan(targetBranchName)} ]\n`);

	console.log('Creating branch ' + chalk.yellow('locally'));
	Exec.execSync(`git fetch -f origin ${source}:${targetBranchName}`);

	console.log('Pushing new branch to upstream');
	Exec.execSync(`git push -u origin ${targetBranchName}`);

	console.log(chalk.green('done'));
});

export default command;
