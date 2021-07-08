import { actionsValue, fieldIds } from './constants';
import { Args, Payload, CustomField } from '../../types';
import ConfigService from '../../../../services/config';

const makeCustomField = <T>(id: string, value: T): CustomField<T> => ({ id, value });

export const parsePayload = (args: Args, comment: string | null): Payload => {
	return {
		content: comment,
		customFields: [
			makeCustomField(fieldIds.action, actionsValue[args.action]),
			makeCustomField(fieldIds.lastDash, args.lastDash || null),
		],
		timezone: ConfigService.get('commands.dash.timezone', { required: true })!,
	};
};
