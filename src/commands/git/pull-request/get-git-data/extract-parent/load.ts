import ConfigService from '../../../../../services/config';
import Exec from '../../../../../services/exec';
import Log from '../../../../../services/log';
import { ExtractRet, ok, bad } from './utils';

const pipe = <T>(...fns: Array<(value: T) => T>) => {
	return (value: T): T => fns.reduce((curr, transf) => transf(curr), value);
};

type ReleaseBranch = {
	source: string;
	name: string;
};

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

const getReleaseBranches = (remote: string): ReleaseBranch[] => {
	const bs = Exec.execSync(`git ls-remote --heads ${remote}`)?.split('\n');

	if (!bs) return [];

	const preSourceTransformation = pipe<string>(
		// Remove hash from name
		(line) => line.replace(/.+\/heads\//, ''),
	);

	const branches = bs.map((b) => preSourceTransformation(b));

	const getName = pipe<string>(
		// Remove Sprint and Year from Name
		(line) => line.replace(/^.+?([A-Z])/, '$1'),
		// Remove Release from name
		(line) => line.replace(/_Release$/, ''),
	);

	return branches
		.map((source) => ({
			source,
			name: getName(source),
		}))
		.filter(({ source }) => source.match(/_Release$/));
};

const findParent = (parentCandidates: string[], releaseBranches: ReleaseBranch[]): string | null => {
	const parent = releaseBranches.find(({ name }) => parentCandidates.some((candidate) => name.match(candidate)));

	return parent?.source ?? null;
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

	const parent = findParent(parentCandidates, releaseBranches);

	if (parent) {
		return ok(parent);
	}
	return bad('parent is null');
}
