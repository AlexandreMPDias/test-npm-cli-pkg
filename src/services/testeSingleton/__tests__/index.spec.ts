import { instantiate } from '../index';
import { ITesteSingleton } from '../loader';
import { methodKeys } from '../methods';

const hasAccess = (instance: ITesteSingleton, testPrefix: string, prop: keyof ITesteSingleton) => {
	test(`${testPrefix}: ${prop}`, () => {
		expect(instance[prop]).not.toBeNull();
	});
};

describe('TesteSingleton', () => {
	const singleton = instantiate(2, 3);

	describe('has access to properties', () => {
		const properties = ['a', 'b'] as const;
		properties.forEach((p) => hasAccess(singleton, 'property', p));
	});

	describe('has access to methods', () => {
		methodKeys.forEach((m) => hasAccess(singleton, 'method', m));
	});

	describe('has access to nested properties', () => {
		test('nested.foo', () => {
			expect(singleton.nested.batata).toBe('Ah Minha Batata');
			expect(singleton.nested.potato).toBe('Oh My Potato');
			expect(singleton.nested.foo()).toBe(2);
		});
	});

	test('nested properties can mutate unested properties', () => {
		const _singleton = instantiate(2, 3);

		_singleton.a = 5;
		expect(_singleton.nested.foo()).toBe(5);
		expect(_singleton.a).toBe(5);

		_singleton.nested.boo();
		expect(_singleton.nested.foo()).toBe(6);
		expect(_singleton.a).toBe(6);
	});

	test('sum returns a+b', () => {
		expect(singleton.sum()).toBe(5);
	});

	test('stringify returns a+b as string', () => {
		expect(singleton.show()).toBe(`2+3`);
	});
});
