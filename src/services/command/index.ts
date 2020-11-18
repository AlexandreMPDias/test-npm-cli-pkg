import * as yargs from 'yargs';
import * as types from './types';
import utils from './utils'


class CommandBuilderConstructor {
	public utils = utils;

	public create: types.ICommandCreate = (args) => {
		const { command, description, builder, middlewares, validation } = args;
		const out1 = (y: yargs.Argv) => {
			return y.command(command, description, builder, undefined, middlewares);
		}

		const _handle: ReturnType<types.ICommandCreate>['handle'] = (handler) => {
			return (y: yargs.Argv) => {
				return y.command(command, description, builder, handler, middlewares);
			}
		}
		const output = Object.assign(out1, { handle: _handle }) as any;
		if (validation) {
			return (y: yargs.Argv) => {
				const argv = output(y).argv;
				const errorMessage = validation(argv);
				if (errorMessage) {
					this.utils.throw(y, errorMessage, {});
				}
				return y;
			}
		}
		return output
	}
}

const CommandBuilder = new CommandBuilderConstructor();

export default CommandBuilder;
