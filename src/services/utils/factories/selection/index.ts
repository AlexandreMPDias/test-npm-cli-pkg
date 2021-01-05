interface ICreateSelection {
	<K extends string>(active: K | Utils.Callback<never, K>): Utils.Selection<K>;
	<K extends PropertyKey>(active: K | Utils.Callback<never, K>): Utils.Selection<K>;
}

const createSelection: ICreateSelection = (activeProperty: PropertyKey | Utils.Foo) => {
	return (selectObject: any) => {
		const active = typeof activeProperty === 'function' ? activeProperty() : activeProperty;

		if (active in selectObject) return selectObject[active];

		if ('default' in selectObject) return selectObject.default;

		return undefined;
	};
};

export default createSelection;
