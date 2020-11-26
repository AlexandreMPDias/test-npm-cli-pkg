import chalk from 'chalk';
import { Arguments } from 'yargs';
import ImportService from '../../services/import';
import _Log from '../../services/log';
import * as consts from './constants';

const Log = _Log.instance('json');

const access = (content: object, props: string) => {
	let _content: any = content;
	props.split('.').forEach((prop) => {
		_content = _content[prop];
	});
	return _content;
};

const spread = (str: string, size: number) => {
	const max = size % 2 === 0 ? size : size + 1;
	const toFill = max - str.length;
	const half = Math.ceil(toFill / 2);
	const pad = ' '.repeat(half + 1);
	return [pad, str, ' '.repeat(half + (toFill % 2 === 0 ? 1 : 0))].join('');
};

const handler = (argv: Arguments<consts.IConfig>) => {
	const { fileName, mode, prop } = argv;

	const content = JSON.parse(ImportService.require('cwd', fileName));

	const max = Math.max(...[fileName, mode, prop].map((x) => x.length));

	Log.simple.info(chalk.cyan(`File's name set to:  [ ${chalk.red(spread(fileName, max))} ]`));
	Log.simple.info(chalk.cyan(`File's props set to: [ ${chalk.greenBright(spread(prop, max))} ]`));
	Log.simple.info(chalk.cyan(`Mode set to:         [ ${chalk.red(spread(mode, max))} ]`));
	Log.simple.info('');

	switch (mode) {
		case 'keysOnly': {
			const keys = Object.keys(content).sort();
			console.log(keys);
			return;
		}
		case 'full': {
			const out = access(content, prop);
			console.log(out);
			return;
		}
		default: {
			throw new Error(`Unsupported error`);
		}
	}
};

export default handler;
