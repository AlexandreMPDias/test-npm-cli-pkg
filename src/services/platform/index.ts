import chalk from 'chalk';
import Utils from '../utils';
import statics from './statics';
import createSelection from '../utils/factories/selection';

const loadCurrentPlatform = (): NodeJS.Platform => {
	return Object.keys(statics.platforms)
		.map((v) => v as NodeJS.Platform)
		.find((v) => v === process.platform)!;
};

class PlatformConstructor {
	public platforms = statics.platforms;

	private currPlatform: NodeJS.Platform = loadCurrentPlatform();

	public is = (...platforms: typeof process.platform[]) => {
		return platforms.some((p) => p === process.platform);
	};

	public select: Utils.Selection<NodeJS.Platform> = createSelection(() => this.currPlatform);

	unsupported = () => {
		console.log(`${chalk.red('Error: ')}[ ${chalk.cyan(this.currPlatform)} ] is not a supported platform.`);
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
