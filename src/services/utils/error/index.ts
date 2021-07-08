import chalk from 'chalk';

const parseMessage = (code: string, message?: string) => {
	const c = chalk.red.underline.bold(code);
	const m = chalk.redBright(message);

	if (message) {
		return [c, m].join('\n');
	}
	return c;
};

export class CliError extends Error {
	constructor(code: string, message?: string) {
		super(`\n\n${parseMessage(code, message)}\n\n`);
	}
}
