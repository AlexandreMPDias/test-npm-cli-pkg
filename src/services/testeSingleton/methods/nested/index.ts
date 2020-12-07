import { ITesteSingleton } from '../../loader';
import * as binder from '../../binder';

import properties from './properties';
import fooBinder from './foo';
import booBinder from './boo';

function nested(this: ITesteSingleton): ITesteSingleton['nested'] {
	const props = binder.prop(properties)(this);

	return {
		...props,
		...binder.prop(fooBinder)(this),
		...binder.prop(booBinder)(this),
	};
}

export default nested;
