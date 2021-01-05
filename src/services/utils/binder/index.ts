const getBinder = <Instance>() => {
	const method = <InstanceMethod extends (this: Instance, ...args: any[]) => any>(instanceMethod: InstanceMethod) => {
		return (instance: Instance) => instanceMethod.bind(instance);
	};

	const prop = <Out extends object>(binder: (this: Instance) => Out) => {
		return (instance: Instance): Out => (binder as any).bind(instance)();
	};

	return { method, prop };
};

export default getBinder;
