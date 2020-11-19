import { Argv } from 'yargs';
import requireKnownCommands from './requireKnownCommands';

const middlewaresDeclaration = {
	requireKnownCommands,
};

export type Middleware = keyof typeof middlewaresDeclaration;

const applyMiddlewares = (yargs: Argv<any>, middlewares: Middleware[]): Argv<any> => {
	return middlewares.reduce((y: Argv<any>, middlewareKey: Middleware) => {
		const middleware = middlewaresDeclaration[middlewareKey];
		if (middleware) {
			return middleware(y);
		}
		return y;
	}, yargs);
};

export default applyMiddlewares;
