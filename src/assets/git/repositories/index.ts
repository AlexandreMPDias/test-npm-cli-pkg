import * as repos from './data';
import { mutate } from './mutations';

const data = mutate(repos.data);
const list = Object.values(data) as Structure[];

type Data = typeof data;
interface IRepoDeclaration {
	/**
	 * With alias included
	 */
	keysWithAlias: { [K in keyof Data]: Data[K]['alias'][number] }[keyof Data];

	/**
	 * Without alias included
	 */
	keys: keyof Data;
}

type Repos<K extends keyof IRepoDeclaration = 'keys'> = IRepoDeclaration[K];
type Environments = Data[keyof Data]['environment'];

type StrutKey = keyof Data[keyof Data];
type BaseStructure = { [SK in StrutKey]: { [K in keyof Data]: Data[K][SK] }[keyof Data] };
type FixedStructure = {
	uri: Record<Config.Git.CloneMethod, string>;
	alias: string[];
};

type Structure = Omit<BaseStructure, keyof FixedStructure> & FixedStructure;

export { data, list, Data, Repos, Structure, IRepoDeclaration, Environments };
