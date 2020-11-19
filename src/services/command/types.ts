import { Arguments, Argv, BuilderCallback, MiddlewareFunction } from 'yargs';
import { Middleware } from './middlewares';

type YargsCallback<T = {}> = (yargs: Argv<T>) => Argv<T>;

export interface ICommandCreate {
	<T, U>(args: {
		command: string;
		description: string;
		builder: BuilderCallback<{}, U>;
		middlewares?: Middleware[];
		/** @deprecated */
		validation?: (argv: Arguments<U>) => string | undefined;
	}): {
		(yargs: Argv<T>): Argv<T>;
		handle: (handler: Callback<Arguments<U>>) => YargsCallback<T>;
	};
}
