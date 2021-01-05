declare namespace Utils {
	type Foo = (...args: any[]) => any;

	type Callback<Args extends any[], Ret = void> = (...args: Args) => Ret;

	type PipeFn<Args extends any> = (arg: Args) => Args;
}
