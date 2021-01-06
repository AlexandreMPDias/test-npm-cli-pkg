export const data = {
	core: {
		uri: {
			ssh: 'git@github.com:liberedu/core.git',
			https: 'https://github.com/liberedu/core.git',
		},
		alias: [],
		environment: 'react-native' as const,
	},
	'components-containers': {
		uri: {
			ssh: 'git@github.com:liberedu/components-containers.git',
			https: 'https://github.com/liberedu/components-containers.git',
		},
		alias: ['containers'],
		environment: 'react-native' as const,
	},
	'components-native': {
		uri: {
			ssh: 'git@github.com:liberedu/components-native.git',
			https: 'https://github.com/liberedu/components-native.git',
		},
		alias: ['native'],
		environment: 'react-native' as const,
	},
	'tutor-app': {
		uri: {
			ssh: 'git@github.com:liberedu/tutor-app.git',
			https: 'https://github.com/liberedu/tutor-app.git',
		},
		alias: ['tutor'],
		environment: 'react-native' as const,
	},
	'student-app': {
		uri: {
			ssh: 'git@github.com:liberedu/student-app.git',
			https: 'https://github.com/liberedu/student-app.git',
		},
		alias: ['student'],
		environment: 'react-native' as const,
	},
	'liberedu-api': {
		uri: {
			ssh: 'git@github.com:liberedu/liberedu-api.git',
			https: 'https://github.com/liberedu/liberedu-api.git',
		},
		alias: ['api'],
		environment: 'laravel' as const,
	},
	'liberedu-web': {
		uri: {
			ssh: 'git@github.com:liberedu/liberedu-web.git',
			https: 'https://github.com/liberedu/liberedu-web.git',
		},
		alias: ['web'],
		environment: 'laravel' as const,
	},
	pyro: {
		uri: {
			ssh: 'git@github.com:liberedu/pyro.git',
			https: 'https://github.com/liberedu/pyro.git',
		},
		alias: [],
		environment: 'firebase' as const,
	},
	'online-conference-service': {
		uri: {
			ssh: 'git@github.com:liberedu/online-conference-service.git',
			https: 'https://github.com/liberedu/online-conference-service.git',
		},
		alias: ['oser'],
		environment: 'nodejs' as const,
	},
};

export type Data = typeof data;
