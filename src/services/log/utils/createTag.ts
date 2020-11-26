import { Chalk } from 'chalk';
import * as types from '../types';

function createTag(this: types.LogThisType, _chalk: Chalk, msg: string) {
	const parsed = msg.padStart(5, ' ').padEnd(7, ' ');
	return this.modeSelect({
		extended: _chalk(`[${parsed}]: `),
		default: '',
	});
}

export default createTag;
