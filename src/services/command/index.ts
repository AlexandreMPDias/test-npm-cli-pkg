import commander from 'commander';
import * as types from './types';
import CommandInstance from './instance';

type CommandBuildArgs = {
	argv: string[];
	program: commander.Command;
};

class CommandBuilderConstructor {
	/** @deprecated */
	private cmds: ((args: CommandBuildArgs) => commander.Command)[] = [];

	public create = <Name extends string, Flags extends Record<string, Command.Flag>, Params extends Command.Parameters[]>(shape: Command.Shape<Name, Flags, Params>) => {
		return new CommandInstance(shape)
	}

	/** @deprecated */
	register = (
		registration: (args: CommandBuildArgs) => commander.Command,
	): CommandBuilderConstructor => {
		this.cmds.push(registration)
		return this;
	};

	parse = (arg: CommandBuildArgs) => {
		let prog = arg.program;
		this.cmds.forEach(cmd => {
			prog.addCommand(cmd({ program: prog, argv: [] }));
		})
		prog.parse()
	};
}

const CommandBuilder = new CommandBuilderConstructor();

export default CommandBuilder;
