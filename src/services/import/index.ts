import * as path from 'path';
import { readFileSync } from 'fs';

interface IPathRelation {
	/**
	 * The current working dir
	 */
	cwd: boolean;

	/**
	 * This package's instalation dir
	 */
	root: boolean;
}

class ImportServiceConstructor {
	private _cachedPackageJSON: any;

	public get packageJSON() {
		if (!this._cachedPackageJSON) {
			this._cachedPackageJSON = require('../../../package.json');
		}
		return this._cachedPackageJSON;
	}

	open = (relative: keyof IPathRelation, _path: string): string => {
		// if(relative === 'cwd') {
		// 	throw
		// }
		if (relative === 'root') {
			const prefix = new Array(3).fill('..');
			return readFileSync(path.join(...prefix, _path), { encoding: 'utf-8' });
		}
		throw new ReferenceError(`Invalid relation type [ ${relative} ]`);
	};
}

const ImportService = new ImportServiceConstructor();

export default ImportService;
