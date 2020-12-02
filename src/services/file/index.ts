import _Log from '../log';
import FileServiceSyncConstructor from './sync';
import { validate, relative } from './utils';

const publicMethods = {
	validate,
	relative,
};

class FileServiceConstructor {
	public sync = new FileServiceSyncConstructor(_Log.instance('FileService.sync'));
}

const FileService = Object.assign(new FileServiceConstructor(), publicMethods);

export default FileService;
