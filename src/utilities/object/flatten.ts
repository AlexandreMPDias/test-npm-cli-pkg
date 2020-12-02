const _populate = <O extends object>(source: O, output: any, baseKey?: string): void => {
	Object.entries(source).forEach(([key, value]) => {
		const _key = baseKey ? `${baseKey}.${key}` : key;
		if (typeof value === 'object' && !Array.isArray(value)) {
			_populate(value, output, _key);
		}
		output[_key] = value;
	});
};

const flat = <O extends object>(source: O): object => {
	const out: object = {};
	_populate(source, out);
	return out;
};

export default flat;
