import * as utils from './utils/index-types';
import { INested } from './nested/index-types';
import { Sum } from './sum';
import { Show } from './show';

export type ITesteSingletonPrivateMethods = utils.IUtils;

export interface ITesteSingletonPublicMethods {
	sum: Sum;
	show: Show;
	nested: INested;
}
