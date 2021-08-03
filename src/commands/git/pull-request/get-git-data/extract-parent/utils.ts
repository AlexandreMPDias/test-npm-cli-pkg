import chalk from 'chalk';

export class ExtractRet {
	public readonly reason: string;
	constructor(public readonly value: string | null, reason?: string) {
		if (reason) {
			this.reason = chalk.red(reason);
		} else {
			this.reason = chalk.green('ok');
		}
	}
}

export const ok = (value: string | null) => new ExtractRet(value);

export const bad = (reason: string) => new ExtractRet(null, reason);
