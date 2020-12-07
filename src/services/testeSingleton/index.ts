import * as loader from './loader';
import methods, { methodKeys } from './methods';

export class TesteSingleConstructorClass implements loader.Properties {
	public a: number;
	public b: number;
	public privKey: any;

	constructor(a: number, b: number) {
		this.a = a;
		this.b = b;
	}
}

export const instantiate = (a: number, b: number): loader.ITesteSingleton => {
	const instance: any = new TesteSingleConstructorClass(a, b);

	const binder: any = {};
	methodKeys.forEach((key) => {
		binder[key] = methods[key](instance);
	});

	return Object.assign(instance, binder);
};
