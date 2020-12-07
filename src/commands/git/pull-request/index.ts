import { basename } from 'path';
import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import Utils from '../../../services/utils';
import getGitData, { GitData } from './getGitData';
import Git from '../../../services/git';

function buildUrl({ org, origin, branch, target }: GitData) {
	const packageName = basename(origin).replace('.git', '');
	return `https://github.com/${org}/${packageName}/compare/${target}...${branch}?expand=1`;
}

const command = CommandBuilder.create({
	command: 'pull-request [branch]',
	description: "Opens the github's create pull request's page using the default browser",
	builder: (yargs) =>
		yargs.positional('branch', {
			description: 'The target branch',
			type: 'string',
			default: 'dev',
		}),
}).handle(({ branch }) => {
	const git = getGitData(branch);
	if (Git.checkBranchExists(git.target)) {
		const url = buildUrl(git);
		console.log(`- opening PR for [ ${chalk.magenta(git.branch)} ] to [ ${chalk.cyan(git.target)} ]`);
		Utils.openLink(url);
	} else {
		console.error(chalk.redBright('Branch not found in remote'));
	}
});

export default command;
