import { ITesteSingleton } from '../../loader';

export interface IProperties {
	batata: string;
	potato: string;
}

function nested(this: ITesteSingleton) {
	return {
		batata: 'Ah Minha Batata',
		potato: 'Oh My Potato',
	};
}

export default nested;
