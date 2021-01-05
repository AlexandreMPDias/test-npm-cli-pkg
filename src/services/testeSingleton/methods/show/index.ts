import { ITesteSingleton } from '../../loader';

function show(this: ITesteSingleton): string {
	return this._stringify();
}

export type Show = typeof show;
export default show;
