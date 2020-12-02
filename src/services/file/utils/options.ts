import filtedUndefined from '../../../utilities/object/filterUndefined';
import * as types from '../types';
import { ENCODING } from './constants';

export const applyDefaultCustomOptions = (options: types.IOptions): Required<types.IOptions> => {
	const defaultOptions: Required<types.IOptions> = {
		onError: null,
		onSuccess: null,
		relativeTo: 'cwd',
	};

	return { ...defaultOptions, ...filtedUndefined(options) };
};

export const extract = <T>(options: types.WithOptions<T>): [Required<types.IOptions>, T] => {
	const { onError, onSuccess, relativeTo, ...rest } = options || {};

	const customOptions = applyDefaultCustomOptions({ onError, onSuccess, relativeTo });
	const originalOptions: T = { encoding: ENCODING, ...rest } as any;

	return [customOptions, originalOptions];
};
