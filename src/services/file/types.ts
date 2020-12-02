export interface IPathRelationDeclaration {
	/**
	 * The current working dir
	 */
	cwd: boolean;

	/**
	 * This package's instalation dir
	 */
	root: boolean;

	/**
	 * The OS's home directory
	 */
	home: boolean;
}

export type LogOptions = 'log' | 'abort' | null;

export type PathRelation = keyof IPathRelationDeclaration;

export interface IOptions {
	/**
	 *
	 */
	relativeTo?: PathRelation;

	/**
	 *
	 */
	onSuccess?: LogOptions;

	/**
	 *
	 */
	onError?: LogOptions;
}

type Omitted = 'encoding';

export type FsType<T> = Omit<T, Omitted> & Partial<Pick<T, Omitted extends keyof T ? Omitted : never>>;

export type WithOptions<T> = FsType<T> & IOptions;
