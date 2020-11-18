import chalk from 'chalk';
import Utils from '../utils';

class PlatformConstructor {
	public platforms: { [key in NodeJS.Platform]: string } = {
		aix: 'aix',
		android: 'android',
		cygwin: 'cygwin',
		darwin: 'darwin',
		freebsd: 'freebsd',
		linux: 'linux',
		openbsd: 'openbsd',
		sunos: 'sunos',
		win32: 'win32',
		netbsd: 'netbsd',
	};

	private _currPlatform: NodeJS.Platform;

	constructor() {
		this._currPlatform = Object.keys(this.platforms)
			.map((v) => v as NodeJS.Platform)
			.find((v) => v === process.platform)!;
	}

	public get currPlatform(): NodeJS.Platform {
		return this._currPlatform;
	}

	public is = (...platforms: typeof process.platform[]) => {
		return platforms.some((p) => p === process.platform);
	};

	public select: Utils.Selection<NodeJS.Platform> = Utils.factories.selection(() => this.currPlatform);

	unsupported = () => {
		console.log(`${chalk.red('Error: ')}[ ${chalk.cyan(this._currPlatform)} ] is not a supported platform.`);
		console.log(chalk.red('Aborting.'));
		process.exit(0);
	};

	public humanReadableCurrPlatform: string = this.select({
		win32: 'Windows',
		linux: 'Linux',
		android: 'Android',
		default: "I don't know, lol",
	});
}

const Platform = new PlatformConstructor();

export default Platform;
