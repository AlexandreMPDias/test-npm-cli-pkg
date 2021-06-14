const DEFAULT_SPRINT = 0;

const getCurrentWeekNumber = (): number => {
	const now = new Date();
	const onejan = new Date(now.getFullYear(), 0, 1);
	return Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
};

const getDefaultSprintNumberFn = (value: number): number => {
	if (value === DEFAULT_SPRINT) {
		const week = getCurrentWeekNumber();
		const sprint = week - 1;
		return sprint;
	}
	return value;
};

export const getDefaultSprintNumber = Object.assign(getDefaultSprintNumberFn, {
	default: DEFAULT_SPRINT,
});
