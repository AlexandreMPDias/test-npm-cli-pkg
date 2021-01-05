import * as path from 'path';
import FileService from '../../../../services/file';
import packageJSON from './assets/_package.json';
import vscode from './assets/_.vscode';

const stringify = (file: object) => JSON.stringify(file, null, '\t');

export function clone() {
	FileService.sync.mkdir('.vscode');
	FileService.sync.writeFile(`.vscode${path.sep}settings.json`, stringify(vscode.settings));
	FileService.sync.writeFile(`.vscode${path.sep}extensions.json`, stringify(vscode.extensions));
	FileService.sync.writeFile('package.json', stringify(packageJSON));
}
