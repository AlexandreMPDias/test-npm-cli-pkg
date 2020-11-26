// Global Imports
import { Argv } from 'yargs';
import { pipe } from 'ramda';

// Commands
import lasanha from './lasanha';
import git from './git';
import json from './json';

export default {
	all: (yargs: Argv): Argv => pipe(lasanha, git, json)(yargs),
};
