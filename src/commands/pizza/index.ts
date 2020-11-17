#!/usr/bin/env node

import chalk from 'chalk';
// import clear from 'clear';
// import figlet from 'figlet';
import CommandBuilder from '../../services/command';

// clear();
// console.log(chalk.red(figlet.textSync('pizza-cli', { horizontalLayout: 'full' })));

CommandBuilder.register(({ program }) => program
	.command('pizza')
	.description("description of pizza")
	.option('-p, --peppers', 'Add peppers')
	.option('-c, --no-cheese', 'You do not want any cheese')
	.action(({ args }) => {
		console.log(args);
		console.log('you ordered a pizza with:');
		if (program.peppers) console.log('  - peppers');
		if (program.pineapple) console.log('  - pineapple');
		if (program.bbq) console.log('  - bbq');
		const cheese: string = true === program.cheese ? 'marble' : program.cheese || 'no';
		console.log('  - %s cheese', cheese);

		// if (!process.argv.slice(3).length) {
		// 	program.outputHelp(chalk.red);
		// }
	})
)