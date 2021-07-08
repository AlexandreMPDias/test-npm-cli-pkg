import ConfigService, { constants } from '../../services/config';
import FileService from '../../services/file';
import { run } from '../../services/run';

import { Args } from './types';
import { askComment, parsePayload, logResult, submitForm } from './helpers';

const configFileName = constants.FILE_NAME;

FileService.relative.resolve('home', configFileName);

export const handler = async (args: Args) => {
	ConfigService.get('commands.dash.timezone', { required: true });
	ConfigService.get('commands.dash.token', { required: true });

	const comment = await askComment();
	console.log();

	const payload = parsePayload(args, comment);

	await run(() => submitForm(payload), 'submitting form to clickup', {
		throwError: true,
	});

	logResult(args, payload);
};
