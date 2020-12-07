import { Argv } from 'yargs';

const requireKnownCommands = <T>(yargs: Argv<T>): Argv<T> => {
	return yargs.strict().check((argv, _aliases) => {
		if (argv.help) {
			return;
		}
		const positionals = argv._.map(String).filter((x) => !x.startsWith('-'));

		const y = yargs as any;
		const cmd = positionals.pop() || '';
		const parentScriptName = positionals[positionals.length - 1];

		// if (!parentScriptName || cmd === parentScriptName) {
		// 	throw new Error(`Missing required command`);
		// }

		const acceptedCommands = y.getCommandInstance()?.getCommands();

		if (acceptedCommands.length && !acceptedCommands.includes(cmd)) {
			throw new Error(`Unknown command: [ ${cmd} ]`);
		}
	});
};

export default requireKnownCommands;
