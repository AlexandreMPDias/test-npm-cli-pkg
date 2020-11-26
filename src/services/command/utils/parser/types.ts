export interface IOptions {
	aliases: string[];
	desc: string;
	flags: string[];
}

export interface ICommand {
	name: string;
	usage: string;
	description: string;
}

export interface IShape {
	name: string;
	description: string;
	commands: ICommand[];
	options: IOptions[];
}
