import TesteSingle, { TesteSingleConstructor } from '../index';
import { ITesteSingleton } from '../loader';
import { methodKeys } from '../methods';

const hasAccess = (instance: ITesteSingleton, testPrefix: string, prop: keyof ITesteSingleton) => {
	test(`${testPrefix}: ${prop}`, () => {
		expect(instance[prop]).not.toBeNull();
	});
};

describe('TesteSingleton', () => {
	describe('has access to properties', () => {
		const properties = ['a', 'b'] as const;
		properties.forEach((p) => hasAccess(TesteSingle, 'property', p));
	});

	describe('has access to methods', () => {
		methodKeys.forEach((m) => hasAccess(TesteSingle, 'method', m));
	});

	describe('has access to nested properties', () => {
		test('nested.foo', () => {
			expect(TesteSingle.nested.batata).toBe('Ah Minha Batata');
			expect(TesteSingle.nested.potato).toBe('Oh My Potato');
			expect(TesteSingle.nested.foo()).toBe(2);
		});
	});

	test('nested properties can mutate unested properties', () => {
		const _singleton = new TesteSingleConstructor(2, 3);

		_singleton.a = 5;
		expect(_singleton.nested.foo()).toBe(5);
		expect(_singleton.a).toBe(5);

		_singleton.nested.boo();
		expect(_singleton.nested.foo()).toBe(6);
		expect(_singleton.a).toBe(6);
	});

	test('sum returns a+b', () => {
		expect(TesteSingle.sum()).toBe(5);
	});

	test('stringify returns a+b as string', () => {
		expect(TesteSingle.show()).toBe(`2+3`);
	});
});
