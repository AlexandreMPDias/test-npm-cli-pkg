export const modes = ['keysOnly', 'full'] as const;

export const defaultMode: typeof modes[number] = 'keysOnly';

export interface IConfig {
	fileName: string;
	mode: 'keysOnly' | 'full';
	prop: string;
}
