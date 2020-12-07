import Exec from '../exec';
import { IRunOptions, show, parseOptions } from './utils';
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

type Runnable = void | string | Promise<any>;

type Ret<Funcs extends Array<() => Runnable>> = {
	[K in keyof Funcs]: Funcs[K] extends () => Runnable ? Awaited<ReturnType<Funcs[K]> | null> : never;
};

interface IRunManySync {
	<Funcs extends Array<() => Runnable>>(name: string, options: IRunOptions, ...func: Funcs): Ret<Funcs>;
	<Funcs extends Array<() => Runnable>>(name: string, ...func: Funcs): Ret<Funcs>;
}

const parse = (args: any[]): [IRunOptions, Array<() => Runnable>] => {
	if (args.length === 0) {
		return [{}, []];
	}
	if (typeof args[0] === 'object') {
		const [opt, ...funcs] = args;
		return [opt, funcs];
	}
	return [{}, args];
};

const runManySync: IRunManySync = (name: string, ...args: any[]) => {
	const [options, funcs] = parse(args);
	const opts = parseOptions(options);
	try {
		opts.start && show.start(name);
		const out = funcs.map((func) => {
			const runnable = func();
			if (typeof runnable === 'string') {
				return Exec.execSync(runnable);
			}
			return runnable;
		});
		opts.success && show.success(name);
		return out;
	} catch (err) {
		opts.error && show.error(name);
		return [];
	}
};

interface IRunMany {
	<Funcs extends Array<() => Runnable>>(name: string, options: IRunOptions, ...func: Funcs): Promise<Ret<Funcs>>;
	<Funcs extends Array<() => Runnable>>(name: string, ...func: Funcs): Promise<Ret<Funcs>>;
}

const runMany: IRunMany = async (name: string, ...args: any[]) => {
	const [options, funcs] = parse(args);
	const opts = parseOptions(options);

	try {
		opts.start && show.start(name);
		const out = await Promise.all(
			funcs.map(async (func) => {
				const runnable = func();
				if (typeof runnable === 'string') {
					return (await Exec.exec(runnable)).stdout;
				}
				return runnable;
			}),
		);
		opts.success && show.success(name);
		return out;
	} catch (err) {
		opts.error && show.error(name);
		return [];
	}
};

export { runMany, runManySync };
