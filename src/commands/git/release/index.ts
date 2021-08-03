import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Exec from '../../../services/exec';
import * as releaseUtils from './utils';
import Git from '../../../services/apis/Git';
import Log from '../../../services/log';
import openPullRequest from '../pull-request/handle';

const command = CommandBuilder.create({
	command: 'release <name> [source]',
	description: 'Creates a release branch at the remote',
	builder: (yargs) =>
		yargs
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
			.option('sprint', {
				description: 'The current sprint',
				type: 'number',
				coerce: releaseUtils.getDefaultSprintNumber,
				default: releaseUtils.getDefaultSprintNumber.default,
			})
			.usage(`${chalk.yellow('release')} ${chalk.cyan.bold('[sprint] [name]')} ${chalk.magenta('<source>')}`)
			.example(
				`${chalk.yellow('release')} ${chalk.cyan.bold('20 Analytics')}`,
				'Creates a release branch named: [ YY.20_Analytics_Release ], copied from dev',
			),
}).handle((args) => {
	try {
		releaseUtils.logs.object(args, ['name'], ['sprint'], ['source']);

		Git.hasGitDir();
		const targetBranchName = releaseUtils.join(args);

		const oldBranch = Git.get.activeBranch.sync()!;

		console.log(chalk.red('active-branch'), oldBranch);

		releaseUtils.logs.single('target-branch', targetBranchName, chalk.green);

		console.log('Creating branch ' + chalk.yellow('locally'));
		Exec.execSync(`git fetch -f origin ${args.source}:${targetBranchName}`);

		console.log('Checking out to new branch');
		Git.checkout(targetBranchName);

		console.log('Creating empty commit message');
		Git.commit.empty(`Created release branch ${args.name}`);

		console.log('Pushing new branch to upstream');
		Exec.execSync(`git push -u origin ${targetBranchName}`);

		openPullRequest({ branch: oldBranch });

		console.log(`Checking out back to source branch: ${chalk.red(oldBranch)}`);
		Git.checkout(oldBranch);

		console.log(chalk.green('done'));

		releaseUtils.logs.skip();
	} catch (err) {
		Log.abort(err);
	}
});

export default command;
