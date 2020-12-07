import util from 'util';
import * as chprocess from 'child_process';

const exec = util.promisify(chprocess.exec);
const spawn = util.promisify(chprocess.spawn);

class ExecConstructor {
	public spawn = spawn;

	public exec = exec;

	public spawnSync = chprocess.spawnSync;

	public execSync = (cmd: string, options: chprocess.ExecSyncOptions = {}) => {
		return chprocess.execSync(cmd, { ...options, encoding: 'utf-8' });
	};
}

const Exec = new ExecConstructor();

export default Exec;
