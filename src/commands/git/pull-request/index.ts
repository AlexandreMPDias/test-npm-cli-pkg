import CommandBuilder from '../../../services/command';

const command = CommandBuilder.create({
	command: 'pull-request [branch]',
	description: "Opens the github's create pull request's page using the default browser",
	builder: (yargs) =>
		yargs.positional('branch', {
			description: 'The target branch',
			type: 'string',
			default: 'dev',
		}),
}).handle(async (args) => {
	const handler = await import('./handle');
	handler.default(args);
});

export default command;
