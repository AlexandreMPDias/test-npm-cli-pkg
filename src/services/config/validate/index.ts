import chalk from 'chalk';
import { assocPath } from 'ramda';
import flat from '../../../utilities/object/flatten';
import filterUndefined from '../../../utilities/object/filterUndefined';
import _Log from '../../log';
import createSelector from '../../utils/factories/selector';
import { Flatten, flatConfig } from '../travel';
import * as types from './types';

const paintProp = (s: string) => chalk.underline.hex('#ffa500')(s);

const validators: types.CustomValidators = {
	'git.cloneMethod': {
		accepts: ['https', 'ssh'],
	},
	'terminal.consoleMode': {
		accepts: ['extended', 'extended_caps', 'simple'],
	},
	'terminal.level': {
		accepts: ['debug', 'err', 'log', 'none', 'success', 'warn'],
	},
};

const customValidate = (key: string, value: any, validator: types.IValidation<any, any>): string | null => {
	if (!validator.accepts.includes(value)) {
		return `Property: ${paintProp(key)} must be either [${validator.accepts
			.map((s) => `[ ${chalk.blueBright(s)} ]`)
			.join(', ')}]`;
	}
	return null;
};

const validations = createSelector<types.IValidationSelector>().for({
	'git.cloneMethod': (key, value) => customValidate(key, value, validators[key]!),
	'terminal.consoleMode': (key, value) => customValidate(key, value, validators[key]!),
	'terminal.level': (key, value) => customValidate(key, value, validators[key]!),
	default: (key, value) => {
		if (!(key in flatConfig)) {
			return `Unknown property: ${paintProp(key)}`;
		}
		const expectedType = typeof flatConfig[key];
		if (typeof value !== expectedType) {
			return `Property: ${paintProp(key)} must be of type ${expectedType}`;
		}
		return null;
	},
});

const validateConfig = (config: Partial<Config.FileShape>): { config: Partial<Config.FileShape>; errors: string[] } => {
	const flattened = flat(config) as Flatten;

	const modified = { ...config };

	const keys = Object.keys(flattened) as any[];

	const errors = keys
		.map((key: keyof Flatten) => {
			const validation: any = validations(key);
			const valid: string = validation(key, flattened[key]);
			if (!valid) {
				assocPath(key.split('.'), undefined);
			}
			return valid;
		})
		.filter((error) => error !== null);

	return {
		config: filterUndefined(modified),
		errors,
	};
};

export default validateConfig;
