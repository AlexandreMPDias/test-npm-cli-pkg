import { path } from 'ramda';
import { DEFAULT_SHAPE } from './constants';
import flat from '../../utilities/object/flatten';

type Nest<
	K1 extends keyof Config.FileShape,
	K2 = unknown,
	K3 = unknown,
	K4 = unknown,
	K5 = unknown,
	K6 = unknown,
	K7 = unknown,
	K8 = unknown
> = Utils.Flatten.Nest<Config.FileShape, K1, K2, K3, K4, K5, K6, K7, K8>;

export type Flatten = Nest<'git'> &
	Nest<'terminal'> &
	Nest<'terminal', 'beforeEach'> &
	Nest<'commands'> &
	Nest<'commands', 'git'> &
	Nest<'commands', 'git', 'pull-request'>;

export interface ITravel {
	<K extends keyof Flatten>(key: K): Flatten[K];
}

export const flatConfig: Flatten = flat(DEFAULT_SHAPE) as any;

const getTravel = (config: Config.FileShape): ITravel => {
	return (fullKey: string) => path(fullKey.split('.'), config) as any;
};

export default getTravel;
