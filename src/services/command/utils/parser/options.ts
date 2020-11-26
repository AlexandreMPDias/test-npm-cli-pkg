import { Argv } from 'yargs';
import * as types from './types';

const injectedOptions: types.IOptions[] = [
	{
		aliases: ['--help'],
		desc: 'Show help',
		flags: [],
	},
	{
		aliases: ['--version'],
		desc: 'Show version number',
		flags: [],
	},
];

const extractAlias = (opt: string) => {
	const [inlineAlias] = opt
		.split(/\s\s/)
		.map((x) => x?.trim())
		.filter((x) => x?.length);
	return inlineAlias.split(', ').map((x) => x.trim());
};

const extractDescriptionAndFlags = (opt: string) => {
	const descFlag = opt
		.split(/\s\s/)
		.map((x) => x?.trim())
		.filter((x) => x?.length)
		.slice(1)
		.join('  ');

	const firstIdk = descFlag.indexOf('[');
	const desc = (firstIdk > 0 ? descFlag.substring(0, firstIdk) : descFlag).replace(/\s\s/g, ' ');
	const inlineFlags = firstIdk > 0 ? descFlag.substring(desc.length) : '';

	const flags = inlineFlags
		.split('] [')
		.map((x) => x.trim().replace(/^\[/, '').replace(/\]$/, ''))
		.filter((x) => x.length > 0)
		.map((x) => `[${x}]`);

	return { desc, flags };
};

const sortOptions = (options: types.IOptions[]): types.IOptions[] => {
	const forceEnd: string[] = ['help', 'version'].reverse();
	const forceStart: string[] = [];
	const indexesToRemove: number[] = [];

	const [_forceStart, _forceEnd] = [forceStart, forceEnd].map((arr) =>
		options.filter((opt, index) => {
			const included = arr.some((key) => opt.aliases.includes(`--${key}`) || opt.aliases.includes(`-${key}`));
			if (included) {
				indexesToRemove.push(index);
			}
			return included;
		}),
	);

	const output: types.IOptions[] = options.filter((_, index) => !indexesToRemove.includes(index));

	return [..._forceStart, ...output, ..._forceEnd];
};

const forceUniqueOption = (options: types.IOptions[]): types.IOptions[] => {
	const uniqueOptions: Record<string, types.IOptions> = {};
	[...options, ...injectedOptions].forEach((opt: types.IOptions) => {
		const key = opt.aliases.reduce((largest, alias) => {
			return largest.length >= alias.length ? largest : alias;
		}, '');

		uniqueOptions[key] = opt;
	});
	return Object.values(uniqueOptions);
};

const parseOptions = (yargs: Argv) => {
	try {
		const y = yargs as any;

		const flags = (yargs as any).getOptions();
		const descriptions = y.getDescriptions();
		const flagKeys = ['boolean', 'array', 'choices', 'number', 'demandedOptions'];

		return Object.keys(flags.key).map(
			(key): types.IOptions => {
				return {
					aliases: [key].concat(flags.alias[key]),
					desc: descriptions[key],
					flags: flagKeys
						.map((fKey) => {
							const value = flags[fKey][key];
							if (value !== undefined) {
								return { key: fKey, value };
							}
							return null;
						})
						.filter((x) => x)
						.map((flag) => {
							if (flag?.key === 'choices') {
								return `choices: ${flag.value.join(', ')}`;
							}
							if (flag?.key === 'demandedOptions') {
								return 'required';
							}
							return flag?.value;
						})
						.map((x) => `[${x}]`),
				};
			},
		);
	} catch {
		let opts: Array<string> = [];
		yargs.showHelp((help) => {
			const nextOpts = help
				.replace(/\n/g, '')
				.replace(/\s\s+-/g, '\n-')
				.split('\n')
				.filter((line) => line.startsWith('-'));

			opts = opts.concat(nextOpts);
		});

		return opts.map((opt) => {
			const aliases = extractAlias(opt);
			const { desc, flags } = extractDescriptionAndFlags(opt);
			return { aliases, desc, flags };
		});
	}
};

const getOptions = (yargs: Argv) => {
	return sortOptions(forceUniqueOption(parseOptions(yargs)));
};

export default getOptions;
