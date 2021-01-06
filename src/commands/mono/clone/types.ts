import chalk from 'chalk';
import CommandBuilder from '../../../services/command';
import { Arguments } from 'yargs';

export type Choices = Array<Repositories.Key<'keysWithAlias'>>;

export type Args = Arguments<{
	target: Choices;
}>;
