import { sep } from 'path';
import { GitThis } from '../types';
import * as repos from '../../../../assets/git/repositories';
import ConfigService from '../../../config';
import { run } from '../../../run';
import chalk from 'chalk';

const getRepo = (repoKey: repos.Repos<'keysWithAlias'>) =>
	Object.values(repos.data).find((repo) => (repo.alias as any[]).includes(repoKey));

const _clone = async (ctx: GitThis, repoKey: repos.Repos<'keysWithAlias'>) => {
	const repo = getRepo(repoKey);
	if (!repo) {
		ctx.log.abort(`Unknown repository: ${repoKey}`);
	}
	try {
		const coloredRepoKey = chalk.magentaBright(repo.key);
		const method = ConfigService.get('git.cloneMethod');
		const uri = repo.uri[method];
		const location = chalk.yellow(`${process.cwd()}${sep}${repo.key}`);
		await run(() => `git clone ${uri}`, `${coloredRepoKey} cloning`, { throwError: true });
		ctx.log.info(`${coloredRepoKey} - cloned into ${location}`);
	} catch (err) {
		ctx.log.abort(err);
	}
};

export const bind = (ctx: GitThis) => (repoKey: repos.Repos<'keysWithAlias'>) => _clone(ctx, repoKey);

export type Type = (this: GitThis, repoKey: repos.Repos<'keysWithAlias'>) => Promise<void>;
