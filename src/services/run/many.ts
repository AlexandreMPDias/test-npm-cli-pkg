import Exec from '../exec';
import { IRunOptions, show, parseOptions } from './utils';
import { FuncOrCmdAsync, FuncOrCmdSyncMany } from './types';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

type Runnable<K = never> = void | string | K;

type Ret<Funcs extends Array<FuncOrCmdAsync<any>>> = {
	[K in keyof Funcs]: Funcs[K] extends () => Runnable ? Awaited<ReturnType<Funcs[K]> | null> : never;
};

interface IRunManySync {
	/**
	 * Runs many functions syncronously wrapping it's run-state with log calls
	 *
	 * @param {string} name the name of the function to be printed if any log method is set
	 * @param {IRunOptions|undefined} options the run option's object
	 * @param {Array<FuncOrCmdSyncMany>} func An array of functions or commands
	 * 	check [FuncOrCmdSyncMany]'s documentation for more information
	 */
	<Funcs extends Array<FuncOrCmdSyncMany>>(name: string, options: IRunOptions, ...func: Funcs): Ret<Funcs>;

	/**
	 * Runs many functions syncronously wrapping it's run-state with log calls
	 *
	 * @param {string} name the name of the function to be printed if any log method is set
	 * @param {Array<FuncOrCmdSyncMany>} func An array of functions or commands
	 * 	check [FuncOrCmdSyncMany]'s documentation for more information
	 */
	<Funcs extends Array<FuncOrCmdSyncMany>>(name: string, ...func: Funcs): Ret<Funcs>;
}

const parse = (args: any[]): [IRunOptions, Array<FuncOrCmdSyncMany>] => {
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
	/**
	 * Runs a function syncronously wrapping it's run-state with log calls
	 *
	 * @param {FuncOrCmdSync} funcOrCmd A regular syncronous function or a string to be executed in the
	 * command-line syncronously.
	 * 	check [FuncOrCmdSync]'s documentation for more information
	 * @param {string} name the name of the function to be printed if any log method is set
	 * @param {IRunOptions|undefined} options the run option's object
	 *
	 * @return {R | string | null} if funcOrCmd is a function, returns it returned value, if funcOrCmd is a command, returns
	 * the output in the stdout of the command.
	 */
	<Funcs extends Array<FuncOrCmdAsync<any>>>(name: string, options: IRunOptions, ...func: Funcs): Promise<Ret<Funcs>>;
	<Funcs extends Array<FuncOrCmdAsync<any>>>(name: string, ...func: Funcs): Promise<Ret<Funcs>>;
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
