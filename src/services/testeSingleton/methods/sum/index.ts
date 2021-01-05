import { ITesteSingleton } from '../../loader';

/**
 * Sums a and b
 */
function sum(this: ITesteSingleton): number {
	return this.a + this.b;
}

export type Sum = typeof sum;
export default sum;
