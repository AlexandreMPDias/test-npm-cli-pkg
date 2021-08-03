import chalk from 'chalk';
import { basename } from 'path';
import Git from '../../../services/apis/Git';
import Utils from '../../../services/utils';
import getGitData, { GitData } from './get-git-data';
import Log from '../../../services/log';

type Args = {
	branch: string;
};

interface IGitMetada {
	expand?: number;
	assignee?: string | string[];
	labels?: string | string[];
}

const parseUrlParams = (params: Record<string, any>) => {
	const p: Record<string, string> = {};
	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			p[key] = value.join(',');
		} else {
			p[key] = String(value);
		}
	});
	return new URLSearchParams(p);
};

export function buildPullRequestURL({ org, origin, branch, target }: GitData, metadata: IGitMetada = {}) {
	const packageName = basename(origin).replace('.git', '');

	const meta = Object.assign({ expand: 1 }, metadata);

	const url = `https://github.com/${org}/${packageName}/compare/${target}...${branch}`;

	return [url, parseUrlParams(meta)].filter((x) => x).join('?');
}

const handle = async ({ branch }: Args) => {
	Git.hasGitDir();

	const target = branch;

	const git = await getGitData(target || branch);
	try {
		Git.checkBranchExists(git.target);
		const url = buildPullRequestURL(git, {
			assignee: 'AlexandreMPDias',
		});
		// console.log(url);
		Log.success(`opening PR for [ ${chalk.cyan(git.branch)} > ${chalk.magenta(git.target)} ]`);
		Utils.openLink(url);
	} catch (err) {
		Log.abort(err);
	}
};

export default handle;
