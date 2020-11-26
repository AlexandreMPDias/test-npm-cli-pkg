import { Argv } from 'yargs';
import errorHandler from './errorHandler';
import prettyHelp from './prettyHelp';

const middlewares: Utils.PipeFn<Argv<any>>[] = [errorHandler, (y) => y.strict(), prettyHelp];

const applyGlobalMiddlewares = (yargs: Argv<any>): Argv<any> => {
	return middlewares.reduce((y, middleware) => {
		return middleware(y);
	}, yargs);
};

export default applyGlobalMiddlewares;
