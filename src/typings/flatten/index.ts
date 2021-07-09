declare namespace Utils.Flatten {
	export type Shallow<S> = import('./load').FlattenShallow<S>;
	export type Full<S> = import('./load').FlattenFull<S>;
}
