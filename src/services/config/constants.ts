export const FILE_NAME = '.alex-config.json';

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
	},
};
