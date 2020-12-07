import * as loader from './loader';
import methods, { methodKeys } from './methods';

export class TesteSingleConstructor extends loader.ITesteSingleton {
	public a: number;
	public b: number;
	public privKey: any;

	constructor(a: number = 2, b: number = 3) {
		super();
		this.a = a;
		this.b = b;

		methodKeys.forEach((key) => {
			const out: any = methods[key](this);
			this[key] = out;
		});
	}
}

const TesteSingle = new TesteSingleConstructor();

export default TesteSingle;
