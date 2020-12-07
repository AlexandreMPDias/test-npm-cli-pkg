import {
	ITesteSingletonPublicMethods as Methods,
	ITesteSingletonPrivateMethods as PrivateMethods,
} from './methods/index-types';

export interface ITesteSingleton extends Methods, PrivateMethods {
	/**
	 * Value a
	 */
	a: number;

	/**
	 * Value b
	 */
	b: number;
}

/**
 * ! Idk why/how this works, but hey... horse given, you dont look at it's teeth
 */
export abstract class ITesteSingleton implements ITesteSingleton {}

type PrivateKeys = keyof PrivateMethods;

export type ITesteSingletonInstance = Omit<ITesteSingleton, PrivateKeys>;

export type Properties = Omit<ITesteSingleton, keyof Methods | keyof PrivateMethods>;
