export type Actions = 'start' | 'end';

export interface CustomField<Value = unknown> {
	id: string;
	value: Value;
}

export interface Args {
	action: Actions;
	lastDash?: boolean;
}

export interface Payload {
	content: string | null;
	customFields: [CustomField<string>, CustomField<true | null>];
	timezone: string;
}
