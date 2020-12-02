import chalk from 'chalk';
import Log from '../../../services/log';

const isUsingFallbackProps = (): boolean => {
	const argv = process.argv.slice(2).join(' ');
	return ![/\s-p(\s|=)/, /\s--prop(\s|=)/].some((reg) => argv.match(reg));
};

const accessProp = (content: object | undefined, props: string): object | null => {
	if (content === undefined) {
		return null;
	}
	try {
		let _content: any = content;
		props.split('.').forEach((prop) => {
			_content = _content[prop];
		});
		if (_content === undefined) {
			throw new Error('');
		}
		return _content;
	} catch (err) {
		const usingFallbackProps = isUsingFallbackProps();

		const msg = `Property [ ${chalk.greenBright(props)} ] does not exist in file`;
		if (!usingFallbackProps) {
			throw new Error(msg);
		}
		if (props !== 'scripts') {
			Log.warn(msg, 'json');
		}
		return content;
	}
};

export default accessProp;
