import chalk from 'chalk';

class PlatformConstructor {
	public platforms: { [key in NodeJS.Platform]: string } = {
		aix: 'aix',
		android: "android",
		cygwin: "cygwin",
		darwin: "darwin",
		freebsd: "freebsd",
		linux: "linux",
		openbsd: "openbsd",
		sunos: "sunos",
		win32: "win32",
		netbsd: 'netbsd'
	}


	public currPlatform: NodeJS.Platform = Object.keys(this.platforms).map(v => v as NodeJS.Platform).find(v => v === process.platform)!;

	public is = (...platforms: typeof process.platform[]) => {
		return platforms.some(p => p === process.platform);
	}

	select: {
		<T>(selectObject: { [key in NodeJS.Platform]: T }): T;
		<T>(selectObject: { [key in NodeJS.Platform]?: T } & { default: T }): T;

	} = (selectObject: any) => {
		const currSelection = selectObject[this.currPlatform];
		if (currSelection) return currSelection;

		const defaultSelection = selectObject.default;
		if (defaultSelection) return defaultSelection;

		return undefined
	}

	unsupported = () => {
		console.log(`${chalk.red('Error: ')}[ ${chalk.cyan(this.currPlatform)} ] is not a supported platform.`);
		console.log(chalk.red('Aborting.'));
		process.exit(0)
	}

	public humanReadableCurrPlatform: string = this.select({ win32: 'Windows', linux: 'Linux', android: 'Android', default: 'I don\'t know, lol' });

}

const Platform = new PlatformConstructor

export default Platform;