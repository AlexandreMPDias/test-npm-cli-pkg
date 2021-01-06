export type DebugLevel = 'log' | 'err' | 'warn' | 'success' | 'none' | 'debug';

export type Mode = Config.Terminal.Mode;

export interface ILogOptions {
	debugLevel: DebugLevel;
	mode: Mode;
}

export type LogType = 'info' | 'warn' | 'error' | 'success';

export interface LogThisType extends ILogConstructor {
	modeSelect: Utils.Selection<Mode>;
	options: ILogOptions;
	_location: string;
}

type LogMethod = (msg: any, location?: string) => ILogConstructor;

export interface ILogConstructor extends Record<LogType, LogMethod> {
	parent: ILogConstructor | null;
	simple: ILogConstructor;

	skip: (n: number) => ILogConstructor;

	setOptions: (options: ILogOptions) => ILogConstructor;
	instance: (location: string, options?: Partial<ILogOptions>) => ILogConstructor;
	child: (location: string, options?: Partial<ILogOptions>) => ILogConstructor;

	abort: (msg: unknown, location?: string) => never;
}
