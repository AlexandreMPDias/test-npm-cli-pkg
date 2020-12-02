import { Flatten } from '../travel';

export interface IValidation<K, V> {
	accepts: V[];
}

type RequiresCustomValidation = Exclude<
	{ [K in keyof Flatten]: Flatten[K] extends string ? K : null }[keyof Flatten],
	null
>;

export type CustomValidators = { [K in RequiresCustomValidation]?: IValidation<K, Flatten[K]> };

export type IValidationSelector = {
	[K in keyof CustomValidators | 'default']: (
		key: K extends keyof Flatten ? K : keyof Flatten,
		value: K extends keyof Flatten ? Flatten[K] : Flatten[keyof Flatten],
	) => string | null;
};
