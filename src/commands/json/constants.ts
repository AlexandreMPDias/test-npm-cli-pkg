export const modes = ['keys', 'full'] as const;

export type Mode = typeof modes[number];

export const defaultMode: Mode = 'keys';

export interface IConfig {
	fileName: string;
	mode: Mode;
	prop: string;
}
