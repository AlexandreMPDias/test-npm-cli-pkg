import CommandBuilder from '../../services/command';
import pullRequest from './pull-request';

type Args = [typeof pullRequest.name];

const command = CommandBuilder.create({
	name: 'git',
	description: 'Git related commands',
	flags: {},
	params: [{
		name: 'method',
		description: 'The git method to be called',
		accepts: [
			pullRequest.name
		]
	}],
	handle: (args: any) => {
		const [method]: Args = args;
		switch (method) {
			case 'pull-request': {
				pullRequest.handle(process.argv.slice(3));
				return;
			}
			default: {
				console.log("help");
			}
		}
	}
})

CommandBuilder.register(({ program }) => program
	.command('git')
	.description("Git related commands")
	// .addCommand(pullRequest(program))
	.action(({ args }) => command.handle(args))
)
export default command;