import commander from 'commander';
import * as types from './types';

class CommandInstance<Name extends string, Flags extends Record<string, Command.Flag>, Params extends Command.Parameters[]> {
	private _name: Name;
	private _description: string;
	private _handler: Command.Shape<Name, Flags, Params>['handle'];

	private _flags: { [K in keyof Flags]: Flags[K] & { value?: Flags[K]['defaultTo'] } };

	private _params: (Command.Parameters & { value?: string })[];

	constructor(shape: Command.Shape<Name, Flags, Params>) {
		this._flags = shape.flags;
		this._params = shape.params;
		this._name = shape.name;
		this._description = shape.description;
		this._handler = shape.handle
	}


	get name() { return this._name }
	get description() { return this._description }
	get flags() {
		const fs = this._flags;
		return Object.entries(this._flags).reduce((total, [flagKey, flagValue]) => {
			total[flagKey] = { ...flagValue };
			return total;
		}, {} as any) as typeof fs
	}
	get params() { return this._params.map(p => ({ ...p })) }

	public handle = (argv?: string[]) => {
		let cmd = commander.name(this.name).description(this.description);
		cmd = cmd.option('-f, ---fuck', 'fuck')
		cmd = cmd.action((args) => {
			const params: any[] = args.args;
			const flags: any = {}
			Object.values(this._flags).forEach(flag => {
				const keywords: string[] = flag.keywords.concat([flag.name]);
				keywords.some(keyword => {
					if (keyword in args) {
						flags[flag.name] = args[keyword];
						return true;
					}
				})
			})
			this._handler(params, flags);
		}).parse(argv, argv ? { from: 'user' } : undefined);
	}

}

export default CommandInstance;