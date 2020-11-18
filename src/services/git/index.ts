import chalk from 'chalk';
import Exec from '../exec';

class GitConstructor {
	private _url: string = undefined as any;

	get url() {
		if (!this._url) {
			this._url = Exec.execSync('git config --get remote.origin.url').replace(/\n/g, '');
		}
		return this._url;
	}

	checkBranchExists = (
		target: string,
		options: { verbose?: boolean; throwOnError?: boolean } = { verbose: true, throwOnError: true },
	) => {
		const url = this.url;
		options.verbose &&
			console.log(`Checking if branch ${chalk.magenta(target)} exists in remote ${chalk.cyan(url)}`);
		const output = Exec.execSync(`git ls-remote --heads ${this.url} ${target}`);
		const exits = output.length > 0;

		if (options.throwOnError && !exits) {
			console.error(chalk.redBright('Branch not found in remote'));
			process.exit(1);
		}
		return exits;
	};
}

const Git = new GitConstructor();

export default Git;
