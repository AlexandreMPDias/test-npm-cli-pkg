import * as inquirer from 'inquirer';
import chalk from 'chalk';

const questionPrompt = 'Gostaria de deixar algum comentário ou observação?';
const questionPlaceholder =
	'Começou a run mais tarde porque esqueceu do alarme? Ou vai ter que encerrar a run mais cedo para ir ao médico? Enfim, comenta qualquer coisa que achar válido (transparência em primeiro lugar, sempre!)';

const suffix = `\n${chalk.gray(questionPlaceholder)}\n`;

export const askComment = async (): Promise<string | null> => {
	const answer: any = await inquirer.prompt([
		{ name: 'comment', type: 'input', suffix, default: questionPlaceholder, message: questionPrompt },
	]);
	if (answer.comment === questionPlaceholder) {
		return null;
	}
	return answer.comment || null;
};
