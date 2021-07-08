import { path } from 'ramda';
import { DEFAULT_SHAPE } from '../constants';
import flat from '../../../utilities/object/flatten';

type Obj = Record<Readonly<string>, any>;
type Str<S> = S extends string ? S : never;
type Spread<S extends Obj, Base extends Readonly<string>> = {
	[K in keyof S as `${Base}.${Str<K>}`]: S[K];
};
type SpreadThrough<S extends Obj, Base extends keyof S> = Spread<S[Base], Str<Base>>;
type SpreadRemoving<S extends Obj, Base extends keyof S, Additional extends Obj, toOmit extends string> = Spread<
	Omit<S[Base], toOmit> & Additional,
	Str<Base>
>;

type Git = SpreadThrough<Config.FileShape, 'git'>;

type TerminalBeforeEach = SpreadThrough<Config.FileShape['terminal'], 'beforeEach'>;
type Terminal = SpreadRemoving<Config.FileShape, 'terminal', TerminalBeforeEach, 'beforeEach'>;

type CommandsGitPullRequest = SpreadThrough<Config.FileShape['commands']['git'], 'pull-request'>;
type CommandsGit = SpreadRemoving<Config.FileShape['commands'], 'git', CommandsGitPullRequest, 'pull-request'>;
type CommandsDash = SpreadThrough<Config.FileShape['commands'], 'dash'>;
type Commands = SpreadRemoving<Config.FileShape, 'commands', CommandsGit, 'git'> &
	SpreadRemoving<Config.FileShape, 'commands', CommandsDash, 'dash'>;

export type Flatten = Git & Terminal & Commands;

export interface IOptions {
	required?: boolean;
}

export interface ITravel {
	<K extends keyof Flatten>(key: K, options?: IOptions): Flatten[K];
}

export const flatConfig: Flatten = flat(DEFAULT_SHAPE) as any;

export const travel = (config: Config.FileShape, fullKey: string) => path(fullKey.split('.'), config) as any;