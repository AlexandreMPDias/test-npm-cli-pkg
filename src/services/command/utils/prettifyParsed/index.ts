import { IShape } from '../parser';
import * as help from './helpers';

const br = {};

const prettifyParsed = (uglyParsed: IShape) => {
	const parsed = help.paintParsed(uglyParsed);
	return [
		parsed.name,
		parsed.description,
		br,
		``,
		`Commands:`,
		parsed.commands.join('\n'),
		br,
		`Options:`,
		parsed.options.join('\n'),
		br,
	]
		.filter((x) => x)
		.map((x) => (typeof x === 'string' ? x : ''))
		.join('\n');
};

export default prettifyParsed;
