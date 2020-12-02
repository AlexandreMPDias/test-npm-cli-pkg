import * as path from 'path';
import { homedir } from 'os';
import { PathRelation } from '../types';
import { PathLike } from 'fs';

const RELATIVE_PATH_RESOLVER: Record<PathRelation, () => string> = {
	cwd: () => '',
	home: () => homedir(),
	root: () => path.join(...new Array(3).fill('..')),
};

const resolveRelativePath = <P extends PathLike | number>(pathRelationKey: PathRelation, _path: P): P => {
	if (typeof _path !== 'string') {
		return _path;
	}
	if (pathRelationKey in RELATIVE_PATH_RESOLVER) {
		const relativePath = RELATIVE_PATH_RESOLVER[pathRelationKey]();
		return path.join(relativePath, _path) as any;
	}
	throw new TypeError(`Invalid relation type [ ${pathRelationKey} ]`);
};

export const resolve = resolveRelativePath;

export default resolveRelativePath;
