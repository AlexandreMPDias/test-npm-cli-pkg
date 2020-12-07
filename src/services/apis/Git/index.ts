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

	public get: local.getter.Getter = local.getter.createGetters();
	public fetch: ext.fetch.Fetch = ext.fetch.fetch;
	public checkBranchExists: local.checkBranchExists.Type = local.checkBranchExists.method;
	public hasGitDir: local.hasGitDir.Type = local.hasGitDir.method;
	public commit: ext.commit.Type = {} as any;

	constructor() {
		this.commit = ext.commit.bind(this);
	}
}

const Git = new GitConstructor();

export default Git;
