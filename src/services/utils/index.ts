import chalk from 'chalk';
import Exec from '../exec';
import Platform from "../platform";

class UtilsConstructor {
	/**
	 * Opens a link at the local default browser
	 * 
	 * @param {string} url
	 * 
	 * @return {Promise<void>} a promise that resolves when the browser finish opening.
	 */
	openLink = async (url: string = 'http://localhost'): Promise<void> => {
		const open = Platform.select({ darwin: 'open', win32: 'start', default: 'xdg-open' });
		await Exec.exec(`${open} "${url}"`);
		console.log(chalk.green(`done.`));
	}
}

const Utils = new UtilsConstructor();

export default Utils;