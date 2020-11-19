import { flatten } from 'ramda';
import { Argv } from 'yargs';
import { getCommands, getBasic } from '../../utils/parser';

const getEverySingleTinyAlias = (yargs: Argv<any>, _aliases: any): Record<string, true> => {
	const forceUniqueness: Record<string, true> = {};
	const flatAliases: string[] = flatten(Object.entries(_aliases)) as any;
	flatAliases.forEach((alias) => {
		forceUniqueness[alias] = true;
	});
	getCommands(yargs).forEach((cmd) => {
		forceUniqueness[cmd.name] = true;
	});
	return forceUniqueness;
};

const requireKnownCommands = <T>(yargs: Argv<T>): Argv<T> => {
	return yargs.check((argv, _aliases) => {
		// const aliases = getEverySingleTinyAlias(yargs, _aliases);

		const positionals = argv._.filter((x) => !x.startsWith('-'));

		const cmd = positionals.pop() || '';
		const parentScriptName = getBasic(yargs).name;

		if (cmd === parentScriptName) {
			throw new Error(`Missing required command`);
		}

		const acceptedCommands = getCommands(yargs).map((c) => c.name);

		// if (!aliases[cmd]) {
		if (!acceptedCommands.includes(cmd)) {
			throw new Error(`Unknown command: [ ${cmd} ]`);
		}
	});
};

export default requireKnownCommands;
