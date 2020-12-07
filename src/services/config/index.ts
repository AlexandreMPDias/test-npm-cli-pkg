import FileService from '../file';
import * as constants from './constants';
import load from './load';
import getTravel, { ITravel } from './travel';

class ConfigServiceConstructor {
	private _config: Config.FileShape;
	public get: ITravel;

	public constructor() {
		FileService.relative.resolve('home', constants.FILE_NAME);
		this._config = load();
		this.get = getTravel(this._config);
	}
}

const ConfigService = new ConfigServiceConstructor();

export { constants };
export default ConfigService;
