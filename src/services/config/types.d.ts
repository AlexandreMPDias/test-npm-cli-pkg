declare namespace Config {
	type FileShape = {
		git: {
			cloneMethod: Config.Git.CloneMethod;
		};
		terminal: {
			level: Config.Terminal.Level;
			consoleMode: Config.Terminal.Mode;
			beforeEach: Config.Terminal.BeforeMiddlewares;
		};
	};
}

declare namespace Config.Git {
	type CloneMethod = 'https' | 'ssh';
}

declare namespace Config.Terminal {
	type Level = 'log' | 'err' | 'warn' | 'success' | 'none' | 'debug';

	type Mode = 'simple' | 'extended' | 'extended_caps';

	type BeforeMiddlewares = {
		consoleClear: boolean;
	};
}
