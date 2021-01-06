import Exec from '../../exec';
import Log, { LogInstance } from '../../log';
import * as local from './local';
import * as ext from './external';

class GitConstructor {
	private _url: string = undefined as any;
	public log: LogInstance = Log;

	get url() {
		if (!this._url) {
			this._url = Exec.execSync('git config --get remote.origin.url').replace(/\n/g, '');
		}
		return this._url;
	}

	public clone: ext.clone.Type;
	public commit: ext.commit.Type;
	public fetch: ext.fetch.Fetch = ext.fetch.fetch;
	public get: local.getter.Getter = local.getter.createGetters();
	public checkBranchExists: local.checkBranchExists.Type = local.checkBranchExists.method;
	public hasGitDir: local.hasGitDir.Type = local.hasGitDir.method;

	constructor() {
		this.commit = ext.commit.bind(this);
		this.clone = ext.clone.bind(this);
	}
}

const Git = new GitConstructor();

export default Git;
