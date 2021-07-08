import { Chooseable, Options } from './types';

const makeBuilder = <N extends string, C extends Chooseable>({ required, name, ...builder }: Options<N, C>) => {
	if (required) {
		return {
			...builder,
			coerce: (value?: C) => {
				if (!builder.choices.includes(value as any)) {
					throw new Error(`Missing required [ ${name} ] = [ ${value} ]`);
				}
			},
		};
	}

	return builder;
};

export const makeChoices = <N extends string, C extends Chooseable>(options: Options<N, C>) => {
	const { name, choices } = options;

	return {
		name,
		choices,
		builder: makeBuilder(options),
		test: (value?: C) => {
			if (!choices.includes(value as any)) {
				throw new Error(`Invalid [ ${name} ] = [ ${value} ]`);
			}
		},
	};
};
