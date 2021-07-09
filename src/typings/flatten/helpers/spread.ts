import { ObjectPropertiesOf } from './simple-flatten';

type Str<S> = S extends string ? S : never;
type Join<A1 = never, A2 = never> = [A1] extends [never] ? Str<A2> : `${Str<A1>}.${Str<A2>}`;
export type Spread<S, Base extends Readonly<string> = never> = {
	[K in keyof S as Join<Base, K>]: K extends keyof ObjectPropertiesOf<S> ? Spread<S[K], Join<Base, K>> : S[K];
};
