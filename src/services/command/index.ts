import { Argv } from 'yargs';
import * as types from './types';
import utils from './utils';
import applyMiddlewares from './middlewares';

class CommandBuilderConstructor {
	public utils = utils;

	public create: types.ICommandCreate = (args: any) => {
		const out1: Utils.PipeFn<Argv> = this._create(args);
		const _handle: ReturnType<types.ICommandCreate>['handle'] = (handler) => this._create(args, handler);

		return Object.assign(out1, { handle: _handle }) as any;
	};

	private _create = (args: Parameters<types.ICommandCreate>[0], handler?: any): Utils.PipeFn<Argv> => {
		return (y: Argv) => {
			const { command, description, builder, middlewares = [] } = args;

			(y as any).registeredUsage = [...((y as any).registeredUsage || []), command];
			y = y.command(
				command,
				description,
				builder,
				handler,
				//  &&
				// 	((argv) => {
				// 		if (argv.help) {
				// 			throw new Error();
				// 		}
				// 		handler(argv);
				// 	})
			);
			y = applyMiddlewares(y, middlewares);

			return y;
		};
	};
}

const CommandBuilder = new CommandBuilderConstructor();

export default CommandBuilder;
