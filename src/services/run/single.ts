import Exec from '../exec';
import { IRunOptions, show, parseOptions } from './utils';
import { FuncOrCmdAsync, FuncOrCmdSync, RetSingle } from './types';

/**
 * Runs a function asyncronously wrapping it's run-state with log calls
 *
 * @param {FuncOrCmdAsync} func a function or command
 * 	check [FuncOrCmdAsync]'s documentation for more information
 * @param {string} name the name of the function to be printed if any log method is set
 * @param {IRunOptions|undefined} options the run option's object
 */
async function run<Func extends FuncOrCmdAsync<any>>(
	func: Func,
	name: string,
	options?: IRunOptions,
): Promise<RetSingle<Func>> {
	const opts = parseOptions(options);
	try {
		opts.start && show.start(name);
		const promiseOrString = func();
		let out: any;
		if (typeof promiseOrString === 'string') {
			out = (await Exec.exec(promiseOrString)).stdout;
		} else {
			out = await promiseOrString;
		}
		opts.success && show.success(name);
		return out;
	} catch (err) {
		if (opts.throwError) {
			throw err;
		}
		opts.error && show.error(name);
		return Promise.resolve(null);
	}
}

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
function runSync<FuncOrCmd extends FuncOrCmdSync>(
	funcOrCmd: FuncOrCmd,
	name: string,
	options?: IRunOptions,
): null | (FuncOrCmd extends Utils.Foo ? ReturnType<FuncOrCmd> : string) {
	const opts = parseOptions(options);
	try {
		opts.start && show.start(name);
		let out: any;
		if (typeof funcOrCmd === 'string') {
			const cmd = funcOrCmd as string;
			out = Exec.execSync(cmd);
		} else {
			const func = funcOrCmd as Utils.Callback<never, string>;
			out = func();
		}
		opts.success && show.success(name);
		return out;
	} catch (err) {
		if (opts.throwError) {
			throw err;
		}
		opts.error && show.error(name);
		return null;
	}
}

export { run, runSync };
