import Exec from '../../../exec';
import { runSync, IRunOptions } from '../../../run';

export const fetch = (opts?: IRunOptions) => {
	return runSync(() => Exec.execSync('git fetch -p'), 'fetching updates on remote', opts);
};

export type Fetch = typeof fetch;
