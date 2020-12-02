const filtedUndefined = <O extends object>(source: O): O => {
	return Object.entries(source).reduce((out: any, [key, value]) => {
		if (value !== undefined) {
			out[key] = value;
		}
		return out;
	}, {});
};

export default filtedUndefined;
