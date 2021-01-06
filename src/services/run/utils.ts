import _Log from '../log';

export const Log = _Log.instance('', {
	mode: 'best',
});

export interface IRunOptions {
	/**
	 * Indicates if log.start should be handled internally or not
	 *
	 * If true, automatically prints the string argument of the run/runSync call with a start
	 * status
	 *
	 * @default true
	 */
	start?: boolean;

	/**
	 * Indicates if log.error should be handled internally or not
	 *
	 * If true, automatically prints the string argument of the run/runSync call with an error
	 * status if the execution fails to finish
	 *
	 * @default true
	 */
	error?: boolean;

	/**
	 * Indicates if log.success should be handled internally or not
	 *
	 * If true, automatically prints the string argument of the run/runSync call with a success
	 * status if the execution finishes sucessfully
	 *
	 * @default true
	 */
	success?: boolean;

	/**
	 * When an error is found, throws it
	 *
	 * @default false
	 */
	throwError?: boolean;
}

const ifUndef = <A, B>(value: A, fallback: B): Exclude<A | B, undefined> => {
	return (value === undefined ? fallback : value) as any;
};

export const parseOptions = (options?: IRunOptions): Required<IRunOptions> => {
	return {
		success: ifUndef(options?.success, true),
		error: ifUndef(options?.error, true),
		start: ifUndef(options?.start, true),
		throwError: ifUndef(options?.throwError, false),
	};
};

export const show: Record<'start' | 'success' | 'error', (name: string) => void> = {
	start: (name) => Log.info(name),
	success: Log.success,
	error: Log.error,
};
