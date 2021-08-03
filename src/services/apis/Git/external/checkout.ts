import Exec from '../../../exec';
import { GitThis } from '../types';

type Checkout = (this: GitThis, branch: string, remote?: string) => void;

const getRemote = (remote?: string): string => {
	if (remote) return remote;

	const remotes = Exec.execSync(`git remote -v`, { encoding: 'utf-8', stdio: 'pipe' }).split('\n');
	const currentRemote = remotes[0].split(/\s/)[0];
	return currentRemote;
};

const _checkout = (ctx: GitThis, branch: string, remote?: string) => {
	try {
		if (remote) {
			throw new Error('Checking out to different remotes is not yet supported');
		}
		Exec.execSync(`git checkout ${branch}`);
	} catch (err) {
		ctx.log.abort(err);
	}
};

export const bind = (ctx: GitThis) => (branch: string, remote?: string) => _checkout(ctx, branch, remote);

export type Type = Checkout;
