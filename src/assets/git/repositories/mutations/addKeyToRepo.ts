import { Data } from '../data';

type WithKeyInRepo<D extends Data> = {
	[K in keyof D]: D[K] & { key: K };
};
function addKeyToEachRepo<D extends Data>(_data: D): WithKeyInRepo<D> {
	const keys: Array<keyof Data> = Object.keys(_data) as any;
	keys.forEach((key) => {
		(_data[key] as any).key = key;
	});
	return _data as any;
}

export { addKeyToEachRepo };
