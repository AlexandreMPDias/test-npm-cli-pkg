import { writeFileSync, mkdirSync, PathLike, readFileSync, existsSync } from 'fs';
import { sep, resolve } from 'path';
import * as utils from '../utils';
import * as types from './types';
import CommonConstructor from '../common';

class FileServiceSyncConstructor extends CommonConstructor {
	/**
	 * Synchronously writes data to a file, replacing the file if it already exists.
	 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	 * URL support is _experimental_.
	 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
	 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
	 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
	 * If `encoding` is not supplied, the default of `'utf8'` is used.
	 * If `mode` is not supplied, the default of `0o666` is used.
	 * If `mode` is a string, it is parsed as an octal integer.
	 * If `flag` is not supplied, the default of `'w'` is used.
	 */
	writeFile = (
		path: PathLike | number,
		data: string | NodeJS.ArrayBufferView | object,
		options: types.WriteFileOption = {},
	) => {
		const _ = this.getValues('writeFile', path, options);
		const parsedData = utils.data.stringify(data);
		return this.attempt(() => writeFileSync(_.path, parsedData, _.fsOptions as any), _);
	};

	/**
	 * Synchronously reads the entire contents of a file.
	 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	 * URL support is _experimental_.
	 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
	 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
	 * If a flag is not provided, it defaults to `'r'`.
	 */
	readFile = (path: PathLike | number, options: types.ReadFileOption = {}): string | Error => {
		const _ = this.getValues('readFile', path, options);
		return this.attempt(() => readFileSync(_.path, _.fsOptions as any), _);
	};

	/**
	 * Synchronous mkdir(2) - create a directory.
	 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	 * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
	 * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
	 */
	mkdir = (path: PathLike, options: types.MkdirOption = { recursive: true }): string => {
		const _ = this.getValues('mkdir', path, options);
		return this.attempt(() => mkdirSync(_.path, _.fsOptions as any), _);
	};

	/**
	 * Synchronously tests whether or not the given path exists by checking with the file system.
	 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	 * URL support is _experimental_.
	 */
	exists = (path: PathLike, options: types.ExistsOption = {}): boolean => {
		const _ = this.getValues('exists', path, options);
		return this.attempt(() => existsSync(_.path), _);
	};

	locateInPath = (pattern: string | RegExp, path: string): string => {
		const paths = path.split(/\\|\//);
		const checkPath = (): boolean => {
			const last = paths[paths.length - 1] || '';
			if (typeof pattern === 'string') {
				return last.endsWith(pattern) || last === pattern;
			} else {
				return !!last.match(pattern);
			}
		};
		while (paths.length) {
			if (checkPath()) {
				const p = paths.join(sep);
				if (existsSync(p)) {
					return p;
				}
			}
			paths.pop();
		}
		return path;
	};
}

export default FileServiceSyncConstructor;
