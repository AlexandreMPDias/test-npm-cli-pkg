import CommandBuilder from '../../services/command';
import * as consts from './constants';
import handler from './handler';

const command = CommandBuilder.create({
	command: 'json',
	description: 'Show the content of json file',
	builder: (yargs) => {
		const output = yargs
			.option('fileName', {
				alias: ['f'],
				description: 'The relative path of the json file in the current dir to be opened',
				default: 'package.json',
				type: 'string',
			})
			.option('prop', {
				alias: ['p'],
				description:
					"The json's file property to be read. Nested props with (.) are accepted. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
				default: 'scripts',
				type: 'string',
			})
			.option('mode', {
				alias: ['m'],
				description: "The output mode to display the file's property",
				default: consts.defaultMode,
				choices: consts.modes,
			});
		return output;
	},
}).handle(handler);

export default command;
