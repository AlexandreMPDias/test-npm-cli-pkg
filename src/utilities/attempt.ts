type AttemptFn<Ret> = () => Ret;

interface IAttempt {
	<Ret>(foo: AttemptFn<Ret>, onError?: undefined): Ret | Error;
	<Ret, Ret2>(foo: AttemptFn<Ret>, onError?: ((err: Error) => Ret2) | undefined): Ret | Ret2;
}

const attempt: IAttempt = <Ret, Ret2>(foo: () => Ret, onError?: (err: Error) => Ret2): Ret | Error => {
	try {
		return foo();
	} catch (err) {
		if (onError) {
			return onError(err) as any;
		}
		return err;
	}
};

export default attempt;
