import { extname } from 'path';
import chalk from 'chalk';

export const extension = (filePath: string, ...supportedExtensions: string[]): void | never => {
	const filExtension = extname(filePath);
	if (filExtension?.length && !supportedExtensions.includes(filExtension)) {
		throw new TypeError(
			`${chalk.cyan(
				filePath,
			)}'s extension doesn't match the array of supported extensions.\nSupported extensions: ${supportedExtensions.join(
				', ',
			)}`,
		);
	}
};
