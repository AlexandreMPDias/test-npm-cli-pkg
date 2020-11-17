#!/usr/bin/env node
import './commands';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import program from 'commander';
import CommandBuilder from './services/command';

// clear();
console.log(chalk.red(figlet.textSync('Alex-cli', { horizontalLayout: 'full' })));

program.name('master-cli').version('0.0.1').description("Master CLI interface").option('-c, --c')
// .help(chalk.cyan)

CommandBuilder.parse({
	argv: process.argv,
	program,
});

// if (!process.argv.slice(2).length) {
// 	console.log(process.argv);
// 	program.outputHelp(s => chalk.cyan(s));
// }