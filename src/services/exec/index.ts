import util from 'util';
import * as chprocess from 'child_process';

const exec = util.promisify(chprocess.exec);
const spawn = util.promisify(chprocess.spawn);

const fixLineEnding = <T>(output: T): T => {
	if (output && typeof output === 'string') {
		return output.split('\r').join('') as any;
	}
	return output;
};

class ExecConstructor {
	public spawn = spawn;

	public exec = (cmd: string, options: chprocess.ExecOptions = {}) => {
		const output = exec(cmd, { ...options, encoding: 'utf-8' });
		return fixLineEnding(output);
	};

	public spawnSync = chprocess.spawnSync;

	public execSync = (cmd: string, options: chprocess.ExecSyncOptions = {}) => {
		// const c = cmd.startsWith('echo') ? cmd : 'echo ' + cmd;
		const output = chprocess.execSync(cmd, { ...options, encoding: 'utf-8' });
		return fixLineEnding(output);
	};
}

const Exec = new ExecConstructor();

export { ExecException, ExecSyncOptions } from 'child_process';

export default Exec;
