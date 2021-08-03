import Git from '../../../../services/apis/Git';
import { runMany } from '../../../../services/run';
import { extractParent } from './extract-parent';

async function getGitData(target: string) {
	Git.fetch();

	const [origin, organization, activeBranch] = await runMany(
		'fetching git data',
		() => Git.get.origin.async({ success: false, start: false }),
		() => Git.get.organization.async({ success: false, start: false }),
		() => Git.get.activeBranch.async({ success: false, start: false }),
	);

	const parentBranch = extractParent(activeBranch!, origin!);

	console.log({ parentBranch });

	return {
		org: organization!,
		origin: origin!,
		branch: activeBranch!,
		target: parentBranch || target,
	};
}

export type GitData = ReturnType<typeof getGitData> extends Promise<infer Data> ? Data : never;
export default getGitData;
