import Exec from '../../../services/exec';

function getGitData(target: string) {
	return {
		org: Exec.execSync('git config --get remote.origin.url')
			.replace(/\n/g, '')
			.replace(/.+@\w+.com:/, '')
			.replace(/https?:\/\/.+.com\//, '')
			.replace(/\/.+/, ''),
		origin: Exec.execSync('git config --get remote.origin.url').replace(/\n/g, ''),
		branch: Exec.execSync('git rev-parse --abbrev-ref HEAD').replace(/\n/g, ''),
		target,
	};
}

export type GitData = ReturnType<typeof getGitData>;
export default getGitData;
