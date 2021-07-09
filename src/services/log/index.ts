import createSelection from '../utils/factories/selection';
import * as types from './types';
import { COLORS, INITIAL_OPTIONS } from './constants';
import utils from './utils';
import chalk from 'chalk';
import ConfigService from '../config';

class LogConstructor implements types.ILogConstructor {
	private options: Partial<types.ILogOptions>;
	private _location: string;
	public parent: LogConstructor | null = null;
	public simple: LogConstructor = {} as any;

	constructor(location: string = '', options: Partial<types.ILogOptions> = INITIAL_OPTIONS) {
		this._location = location;
		this.options = options;

		if (options.mode !== 'simple') {
			this.simple = new LogConstructor(this._location, { ...this.options, mode: 'simple' } as any);
		}
	}

	public skip = (n: number): LogConstructor => {
		console.log('\n'.repeat(n - 1));
		return this;
	};

	public setOptions = (options: Required<types.ILogOptions>) => {
		this.options = options;
		return this;
	};

	public instance = (location: string, options?: Partial<types.ILogOptions>): LogConstructor => {
		return new LogConstructor(location, {
			debugLevel: options?.debugLevel || 'log',
			mode: options?.mode || 'extended',
		});
	};

	public child = (location: string, options: Partial<types.ILogOptions> = {}): LogConstructor => {
		const base = this._location.length ? `${this._location}/` : '';
		const instance = this.instance(base + location, options);
		instance.parent = this;
		return instance;
	};

	public warn = (message: any, location?: string) => {
		console.log(this.createLog({ message, location, key: 'warn' }));
		return this;
	};

	public info = (message: any, location?: string) => {
		console.log(this.createLog({ message, location, key: 'info' }));
		return this;
	};

	public success = (message: any, location?: string) => {
		console.log(this.createLog({ message, location, key: 'success' }));
		return this;
	};

	public error = (message: any, location?: string) => {
		console.log(this.createLog({ message, location, key: 'error' }));
		return this;
	};

	public abort = (err: unknown, location?: string): never => {
		const message = err instanceof Error ? err.message : String(err);
		this.error(message, location);
		console.log(chalk.bold.red('\nAborting execution\n'));
		process.exit(1);
	};

	private createLog = (args: { location?: string; key: keyof typeof COLORS; message: any }): string => {
		const mode = ConfigService?.get('terminal.consoleMode');
		this.options.mode = ConfigService?.get('terminal.consoleMode') || 'best';

		const method = COLORS[args.key];
		const tag = utils.createTag.call(this as any, method.base, method.tag, args.key);
		const body = utils.createBody.call(this as any, method.bright, args);

		return [tag, body].join('').trim();
	};

	private modeSelect: Utils.Selection<types.ILogOptions['mode']> = createSelection(
		() => this.options.mode || INITIAL_OPTIONS.mode,
	);
}

const Log = new LogConstructor() as types.ILogConstructor;

export type LogInstance = typeof Log;

export default Log;
