import chalk from 'chalk';

type ManyEntry = [key: string, value: string | number, paint?: chalk.ChalkFunction];

class LogInput {
	constructor(private basePaint: chalk.ChalkFunction) {}

	private internalSingle = (
		k: string,
		value: string | number,
		paint: chalk.ChalkFunction = this.basePaint,
		maxLen: number = 0,
	): LogInput => {
		const key = k + ': ';
		const pKey = key.padEnd(maxLen + 2, ' ');

		console.log(paint(pKey), value);

		return this;
	};

	single = (k: string, value: string | number, paint?: chalk.ChalkFunction, maxLen?: number): LogInput => {
		return this.skip().internalSingle(k, value, paint, maxLen).skip();
	};

	many = (...entries: ManyEntry[]): LogInput => {
		const maxLen = entries.reduce((m: number, curr: ManyEntry) => Math.max(m, curr[0].length), 0);

		this.skip();
		entries.forEach((entry) => this.internalSingle(...entry, maxLen));

		return this.skip();
	};

	object = <S>(source: S, ...entries: Array<[key: keyof S, paint?: chalk.ChalkFunction]>): LogInput => {
		const manyEntries: ManyEntry[] = entries.map(
			([key, paint]): ManyEntry => {
				return [String(key), String(source[key]), paint];
			},
		);

		this.many(...manyEntries);

		return this;
	};

	skip = (size: number = 0): LogInput => {
		console.log('\n'.repeat(size));
		return this;
	};

	setBasePaint = (basePaint: chalk.ChalkFunction): LogInput => {
		this.basePaint = basePaint;
		return this;
	};

	instance = (basePaint: chalk.ChalkFunction): LogInput => {
		return new LogInput(basePaint);
	};
}

export const logs = new LogInput(chalk.cyan);
