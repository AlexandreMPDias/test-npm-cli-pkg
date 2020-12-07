import * as binder from '../binder';

import utils from './utils';
import sum from './sum';
import show from './show';
import nested from './nested';

const methods = {
	...utils,
	sum: binder.method(sum),
	show: binder.method(show),
	nested: binder.prop(nested),
};

export const methodKeys = Object.keys(methods) as Array<keyof typeof methods>;
export { utils };
export default methods;
