import * as path from 'path';
import { readFileSync } from 'fs';
import _Log from '../log';

const Log = _Log.instance('ImportService');

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

	require = (relative: keyof IPathRelation, _path: string): object => {
		if (relative === 'cwd') {
			const prefix = process.cwd();
			return this._require(path.join(prefix, _path));
		}
		if (relative === 'root') {
			const prefix = new Array(3).fill('..');
			return this._require(path.join(...prefix, _path));
		}
		return Log.abort(`Invalid relation type [ ${relative} ]`);
	};

	private _require = (_path: string): object => {
		const sufix = path.extname(_path);
		if (sufix && sufix !== '.json') {
			throw new TypeError(`Invalid extension for file ${_path}`);
		}
		try {
			const fileContent: string = readFileSync(_path, { encoding: 'utf-8' });
			return JSON.parse(fileContent);
		} catch (err: unknown) {
			return Log.abort(err);
		}
	};
}

const ImportService = new ImportServiceConstructor();

export default ImportService;
