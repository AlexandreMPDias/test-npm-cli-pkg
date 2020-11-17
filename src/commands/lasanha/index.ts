#!/usr/bin/env node

// import chalk from 'chalk';
// import clear from 'clear';
// import figlet from 'figlet';
import CommandBuilder from '../../services/command';

// clear();
// console.log(chalk.red(figlet.textSync('pizza-cli', { horizontalLayout: 'full' })));

CommandBuilder.register(({ program }) => program
	.command('lasanha')
	.description("Teste")
	.option('-p, --no-peppers', 'Remove peppers')
	.option('-c, --with-cheese', 'You do want any cheese')
	.action(() => {
		console.log('you ordered a lasanha with:');
		if (program.peppers) console.log('  + peppers');
		const cheese: string = true === program.cheese ? 'marble' : program.cheese || 'no';
		console.log('  - %s cheese', cheese);

		// if (!process.argv.slice(3).length) {
		// 	program.outputHelp();
		// }
	})

)