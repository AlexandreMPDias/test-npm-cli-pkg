type Fn<P extends any> = (args: P) => P;

const leftCompose = <P extends any[]>(a: Fn<P>, b: Fn<P>): Fn<P> => {
	return (arg: P) => b(a(arg));
};

const compose = <P extends any[]>(...fns: Fn<P>[]): Fn<P> => {
	return fns.reduce((carry: Fn<P> | null, current: Fn<P>): Fn<P> => {
		if (carry) {
			return leftCompose(carry, current);
		}
		return current;
	}, null)!;
};

export default compose;
