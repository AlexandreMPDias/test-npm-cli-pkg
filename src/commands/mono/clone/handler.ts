import chalk from 'chalk';
import Git from '../../../services/apis/Git';
import Log from '../../../services/log';
import * as repos from '../../../assets/git/repositories';
import * as types from './types';

export async function handler({ target }: types.Args) {
	const validUniqueRepos: Set<Repositories.Key> = new Set();
	target.forEach((repoKey) => {
		const repo = repos.list.find((r) => r.alias.includes(repoKey));
		if (!repo) {
			Log.error(`Unknown repository [ ${chalk.magenta(repoKey)} ]`);
		} else {
			if (validUniqueRepos.has(repo.key)) {
				Log.warn(`Duplicate repository found: [ ${chalk.magenta(repoKey)} ]`);
			} else {
				validUniqueRepos.add(repo.key);
			}
		}
	});
	for (const key of Array.from(validUniqueRepos.values())) {
		await Git.clone(key);
		Log.skip(1);
	}
	Log.success(`Finished cloning all repositories`);
}
