import { SimpleFlatten } from './helpers/simple-flatten';
import { Spread } from './helpers/spread';

type RecursiveCount = 5 | 4 | 3 | 2 | 1 | 0;
type Minus<Value extends RecursiveCount> = { 5: 4; 4: 3; 3: 2; 2: 1; 1: 0; 0: 0 }[Value];
type Intersect<A, B, enabled extends boolean> = enabled extends true ? A & B : A;

// ---------------------------

type RecursiveTimes<S, N extends RecursiveCount = 5, Full extends boolean = false> = N extends 0
	? S
	: RecursiveTimes<Intersect<SimpleFlatten<S>, S, Full>, Minus<N>, Full>;

export type FlattenShallow<S> = RecursiveTimes<Spread<S>, 5, false>;
export type FlattenFull<S> = RecursiveTimes<Spread<S>, 5, true>;
