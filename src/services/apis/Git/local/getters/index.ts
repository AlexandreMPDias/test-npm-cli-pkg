import Exec from '../../../../exec';
import { run, runSync, IRunOptions } from '../../../../run';

const getters = {
	origin: {
		cmd: 'git config --get remote.origin.url',
		evolve: (s: string | null) => s?.replace(/\n/g, ''),
		message: "fetching remote's origin",
	},
	activeBranch: {
		cmd: 'git rev-parse --abbrev-ref HEAD',
		evolve: (s: string | null) => s?.replace(/\n/g, ''),
		message: 'fetching remote active branch',
	},
	organization: {
		cmd: 'git config --get remote.origin.url',
		evolve: (s: string | null) =>
			s
				?.replace(/\n/g, '')
				.replace(/.+@\w+.com:/, '')
				.replace(/https?:\/\/.+.com\//, '')
				.replace(/\/.+/, ''),
		message: "fetching remote's organization",
	},
};

type GetterKey = keyof typeof getters;

type GetterRun = {
	sync: (options?: IRunOptions) => string | null;
	async: (options?: IRunOptions) => Promise<string | null>;
};

export type Getter = { [K in GetterKey]: GetterRun };

const createGetters = (): Getter => {
	const out: any = {};
	Object.entries(getters).forEach(([key, { cmd, evolve, message }]) => {
		out[key] = {
			sync: (opts?: IRunOptions) => runSync(() => evolve(Exec.execSync(cmd)), message, opts),
			async: (opts?: IRunOptions) => run(async () => evolve((await Exec.exec(cmd)).stdout), message, opts),
		};
	});
	return out;
};

export { createGetters };
