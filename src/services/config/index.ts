import FileService from '../file';
import * as constants from './constants';
import load from './load';
import Log from '../log';
import getTravel, { ITravel } from './travel';

class ConfigServiceConstructor {
	private _config: Config.FileShape;
	public get: ITravel;

	public constructor() {
		FileService.relative.resolve('home', constants.FILE_NAME);
		this._config = load();
		this.get = getTravel(this._config);

		Log.setOptions({
			mode: this.get('terminal.consoleMode'),
			debugLevel: this.get('terminal.level'),
		});
	}
}

const ConfigService = new ConfigServiceConstructor();

export { constants };
export default ConfigService;
