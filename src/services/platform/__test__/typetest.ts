import Platform from '../';

const _ = [
	Platform.select({
		aix: 2,
		android: 3,
	}),
	Platform.select({
		aix: 2,
		android: 3,
		default: 3,
	}) + 2,
];
