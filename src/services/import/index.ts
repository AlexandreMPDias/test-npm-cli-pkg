import _Log from '../log';
import moduleRequire from './require';

class ImportServiceConstructor {
	private _cachedPackageJSON: any;

	public get packageJSON() {
		if (!this._cachedPackageJSON) {
			this._cachedPackageJSON = require('../../../package.json');
		}
		return this._cachedPackageJSON;
	}

	require = moduleRequire;
}

const ImportService = new ImportServiceConstructor();

export default ImportService;
