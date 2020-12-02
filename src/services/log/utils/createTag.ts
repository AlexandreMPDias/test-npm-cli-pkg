import chalk, { Chalk } from 'chalk';
import * as types from '../types';

const BASE_ALIGN = 9;
const BASE_PAD = ' ';

const align = {
	center: (msg: string, max: number = BASE_ALIGN, pad: string = BASE_PAD) => {
		const leftOver = (max - msg.length) / 2;
		const fill = pad.repeat(leftOver);
		return `${fill}${msg}${fill}`;
	},
	left: (msg: string, max: number = BASE_ALIGN, pad: string = BASE_PAD) => {
		return msg.padEnd(max, pad);
	},
};

const extended = (_chalk: Chalk, msg: string, logType: types.LogType) => {
	const prefix = _chalk.bold('[');
	const sufix = _chalk.bold(']');
	const tag = _chalk(align.center(msg));
	return `${chalk.underline(prefix + tag + sufix)}: `;
};

function createTag(this: types.LogThisType, _chalk: Chalk, msg: string, logType: types.LogType): string {
	return this.modeSelect({
		extended: () => extended(_chalk, msg, logType),
		extended_caps: () => extended(_chalk, msg.toUpperCase(), logType),
		simple: () => {
			if (logType === 'info') return '';
			return _chalk(align.left(msg));
		},
	})();
}

export default createTag;
