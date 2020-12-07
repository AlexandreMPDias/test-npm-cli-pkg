import Git from '../../../../services/git';

export const underscore = '_';

export function getTimeIdOfBranch(sprint: number) {
	// Get the last 2 digits of the Year
	const year = `${new Date().getFullYear()}`.replace(/^\d{2}/, '');

	return [year, sprint].join('.');
}

export function clearTargetBranchName(target: string): string {
	let branchName = target;

	// Remove Release in end if exists
	branchName = branchName.replace(/(\W|_)?Release$/i, '');

	// Transform [-]s in [_]s
	branchName = branchName.replace(/-/g, underscore);

	// Readd _Release
	branchName = branchName + underscore + 'Release';

	Git.checkBranchExists(target);

	return branchName;
}

export function join(args: { sprint: number; source: string; name: string }): string {
	return [getTimeIdOfBranch(args.sprint), clearTargetBranchName(args.name)].join(underscore);
}
