export type DebugLevel = 'log' | 'err' | 'warn' | 'success' | 'none';

export type Mode = 'simple' | 'extended';

export interface ILogOptions {
	debugLevel: DebugLevel;
	mode: Mode;
}

export type LogType = 'info' | 'warning' | 'error';

export interface LogThisType {
	modeSelect: Utils.Selection<Mode>;
	options: ILogOptions;
	_location: string;
}
