import chalk from 'chalk';
import { join } from 'path';
import FileService from '../../../file';
import { PathRelation } from '../../../file/types';
import { GitThis } from '../types';

interface IOptions {
	throwOnError?: boolean;
	relativeTo?: PathRelation;
}

function hasGitDir(this: GitThis, location: string | null = null, options: IOptions = { throwOnError: true }) {
	const loc = location || '';
	const gitPath = FileService.sync.locateInPath('.git', join(loc, '.git'));

	const exists = FileService.sync.exists(gitPath, {
		relativeTo: options.relativeTo || 'root',
	});

	if (options.throwOnError && !exists) {
		throw new Error(chalk.redBright(`No git directory found at [ ${chalk.cyan(loc)} ]`));
	}
	return exists;
}

export type Type = typeof hasGitDir;

export { hasGitDir as method };
