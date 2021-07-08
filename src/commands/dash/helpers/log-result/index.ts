import { Args, Payload } from '../../types';
import Utils from '../../../../services/utils';
import chalk from 'chalk';

const terminalSpread = () => console.log('\n'.repeat(2));

export const logResult = (args: Args, payload: Payload) => {
	const now = Utils.timestamp(null, { mode: 'HH:mm:ss' });
	const timestamp = `{ ${chalk.greenBright(now)} }`;

	terminalSpread();

	if (args.action === 'start') {
		console.log(`${timestamp}: dash [ ${chalk.cyan('starting')} ]`);
	}
	if (args.action === 'end') {
		console.log(`${timestamp}: dash [ ${chalk.cyan('ending')} ]`);
	}

	if (args.lastDash) {
		console.log(chalk.yellow(`last dash of the day`));
	}

	const content = payload.content ? '\n' + payload.content : 'None';
	console.log(chalk.yellow('Comment: '), content);

	terminalSpread();
};
