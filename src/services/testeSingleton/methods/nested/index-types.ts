import { IProperties } from './properties';
import { Foo } from './foo';
import { Boo } from './boo';

export interface INested extends IProperties {
	foo: Foo;
	boo: Boo;
}
