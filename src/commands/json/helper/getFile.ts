import { join } from 'path';
import FileService from '../../../services/file';
import { PathRelation } from '../../../services/file/types';
import ImportService from '../../../services/import';
import _Log from '../../../services/log';

const getFile = (fileName: string, relativeTo: PathRelation): object => {
	const lookUpPaths = [fileName, `${fileName}.json`, join(fileName, 'package.json')];
	const fileNameThatLikelyExists: string =
		lookUpPaths.find((path: string) => {
			return FileService.sync.exists(path, { relativeTo });
		}) ?? fileName;
	return ImportService.require(fileNameThatLikelyExists, relativeTo);
};

export default getFile;
