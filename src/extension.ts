// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ChatGPT from './chatgpt';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-fixture" is now active!');

	const setApiKey = vscode.commands.registerCommand('auto-fixture.setApiKey', async () => {
		// ask the user for an API key and set it
		const apiKey = await vscode.window.showInputBox({
			title: 'Set your OpenAI API key',
			placeHolder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			// validateInput: (value) => {},
		});

		if (apiKey) {
			// set the API key in the config
			await vscode.workspace.getConfiguration('auto-fixture').update('apiKey', apiKey, true);
		}
	});

	const createFixture = vscode.commands.registerCommand('auto-fixture.createFixture', async () => {
		// Get the selected code from the editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor');
			return;
		}
		const apiKey = vscode.workspace.getConfiguration('auto-fixture').get('apiKey') as string;
		if (!apiKey) {
			vscode.window.showErrorMessage('No API key set. Please set one by running the "Set API Key" command');
			return;
		}

		const selectedCode = editor.document.getText(editor.selection);
		const gpt = ChatGPT.getInstance(apiKey);
		const fixture = await gpt.createFixture(selectedCode);

		if (!fixture) {
			vscode.window.showErrorMessage('Could not generate a fixture');
			return;
		}

		// insert the fixture after the selected code
		editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.end, fixture);
		});
	});

	context.subscriptions.push(createFixture, setApiKey);
}

// This method is called when your extension is deactivated
export function deactivate() {}
