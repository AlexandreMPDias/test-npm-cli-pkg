interface ICreateSelection {
	<K extends PropertyKey>(active: K | Utils.Callback<never, K>): Utils.Selection<K>;
}

const createSelection: ICreateSelection = (activeProperty: PropertyKey | Utils.Foo) => {
	return (selectObject: any) => {
		const active = typeof activeProperty === 'function' ? activeProperty() : activeProperty;

		const currSelection = selectObject[active];
		if (currSelection) return currSelection;

		const defaultSelection = selectObject.default;
		if (defaultSelection) return defaultSelection;

		return undefined;
	};
};

export default createSelection;
