import { PathRelation } from '../file/types';
import _Log from '../log';
import FileService from '../file';

const moduleRequire = <T extends object>(_path: string, relativeTo: PathRelation, defaultTo?: T): T => {
	const hasFallback = defaultTo !== undefined;
	const exists = FileService.sync.exists(_path, { relativeTo });

	if (exists) {
		const content = FileService.sync.readFile(_path, {
			relativeTo,
			onError: hasFallback ? 'log' : 'abort',
		}) as string;
		return JSON.parse(content);
	}
	if (defaultTo !== undefined) {
		return defaultTo;
	}
	throw new Error(`ImportService.require > No module found at path: ${_path}`);
};

export default moduleRequire;
