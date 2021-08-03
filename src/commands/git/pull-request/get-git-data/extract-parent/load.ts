import ConfigService from '../../../../../services/config';
import Exec from '../../../../../services/exec';
import Log from '../../../../../services/log';
import { ExtractRet, ok, bad } from './utils';

const wasBranchSetInCommandLine = (): boolean => {
	const branchWasSetInCmd = Array.from(process.argv)
		.slice(1)
		.join(' ')
		.match(/--branch/);

	return !!branchWasSetInCmd;
};

const getParentCandidates = (branch: string): string[] => {
	const parentCandidates = branch
		.replace(/_[A-Z]{2,8}/, '')
		.split('_')
		.slice(1);
	parentCandidates.pop();

	return parentCandidates;
};

const getReleaseBranches = (remote: string): string[] => {
	const transformations: Array<(line: string) => string> = [
		// Remove hash from name
		(line) => line.replace(/.+\/heads\//, ''),

		// Remove Sprint and Year from Name
		(line) => line.replace(/^.+?([A-Z])/, '$1'),
	];

	const branches = Exec.execSync(`git ls-remote --heads ${remote}`)?.split('\n');

	if (!branches) return [];

	const formatted = transformations.reduce((bs, transf) => bs.map(transf), branches);

	const releaseBranches = formatted.filter((line) => line.match(/_Release$/));

	return releaseBranches.map((line) => line.replace(/_Release$/, ''));
};

const findParent = (parentCandidates: string[], releaseBranches: string[]): string | null => {
	const parent = releaseBranches.find((b) => parentCandidates.some((candidate) => b.match(candidate)));

	return parent ?? null;
};

export function __extractParent(branch: string, remote: string): ExtractRet {
	const configEnabled = ConfigService.get('commands.git.pull-request.enableParentDetection');

	if (!configEnabled) {
		return bad('config not enabled');
	}
	Log.warn(`enableParentDetection is enabled`);

	if (wasBranchSetInCommandLine()) {
		return bad('branch was set in command line');
	}

	const parentCandidates = getParentCandidates(branch);

	const releaseBranches = getReleaseBranches(remote);

	console.log({ parentCandidates, releaseBranches });

	const parent = findParent(parentCandidates, releaseBranches);

	if (parent) {
		return ok(parent);
	}
	return bad('parent is null');
}
