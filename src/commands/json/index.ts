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
				description: 'The relative path of the json file in the current dir to be opened.',
				default: 'package.json',
				type: 'string',
			})
			.option('prop', {
				alias: ['p'],
				description: "The json's file property to be read. Nested props with (.) are accepted.",
				default: 'scripts',
				type: 'string',
			})
			.option('mode', {
				alias: ['m'],
				description: "The output mode to display the file's property.",
				default: consts.defaultMode,
				choices: consts.modes,
			});
		return output;
	},
}).handle(handler);

export default command;
