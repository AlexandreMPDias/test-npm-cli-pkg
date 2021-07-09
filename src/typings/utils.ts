declare namespace Utils {
	export type Foo = (...args: any[]) => any;

	export type Callback<Args extends any[], Ret = void> = (...args: Args) => Ret;

	export type PipeFn<Args extends any> = (arg: Args) => Args;
}
