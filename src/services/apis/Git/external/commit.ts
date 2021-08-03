import Exec from '../../../exec';
import { GitThis } from '../types';

type Commit = (message: string, flags?: string[]) => void;

const _commit = (ctx: GitThis, message: string, flags: string[] = []) => {
	try {
		Exec.execSync(`git commit ${flags.join(' ')} -m "${message}"`);
	} catch (err) {
		ctx.log.abort(err);
	}
};

export const bind = (ctx: GitThis) => {
	const commit = (message: string, flags: string[] = []) => _commit(ctx, message, flags);

	const empty = (message: string, flags: string[] = []) => _commit(ctx, message, flags.concat(['--allow-empty']));

	return Object.assign(commit, { empty: empty.bind(this) });
};

export type Type = Commit & Record<'empty', Commit>;
