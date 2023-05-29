import FileService from '../../../../file';
import { PathRelation } from '../../../../file/types';
import { GitThis } from '../../types';
import { GitDirCache } from './git-dir-cache';
import { GitDirNotFoundError } from './not-found';

interface IOptions {
	throwOnError?: boolean;
	relativeTo?: PathRelation;
}

function hasGitDir(this: GitThis, location: string | null = null, options: IOptions = { throwOnError: true }) {
	const loc = location || '';
	const relativeTo = options.relativeTo || 'root';

	const cache = new GitDirCache(this, loc, relativeTo);

	if (cache.entryExistsInCache()) {
		return cache.exists();
	}

	const gitPath = FileService.sync.findUp('.git', {
		cwd: loc,
	});
	const exists = gitPath !== null;

	cache.set(exists);

	if (options.throwOnError && !exists) {
		throw new GitDirNotFoundError(loc);
	}
	return exists;
}

export type Type = typeof hasGitDir;

export { hasGitDir as method };
