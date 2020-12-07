#!/usr/bin/env node
// import './commands';
import './services/config';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './commands';
import applyGlobalMiddlewares from './services/command/middlewares/global';
import ConfigService from './services/config';

if (ConfigService.get('terminal.beforeEach.consoleClear')) {
	clear();
}
// console.log(chalk.red(figlet.textSync('Alex-cli', { horizontalLayout: 'full' })));

const base = yargs(hideBin([...process.argv])).demandCommand(1);

const main = applyGlobalMiddlewares(commands.all(base));
const _ = main.argv;
