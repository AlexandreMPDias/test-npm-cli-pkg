import { ITesteSingleton } from '../../../loader';

function nested(this: ITesteSingleton) {
	return {
		foo: (): number => {
			return this.a;
		},
	};
}

export type Foo = ReturnType<typeof nested>['foo'];
export default nested;
