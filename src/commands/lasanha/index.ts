import CommandBuilder from '../../services/command';

const command = CommandBuilder.create({
	command: 'lasanha',
	description: 'description of lasagna',
	builder: (yargs) => {
		const output = yargs
			.option('cheese', {
				description: 'add cheese to the lasagna',
				string: true,
			})
			.option('pineapple', {
				description: 'add pineapple to the lasagna',
				string: true,
			})
			.option('bbq', {
				description: 'add bbq to the lasagna',
				string: true,
			});
		return output;
	},
}).handle((flags) => {
	if (flags.cheese) console.log('  - cheese');
	if (flags.pineapple) console.log('  - pineapple');
	if (flags.bbq) console.log('  - bbq');
});

export default command;
