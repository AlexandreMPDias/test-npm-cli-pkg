#!/usr/bin/env node
// import './commands';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers'
import CommandBuilder from './services/command';
import commands from './commands';

// clear();
// console.log(chalk.red(figlet.textSync('Alex-cli', { horizontalLayout: 'full' })));

// program.name('master-cli').version('0.0.1').description("Master CLI interface").option('-c, --c')
// .help(chalk.cyan)

// CommandBuilder.parse({
// 	argv: process.argv,
// 	program,
// });

// if (!process.argv.slice(2).length) {
// 	console.log(process.argv);
// 	program.outputHelp(s => chalk.cyan(s));
// }

// program
// 	.version('0.0.1')
// 	.description('master')
// 	.option('-b')
// 	.action(({ args }) => console.log(args))
// 	.parse()

// program.addCommand(program.name('sub1').option('-a'))
// program.addCommand(program.name('sub2').option('-b'))

const main = commands.all(yargs(hideBin(process.argv))).demandCommand(1);
const _ = main.argv

// const _ = yargs(hideBin(process.argv)).command('sub1', "SubCommand1", (_yargs: Argv) => {
// 	return _yargs.command("under", "Sub1.under", (__yargs: Argv) => {
// 		return __yargs.option('abacate', {
// 			alias: 'a',
// 			demandOption: true,
// 		});
// 	}, () => console.log('sub1.under')).command("above", "Sub1.under", (__yargs: Argv) => {
// 		return __yargs.option('batata', {
// 			alias: 'b',
// 			demandOption: true,
// 		});
// 	}, (arg) => console.log('sub1.above')).demandCommand(1)
// })
// 	.command('sub2', "SubCommand1", (_yargs: Argv) => {
// 		return _yargs.option('batata', {
// 			alias: 'b',
// 			demandOption: true,
// 		});
// 	}, () => console.log('sub2')).demandCommand(1)
// 	.demandCommand(1)
// 	.argv