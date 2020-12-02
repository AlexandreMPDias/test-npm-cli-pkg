const FILL = ' ';
const OFFSET = 1;

const add1OnOdd = (value: number) => {
	return value % 2 === 0 ? 0 : 1;
};

const _getAlignment = (str: string, size: number) => {
	const max = size % 2 === 0 ? size : size + 1;
	const toFill = max - str.length;
	const half = Math.ceil(toFill / 2);
	const pad = FILL.repeat(half + OFFSET);
	return {
		pad1: pad,
		pad2: FILL.repeat(half + (toFill % 2 === 0 ? 1 : 0)),
	};
};

const alignObject = {
	center: (str: string, size: number) => {
		const { pad1, pad2 } = _getAlignment(str, size);
		return [pad1, str, pad2].join('');
	},
	left: (str: string, size: number) => {
		return str.padEnd(size, FILL);
	},
};

type Alignment = keyof typeof alignObject;

const _align = new Proxy({} as any, {
	get: (target, key: any) => {
		if (typeof key === 'string' && target[key] === undefined) {
			target[key] = (...strs: string[]): string[] => {
				const max = Math.max(...strs.map((x) => x.length));
				return strs.map((str) => (alignObject as any)[key](str, max + add1OnOdd(max)));
			};
		}
		return target[key];
	},
});

const align = _align as Record<Alignment, (...str: string[]) => string[]>;

export default align;
