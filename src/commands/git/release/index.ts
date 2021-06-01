import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Exec from '../../../services/exec';
import * as releaseUtils from './utils';
import Git from '../../../services/apis/Git';
import Log from '../../../services/log';

const command = CommandBuilder.create({
	command: 'release sprint name source',
	description: 'Creates a release branch at the remote',
	builder: (yargs) =>
		yargs
			.positional('sprint', {
				description: 'The current sprint',
				type: 'string',
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
			})
			.usage(`${chalk.yellow('release')} ${chalk.cyan.bold('[sprint] [name]')} ${chalk.magenta('<source>')}`)
			.example(
				`${chalk.yellow('release')} ${chalk.cyan.bold('20 Analytics')}`,
				'Creates a release branch named: [ YY.20_Analytics_Release ], copied from dev',
			),
}).handle((args) => {
	try {
		Git.hasGitDir();
	} catch (err) {
		Log.abort(err);
	}

	console.log(args);
	const targetBranchName = releaseUtils.join({ ...args, sprint: Number(args.sprint) });

	console.log('Creating branch ' + chalk.yellow('locally'));
	Exec.execSync(`git fetch -f origin ${args.source}:${targetBranchName}`);

	console.log('Creating empty commit message');
	Exec.execSync(`git commit --allow-empty-message -m "Created release branch ${args.name}"`);

	console.log('Pushing new branch to upstream');
	Exec.execSync(`git push -u origin ${targetBranchName}`);

	console.log(chalk.green('done'));
});

export default command;
