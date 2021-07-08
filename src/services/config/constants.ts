export const FILE_NAME = '.alex-config.json';

export const EMPTY_FIELD: any = 'null';

export const DEFAULT_SHAPE: Config.FileShape = {
	git: {
		cloneMethod: 'ssh',
	},
	terminal: {
		level: 'log',
		beforeEach: {
			consoleClear: false,
		},
		consoleMode: 'extended',
	},
	commands: {
		git: {
			'pull-request': {
				enableParentDetection: false,
			},
		},
		dash: {
			token: EMPTY_FIELD,
			timezone: EMPTY_FIELD,
		},
	},
};
