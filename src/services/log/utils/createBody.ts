import { Chalk } from 'chalk';
import * as types from '../types';

interface IArgument {
	location?: string;
	message: any;
}

function createBody(this: types.LogThisType, _chalk: Chalk, args: IArgument) {
	const loc = args.location ?? this._location;
	const message = String(args.message);

	const body = this.modeSelect({
		simple: String(message),
		extended: `${loc} > ${message}`,
	});
	return _chalk(body);
}

export default createBody;
