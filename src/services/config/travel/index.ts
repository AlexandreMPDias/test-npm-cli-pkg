import chalk from 'chalk';
import { DEFAULT_SHAPE, EMPTY_FIELD } from '../constants';
import flat from '../../../utilities/object/flatten';
import { ITravel, Flatten, travel, IOptions } from './types';
import { CliError } from '../../utils/error';

export const flatConfig: Flatten = flat(DEFAULT_SHAPE) as any;

const getTravel = (config: Config.FileShape): ITravel => {
	return (fullKey: string, options: IOptions = {}) => {
		const value = travel(config, fullKey);

		if (options.required && value === EMPTY_FIELD) {
			const pKey = chalk.black.bgRed(`[ ${fullKey} ]`);
			throw new CliError(
				'Missing required config',
				`Please set the value of ${pKey} at ${chalk.cyan('.alex-config.json')}`,
			);
		}

		return value;
	};
};

export * from './types';

export default getTravel;
