import chalk from 'chalk';

export class GitDirNotFoundError extends Error {
	constructor(public readonly location: string) {
		super(chalk.redBright(`No git directory found at [ ${chalk.cyan(location)} ]`));
	}
}
