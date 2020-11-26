import createSelection from '../utils/factories/selection';
import * as types from './types';
import { COLORS, INITIAL_OPTIONS } from './constants';
import utils from './utils';

class LogConstructor {
	private options: types.ILogOptions;
	private _location: string;
	public simple: LogConstructor = {} as any;

	constructor(location: string = '', options: types.ILogOptions = INITIAL_OPTIONS) {
		this._location = location;
		this.options = options;

		if (options.mode !== 'simple') {
			this.simple = new LogConstructor(this._location, { ...this.options, mode: 'simple' });
		}
	}

	public instance = (location: string, options?: Partial<types.ILogOptions>): LogConstructor => {
		return new LogConstructor(location, {
			debugLevel: options?.debugLevel || 'log',
			mode: options?.mode || 'extended',
		});
	};

	public warning = (message: any, location?: string) => {
		console.warn(
			this.createLog({
				location,
				message,
				key: 'warning',
			}),
		);
	};

	public info = (message: any, location?: string) => {
		console.log(
			this.createLog({
				location,
				message,
				key: 'log',
			}),
		);
	};

	public error = (message: any, location?: string) => {
		console.error(
			this.createLog({
				location,
				message,
				key: 'error',
			}),
		);
	};

	public abort = (err: unknown, location?: string): never => {
		const message = err instanceof Error ? err.message : String(err);
		this.error(message, location);
		process.exit(1);
	};

	private createLog = (args: { location?: string; key: keyof typeof COLORS; message: any }): string => {
		const base = this.modeSelect({
			simple: COLORS[args.key].base.bold,
			extended: COLORS[args.key].base.bold.underline,
		});
		const bright = COLORS[args.key].bright;

		const tag = utils.createTag.call(this as any, base, args.key);
		const body = utils.createBody.call(this as any, bright, args);

		return [tag, body].join(' ').trim();
	};

	private modeSelect: Utils.Selection<types.ILogOptions['mode']> = createSelection(() => this.options.mode);
}

const Log = new LogConstructor();

export default Log;
