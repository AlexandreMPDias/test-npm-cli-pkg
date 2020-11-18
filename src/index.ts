#!/usr/bin/env node
// import './commands';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './commands';

clear();
console.log(chalk.red(figlet.textSync('Alex-cli', { horizontalLayout: 'full' })));

const main = commands.all(yargs(hideBin(process.argv))).demandCommand(1);
const _ = main.argv;
