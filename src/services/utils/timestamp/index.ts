interface ITimestampOptions {
	mode: 'HH:mm:ss';
}

const timestamp = (date?: Date | null, options?: ITimestampOptions): string => {
	const d = date || new Date();

	if (options?.mode === 'HH:mm:ss') {
		const values = [d.getHours(), d.getMinutes(), d.getSeconds()];
		return values
			.map(String)
			.map((x) => x.padStart(2, '0'))
			.join(':');
	}
	return '';
};

export default timestamp;
