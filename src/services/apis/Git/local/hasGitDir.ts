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
	const _path = join(location || '', '.git');
	const exists = FileService.sync.exists(_path, {
		relativeTo: options.relativeTo,
	});

	if (options.throwOnError && !exists) {
		throw new Error(chalk.redBright(`No git directory found at [ ${chalk.cyan(location)} ]`));
	}
	return exists;
}

export type Type = typeof hasGitDir;

export { hasGitDir as method };
