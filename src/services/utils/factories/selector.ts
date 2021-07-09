/**
 * Declaration of a Select function
 * (Exact same behaviour as react-native.Platform.select)
 */
interface ISelector<All> {
	/**
	 * Some properties are set, but default value is set
	 * Return may not be undefined (assuming T may not be undefined as well)
	 */
	<Part extends Partial<All>>(select: Part): {
		(key: Omit<keyof Part, 'default'>): All[keyof All];
	};

	// <T>(select: T): (key: keyof T) => T[keyof T];
	/**
	 * Some properties are set, but default value is set
	 * Return may not be undefined (assuming T may not be undefined as well)
	 */
	// <T>(select: T & { default: T[keyof T] }): (key: keyof T | 'default') => T[keyof T];
}

const _createSelector = (selectObject: any) => {
	return (activeProperty: any) => {
		const active = typeof activeProperty === 'function' ? activeProperty() : activeProperty;

		if (active in selectObject) return selectObject[active];

		if ('default' in selectObject) return selectObject.default;

		return undefined;
	};
};

const createSelector = <All>() => {
	const selector: ISelector<All> = _createSelector;

	return { for: selector };
};

export default createSelector;
