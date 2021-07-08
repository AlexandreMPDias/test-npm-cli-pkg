import axios from 'axios';
import { Payload } from '../../types';
import ConfigService from '../../../../services/config';

const baseUrl = 'https://form-submit.clickup.com/v1/form/dz83-13478/submit';

export const submitForm = async (payload: Payload) => {
	const token = ConfigService.get('commands.dash.token', { required: true });
	const url = `${baseUrl}?token=${token}&ngsw-bypass=true`;

	return axios.post(url, payload, {
		headers: {
			'content-type': 'application/json',
		},
	});
};
