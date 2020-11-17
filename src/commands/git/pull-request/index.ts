import { basename } from 'path';
import chalk from 'chalk';

import Platform from '../../../services/platform';
import Exec from '../../../services/exec';
import CommandBuilder from '../../../services/command';

function getGitData() {
	return {
		origin: Exec.execSync("echo git config --get remote.origin.url"),
		branch: Exec.execSync("echo git rev-parse --abbrev-ref HEAD")
	}
}

function buildUrl({ origin, branch = 'dev' }: Record<string, string>) {
	const packageName = basename(origin).replace('.git', '');
	return `https://github.com/liberedu/${packageName}/compare/dev...${branch}?expand=1`
}

async function openLink(url: string = 'http://localhost') {
	const open = Platform.select({ darwin: 'open', win32: 'start', default: 'xdg-open' });
	await Exec.exec(`echo ${open} "${url}"`);
	console.log(chalk.green(`done.`));
}

const command = CommandBuilder.create({
	name: 'pull-request',
	flags: {},
	description: "Created a pull request for the current branch",
	params: [
		{
			name: 'branch',
			description: '<branch=dev>, the target branch',
			required: true,
			defaultTo: 'dev'
		}
	],
	handle: ([branch = 'dev']) => {
		const git = getGitData();
		const url = buildUrl(git);
		console.log(`- opening PR for [ ${chalk.magenta(git.branch)} ] to [ ${chalk.cyan(branch)} ]`)
		openLink(url)
	}
})

export default command;