import { clearTargetBranchName, underscore } from './clear-target-branch-name';
export * from './get-default-sprint-number';
export * from './log-input';

export function getTimeIdOfBranch(sprint: number) {
	// Get the last 2 digits of the Year
	const year = `${new Date().getFullYear()}`.replace(/^\d{2}/, '');

	return [year, sprint].join('.');
}

export function join(args: { sprint: number; source: string; name: string }): string {
	return [getTimeIdOfBranch(args.sprint), clearTargetBranchName(args.name)].join(underscore);
}
