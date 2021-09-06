import chalk from 'chalk';
import Exec from '../exec';
import Platform from '../platform';
import factories from './factories';
import timestamp from './timestamp';
class UtilsConstructor {
	public factories: typeof factories;
	public timestamp: typeof timestamp;

	constructor() {
		this.factories = factories;
		this.timestamp = timestamp;
	}

	/**
	 * Opens a link at the local default browser
	 *
	 * @param {string} url
	 *
	 * @return {Promise<void>} a promise that resolves when the browser finish opening.
	 */
	openLink = async (url: string = 'http://localhost'): Promise<void> => {
		const open = Platform.select({
			darwin: 'open',
			/**
			 * 'explorer' also works, but this SEEMS like a fail-proof approach
			 */
			win32: 'rundll32 url.dll,FileProtocolHandler',
			default: 'xdg-open',
		});
		await Exec.exec(`${open} "${url}"`);
		console.log(chalk.green(` done.`));
	};
}

const Utils = new UtilsConstructor();

export default Utils;
