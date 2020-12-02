// Global Imports
import { Argv } from 'yargs';
import { pipe } from 'ramda';

// Commands
import config from './config';
import git from './git';
import json from './json';

export default {
	all: (yargs: Argv): Argv => pipe(config, git, json)(yargs),
};
