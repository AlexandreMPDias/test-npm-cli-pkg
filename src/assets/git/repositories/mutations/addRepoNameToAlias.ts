import { Data } from '../data';

function addRepoNameToAlias<D extends Data>(_data: D): D {
	const keys: Array<keyof Data> = Object.keys(_data) as any;
	keys.forEach((key) => {
		const r: any = _data;
		r[key].alias = r[key].alias.concat(key);
	});
	return _data as any;
}

export { addRepoNameToAlias };
