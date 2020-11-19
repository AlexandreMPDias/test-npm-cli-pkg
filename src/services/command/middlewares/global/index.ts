import { Argv } from 'yargs';
import errorHandler from './errorHandler';

const middlewares: Utils.PipeFn<Argv<any>>[] = [errorHandler, (y) => y.strict()];

const applyGlobalMiddlewares = (yargs: Argv<any>): Argv<any> => {
	return middlewares.reduce((y, middleware) => {
		return middleware(y);
	}, yargs);
};

export default applyGlobalMiddlewares;
