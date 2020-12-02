export const stringify = (data: string | NodeJS.ArrayBufferView | object): string | NodeJS.ArrayBufferView => {
	if (typeof data === 'string') {
		return data;
	}
	if (isArrayBufferView(data)) {
		return data;
	}
	return JSON.stringify(data, null, '\t');
};

function isArrayBufferView<T extends string | object>(v: T | NodeJS.ArrayBufferView): v is NodeJS.ArrayBufferView {
	const value: any = v;
	return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
}
