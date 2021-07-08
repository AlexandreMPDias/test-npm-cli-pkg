// Global Imports
import { Argv } from 'yargs';
import { pipe } from 'ramda';

// Commands
import config from './config';
import git from './git';
import json from './json';
import mono from './mono';
import dash from './dash';

export default {
	all: (yargs: Argv): Argv => pipe(config, git, json, mono, dash)(yargs),
};
