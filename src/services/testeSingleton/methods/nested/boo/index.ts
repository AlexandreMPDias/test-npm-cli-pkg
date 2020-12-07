import { ITesteSingleton } from '../../../loader';

function nested(this: ITesteSingleton) {
	return {
		boo: (): void => {
			this.a = this.a + 1;
		},
	};
}

export type Boo = ReturnType<typeof nested>['boo'];
export default nested;
