import { pipe } from 'ramda';
import CommandBuilder from '../../services/command';
import pullRequest from './pull-request';
import release from './release';

const subCommands = {
	'pull-request': pullRequest,
	release,
};

const addCommands = pipe(subCommands['pull-request'], subCommands.release);

const command = CommandBuilder.create({
	command: 'git',
	description: 'Git related commands',
	builder: (yargs) =>
		addCommands(
			yargs
				.demandCommand(1)
				.version('alfa')
				.option('batata', {
					describe:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					alias: ['b'],
					choices: ['hue', 'br', 'insalu uha'],
					demandOption: true,
				})
				.alias('pull-request', 'pr')
				.recommendCommands(),
		),
	middlewares: ['requireKnownCommands'],
});

export default command;
