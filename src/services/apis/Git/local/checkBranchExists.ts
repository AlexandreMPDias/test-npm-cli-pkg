import chalk from 'chalk';
import { runSync } from '../../../run';
import { GitThis } from '../types';

interface IOptions {
	verbose?: boolean;
}

function checkBranchExists(this: GitThis, target: string, options: IOptions = { verbose: true }) {
	const url = this.url;
	const output = runSync(
		() => `git ls-remote --heads ${this.url} ${target}`,
		`checking if branch ${chalk.magenta(target)} exists in remote`,
		{
			error: options.verbose,
			start: options.verbose,
			success: options.verbose,
		},
	);
	const exits = (output?.length ?? 0) > 0;

	if (!exits) {
		throw new Error(chalk.redBright(`Branch [ ${chalk.magenta(target)} ] not found in ${chalk.cyan(url)}`));
	}
	return exits;
}

export type Type = typeof checkBranchExists;

export { checkBranchExists as method };
