import chalk from 'chalk';
import { basename } from 'path';
import Git from '../../../services/apis/Git';
import Utils from '../../../services/utils';
import getGitData, { GitData } from './getGitData';
import Log from '../../../services/log';

type Args = {
	branch: string;
};

function buildUrl({ org, origin, branch, target }: GitData) {
	const packageName = basename(origin).replace('.git', '');
	return `https://github.com/${org}/${packageName}/compare/${target}...${branch}?expand=1`;
}

const handle = async ({ branch }: Args) => {
	Git.hasGitDir();

	const target = branch;

	const git = await getGitData(target || branch);
	try {
		Git.checkBranchExists(git.target);
		const url = buildUrl(git);
		Log.success(`opening PR for [ ${chalk.cyan(git.branch)} > ${chalk.magenta(git.target)} ]`);
		// Utils.openLink(url);
	} catch (err) {
		Log.abort(err);
	}
};

export default handle;
