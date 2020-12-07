import { IProperties } from './properties';
import { Foo } from './foo';
import { Boo } from './boo';

export interface INested extends IProperties {
	/**
	 * Some description for foo
	 */
	foo: Foo;

	/**
	 * Some description for boo
	 */
	boo: Boo;
}
