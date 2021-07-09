/**
 * https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
 */

type NonObjectKeysOf<T> = {
	[K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
export type ObjectPropertiesOf<T> = Omit<T, NonObjectKeysOf<T>>;
type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type SimpleFlatten<T> = Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<ObjectValuesOf<T>>;
