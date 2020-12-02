import { DEFAULT_SHAPE, FILE_NAME } from './constants';
import { PathRelation } from '../file/types';
import FileService from '../file';
import ImportService from '../import';
import { mergeDeepRight } from 'ramda';
import validate from './validate';
import Log from '../log';
import chalk from 'chalk';

const openIfExists = (relativeTo: PathRelation): Partial<Config.FileShape> | null => {
	const exists = FileService.sync.exists(FILE_NAME, { relativeTo });
	if (exists) {
		return ImportService.require<Partial<Config.FileShape>>(FILE_NAME, relativeTo);
	}
	return null;
};

const load = (): Config.FileShape => {
	const global = validate(openIfExists('home') || {});
	const local = validate(openIfExists('cwd') || {});

	[{ global }, { local }].forEach((obj) => {
		const [key, values] = Object.entries(obj)[0];
		const { errors } = values!;
		const conf = chalk.magentaBright(`[ ${key} ]`);
		errors.forEach((error) => {
			Log.warn(`${conf} - ${error}`);
		});
		if (errors.length) {
			console.log('');
			Log.warn(`${conf} config file contains errors, please inspect it`);
		}
	});

	return mergeDeepRight(mergeDeepRight(DEFAULT_SHAPE, global.config), local.config);
};

export default load;
