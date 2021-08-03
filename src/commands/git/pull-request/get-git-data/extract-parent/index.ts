import { ExtractRet } from './utils';
import { __extractParent } from './load';

export function extractParent(branch: string, remote: string): string | null {
	const result: ExtractRet = __extractParent(branch, remote);

	console.log('value', result.value);
	console.log('reason', result.reason);

	return result.value;
}
