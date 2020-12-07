import _Log from '../log';

export const Log = _Log.instance('', {
	mode: 'best',
});

export interface IRunOptions {
	start?: boolean;
	error?: boolean;
	success?: boolean;
}

const ifUndef = <A, B>(value: A, fallback: B): Exclude<A | B, undefined> => {
	return (value === undefined ? fallback : value) as any;
};

export const parseOptions = (options?: IRunOptions): Required<IRunOptions> => {
	return {
		success: ifUndef(options?.success, true),
		error: ifUndef(options?.error, true),
		start: ifUndef(options?.start, true),
	};
};

export const show: Record<keyof IRunOptions, (name: string) => void> = {
	start: (name) => Log.info(name),
	success: Log.success,
	error: Log.error,
};
