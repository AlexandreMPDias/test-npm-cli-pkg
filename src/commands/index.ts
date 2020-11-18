// Global Imports
import { Argv } from 'yargs';
import { pipe } from 'ramda'

// Commands
import lasanha from "./lasanha";
import git from "./git";

export default {
	all: (yargs: Argv): Argv => pipe(lasanha, git)(yargs)
}
