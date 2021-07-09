import { path } from 'ramda';
import { DEFAULT_SHAPE } from '../constants';
import flat from '../../../utilities/object/flatten';

export type Flatten = Utils.Flatten.Full<Config.FileShape>;

export interface IOptions {
	required?: boolean;
}

export interface ITravel {
	<K extends keyof Flatten>(key: K, options?: IOptions): Flatten[K];
}

export const flatConfig: Flatten = flat(DEFAULT_SHAPE) as any;

export const travel = (config: Config.FileShape, fullKey: string) => path(fullKey.split('.'), config) as any;
