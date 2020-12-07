import Git from '../../../services/apis/Git';
import ConfigService from '../../../services/config';
import Exec from '../../../services/exec';
import Log from '../../../services/log';
import { runMany } from '../../../services/run';

export function extractParent(branch: string, remote: string): string | null {
	const configEnabled = ConfigService.get('commands.git.pull-request.enableParentDetection');

	if (!configEnabled) {
		return null;
	}
	Log.warn(`enableParentDetection is enabled`);

	const branchWasSetInCmd = [...process.argv]
		.slice(1)
		.join(' ')
		.match(/--branch/);

	if (!!branchWasSetInCmd) {
		return null;
	}

	const parentCandidates = branch
		.replace(/_[A-Z]{2,8}/, '')
		.split('_')
		.slice(1);
	parentCandidates.pop();

	const releaseBranches = Exec.execSync(`git ls-remote --heads ${remote}`)
		?.split('\n')
		.map((line) => line.replace(/.+\/heads\//, ''))
		.filter((line) => line.match(/_Release$/));

	const parent = releaseBranches.find((b) => parentCandidates.some((candidate) => b.match(candidate)));

	return parent || null;
}

async function getGitData(target: string) {
	Git.fetch();

	const [origin, organization, activeBranch] = await runMany(
		'fetching git data',
		() => Git.get.origin.async({ success: false, start: false }),
		() => Git.get.organization.async({ success: false, start: false }),
		() => Git.get.activeBranch.async({ success: false, start: false }),
	);

	// const [origin, organization, activeBranch] = await Promise.all(
	// 	[Git.get.origin.async, Git.get.organization.async, Git.get.activeBranch.async].map((get) => get({})),
	// );

	const parentBranch = extractParent(activeBranch!, origin!);

	return {
		org: organization!,
		origin: origin!,
		branch: activeBranch!,
		target: parentBranch || target,
	};
}

export type GitData = ReturnType<typeof getGitData> extends Promise<infer Data> ? Data : never;
export default getGitData;
