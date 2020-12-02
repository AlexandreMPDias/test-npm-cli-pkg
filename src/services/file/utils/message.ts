import { LogInstance } from '../../log';
import * as types from '../types';
import createSelection from '../../utils/factories/selection';
import chalk from 'chalk';

const emptyFn = (...args: any[]) => {
	/* empty */
};

export const getMessages = (
	options: Required<types.IOptions>,
	base: string,
	log: LogInstance,
	path: string | undefined,
) => {
	const msg = path ? `${base} on ${chalk.cyan(path)}` : base;

	const message: Record<Exclude<types.LogOptions, null>, () => string> = {
		abort: () => `${msg} failed`,
		log: () => `${msg} failed`,
	};

	const selects = {
		onSuccess: createSelection(options.onSuccess || 'none'),
		onError: createSelection(options.onError || 'none'),
	};

	return {
		onSuccess: selects.onSuccess({
			log: () => {
				log.success(`${msg} finished`);
			},
			default: emptyFn,
		}),
		onError: selects.onError({
			abort: (err: Error) => {
				log.error(message.abort()).abort(err);
			},
			log: (err: Error) => {
				log.error(message.abort());
				return err;
			},
			none: emptyFn,
		}),
	};
};
