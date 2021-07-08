export type Chooseable = Readonly<string | number>;

export interface Options<N extends string, C extends Chooseable> {
	name: N;
	required?: boolean;
	choices: C[];
	description?: string;
}
