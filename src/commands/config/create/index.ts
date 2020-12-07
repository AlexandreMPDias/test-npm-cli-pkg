import CommandBuilder from '../../../services/command';
import { constants } from '../../../services/config';
import FileService from '../../../services/file';

const configFileName = constants.FILE_NAME;

FileService.relative.resolve('home', configFileName);

const command = CommandBuilder.create({
	command: 'create',
	description: 'Creates a config file. By default, creates the file at the current working directory',
	builder: (yargs) =>
		yargs.option('global', {
			alias: ['g'],
			description: 'Creates a config on global scope',
			boolean: true,
		}),
}).handle(({ global }) => {
	const relativeTo = global ? 'home' : 'cwd';

	const exists = FileService.sync.exists(configFileName, { relativeTo });

	if (!exists) {
		FileService.sync.writeFile(configFileName, constants.DEFAULT_SHAPE, { relativeTo, onSuccess: 'log' });
	}
});

export default command;
