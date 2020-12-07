import { IRunOptions, show, parseOptions } from './utils';

async function run<R, Func extends () => Promise<R>>(
	func: Func,
	name: string,
	options?: IRunOptions,
): Promise<R | null> {
	const opts = parseOptions(options);
	try {
		opts.start && show.start(name);
		const out = await func();
		opts.success && show.success(name);
		return out;
	} catch (err) {
		opts.error && show.error(name);
		return Promise.resolve(null);
	}
}

function runSync<Func extends () => any>(func: Func, name: string, options?: IRunOptions): ReturnType<Func> | null {
	const opts = parseOptions(options);
	try {
		opts.start && show.start(name);
		const out = func();
		opts.success && show.success(name);
		return out;
	} catch (err) {
		opts.error && show.error(name);
		return null;
	}
}

export { run, runSync };
