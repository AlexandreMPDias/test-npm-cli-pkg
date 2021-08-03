import chalk from 'chalk';
import { join } from 'path';
import FileService from '../../../file';
import { PathRelation } from '../../../file/types';
import { GitThis } from '../types';

interface IOptions {
	throwOnError?: boolean;
	relativeTo?: PathRelation;
}

class GitDirCache {
	private readonly cache: Record<string, boolean>;
	private readonly key: string;

	constructor(ctx: any, gitPath: string, relativeTo: string) {
		if (!ctx.git_dir_cache) {
			ctx.git_dir_cache = {};
		}
		this.cache = ctx.git_dir_cache;
		this.key = gitPath + '_' + relativeTo;
	}

	set = (result: boolean) => {
		this.cache[this.key] = result;
	};

	entryExistsInCache = () => {
		return this.key in this.cache;
	};

	exists = () => {
		return !!this.cache[this.key];
	};
}

function hasGitDir(this: GitThis, location: string | null = null, options: IOptions = { throwOnError: true }) {
	const loc = location || '';
	const relativeTo = options.relativeTo || 'root';

	const cache = new GitDirCache(this, loc, relativeTo);

	if (cache.entryExistsInCache()) {
		return cache.exists();
	}

	const gitPath = FileService.sync.locateInPath('.git', join(loc, '.git'));

	const exists = FileService.sync.exists(gitPath, {
		relativeTo: options.relativeTo || 'root',
	});

	cache.set(exists);

	if (options.throwOnError && !exists) {
		throw new Error(chalk.redBright(`No git directory found at [ ${chalk.cyan(loc)} ]`));
	}
	return exists;
}

export type Type = typeof hasGitDir;

export { hasGitDir as method };
