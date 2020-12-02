import { LogInstance } from '../log';
import { PathLike } from 'fs';
import * as utils from './utils';
import * as types from './types';
import attempt from '../../utilities/attempt';

interface IValues<T, P> {
	opts: Required<types.IOptions>;
	fsOptions: T;
	path: P;
	messages: {
		onSuccess: Utils.Foo;
		onError: ((err: Error) => any) | undefined;
	};
}

class FileServiceCommonConstructor {
	protected log: LogInstance;

	constructor(log: LogInstance) {
		this.log = log;
	}

	protected getValues = <T, P extends PathLike | number>(
		name: string,
		path: P,
		options: types.WithOptions<T>,
	): IValues<T, P> => {
		const [opts, fsOptions] = utils.options.extract(options);

		const fullPath = utils.relative.resolve(opts.relativeTo, path);

		return {
			opts,
			fsOptions,
			path: fullPath,
			messages: utils.getMessages(opts, name, this.log, typeof fullPath === 'string' ? fullPath : undefined),
		};
	};

	protected attempt = <T, V, P>(foo: () => T, values: IValues<V, P>) => {
		const out = attempt(foo, values.messages.onError);
		values.messages.onSuccess();
		return out;
	};
}

export default FileServiceCommonConstructor;
