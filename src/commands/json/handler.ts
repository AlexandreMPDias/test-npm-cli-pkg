import { Arguments } from 'yargs';
import _Log from '../../services/log';
import * as consts from './constants';
import jsonHelpers from './helper';

const Log = _Log.instance('json');

const handler = (argv: Arguments<consts.IConfig>) => {
	const { fileName, mode, prop } = argv;

	try {
		const file = jsonHelpers.getFile(fileName, 'cwd');
		const content = file && jsonHelpers.accessProp(file, prop);
		if (content) {
			jsonHelpers.header(argv, Log);

			switch (mode) {
				case 'keys': {
					const keys = Object.keys(content).sort();
					console.log(keys);
					return;
				}
				case 'full': {
					console.log(content);
					return;
				}
				default: {
					throw new Error(`Unsupported error`);
				}
			}
		}
	} catch (err) {
		Log.abort(err);
	}
};

export default handler;
