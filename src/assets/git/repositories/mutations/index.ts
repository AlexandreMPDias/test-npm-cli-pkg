import { Data } from '../data';

import { addRepoNameToAlias } from './addRepoNameToAlias';
import { addKeyToEachRepo } from './addKeyToRepo';

export function mutate(data: Data) {
	const d1 = data;
	const d2 = addRepoNameToAlias(d1);
	const d3 = addKeyToEachRepo(d2);
	return d3;
}
