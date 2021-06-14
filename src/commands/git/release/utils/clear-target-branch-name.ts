import chalk from 'chalk';
import Git from '../../../../services/apis/Git';
export * from './get-default-spring-number';

export const underscore = '_';

type TrasnformFn = (branchName: string) => string;

export function clearTargetBranchName(target: string): string {
	const transformations: TrasnformFn[] = [
		// Remove Release in end if exists
		(branchName) => branchName.replace(/(\W|_)?Release$/i, ''),

		// Transform [-]s in [_]s
		(branchName) => branchName.replace(/-/g, underscore),

		// Re-add _Release
		(branchName) => branchName + underscore + 'Release',
	];

	if (!target) {
		throw new Error(`Target branch not received`);
	}

	const clearBranchName = transformations.reduce(
		(branchName, transformationFn) => transformationFn(branchName),
		target,
	);

	try {
		Git.checkBranchExists(target);
		throw new Error(`Branch [ ${chalk.magenta(clearBranchName)} ] already exists`);
	} catch (err) {
		return clearBranchName;
	}
}
