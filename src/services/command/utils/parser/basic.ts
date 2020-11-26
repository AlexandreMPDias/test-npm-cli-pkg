import { Argv } from 'yargs';

export const getNameDescription = (yargs: Argv) => {
	try {
		const [name, description] = (yargs as any).getUsageInstance().getUsage();
		return {
			name: name.replace(/^\$\d+\s/, ''),
			description: description || '',
		};
	} catch {
		return null;
	}
};

export const getBasic = (yargs: Argv) => {
	const _out = { name: '', description: '' };

	const nameDesc = getNameDescription(yargs);
	if (nameDesc) {
		return nameDesc;
	}

	yargs.showHelp((help) => {
		let inDesc = false;
		help.split('\n')
			.map((x) => x.trim())
			.forEach((line, index) => {
				if (index === 0) {
					if (line.match(/^[a-zA-Z\.]+\s<command>$/)) {
						_out.name = '';
					} else {
						_out.name = line
							.replace(/^\S+\s+/, '')
							.replace(/(\[.+\])|(<.+>)/g, '')
							.trim();
					}
				}
				if (index === 1) {
					inDesc = true;
				}
				if (inDesc && !line.length) {
					inDesc = false;
				}
				if (inDesc) {
					_out.description += line;
				}
			});
	});

	return _out;
};

export default getBasic;
