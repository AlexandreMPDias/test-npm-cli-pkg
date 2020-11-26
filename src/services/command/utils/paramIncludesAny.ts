import { Arguments } from 'yargs';

export default <T>(argv: Arguments<T>, ...options: Arguments<T>['_']): boolean => {
	return argv._.some((param) => options.includes(param));
};
