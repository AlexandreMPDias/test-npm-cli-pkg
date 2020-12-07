import { ITesteSingleton } from '../loader';
import getBinder from '../../utils/binder';

const { method, prop } = getBinder<ITesteSingleton>();

export { method, prop };
