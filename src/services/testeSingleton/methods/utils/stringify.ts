import { ITesteSingleton } from '../../loader';

function stringify(this: ITesteSingleton): string {
	return `${this.a}+${this.b}`;
}

export type Stringify = typeof stringify;
export default stringify;
