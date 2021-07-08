import CommandBuilder from '../../services/command';
import { constants } from '../../services/config';
import FileService from '../../services/file';

const configFileName = constants.FILE_NAME;

FileService.relative.resolve('home', configFileName);

const actions = CommandBuilder.utils.makeChoices({
	name: 'action',
	description: 'dash action to execute',
	choices: ['start', 'end'],
	required: true,
});

const command = CommandBuilder.create({
	command: 'dash',
	description: 'Starts or ends a Dash',
	builder: (yargs) => {
		return yargs.positional(actions.name, actions.builder).option('lastDash', {
			alias: ['l'],
			description: 'Creates a config on global scope',
			boolean: true,
		});
	},
	middlewares: ['requireKnownCommands'],
}).handle(async (argv) => {
	const action: any = argv._.find((arg) => actions.choices.includes(arg as any)) || argv.action;

	const { handler } = await import('./handler');

	actions.test(action);

	const parsedArgv = { ...argv, action };

	// return handler(argv as { [K in keyof typeof argv]: Exclude<typeof argv[K], undefined> });
	return handler(parsedArgv).catch(console.error);
});

export default command;
