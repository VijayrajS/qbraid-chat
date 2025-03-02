import * as vscode from 'vscode';
import ApiService from './ApiService';
import ModelListGetter from './ModelListGetter';
import QbraidAgent from './QbraidAgent';

import { toMarkdownList } from './utils';

let qAgent = new QbraidAgent();
let apiService = new ApiService();
let modelListGetter = new ModelListGetter();

const HELP_MESSAGE = `The following commands are available:
- \`switchModel\`: Switch the model used for chat responses. Usage: "\`/switchModel\` <model>". If no model is provided, the current model, along with the list of available models.
- \`quantumDevices\`: This command helps you retrieve the list of available simualtors and QPUs. Usage: "\`/quantumDevices\` <Natural Language Query>".
- \`quantumJobs\`: This command helps you retrieve the list of quantum jobs.  Usage: "\`/quantumJobs\` <Natural Language Query>".
- \`help\`: Display this help message.`;

const handler: vscode.ChatRequestHandler = async (
	request: vscode.ChatRequest,
	context: vscode.ChatContext,
	stream: vscode.ChatResponseStream,
	token: vscode.CancellationToken
) => {
	try {

		let prompt = request.prompt;


		if(request.command === 'switchModel'){
			// Model switching logic
			let model = prompt.trim().toLowerCase();
			let modelList = await modelListGetter.getModels();
			if(!model){
				//* User did not provide a model - user looking for list of 

				stream.markdown(`The model currently configured is: ${modelListGetter.currentModel}. The available models are as follows:\n ${toMarkdownList(modelList)}`);
				return;
			}
			if(modelList.includes(model)){
				modelListGetter.currentModel = model;
				stream.markdown(`Model ${model} will be used for further chat responses.`);
				return;
			}
			else {
				stream.markdown(`Model ${model} not found. The model currently configured is: ${modelListGetter.currentModel}. Try switching to a model in the list below:\n ${toMarkdownList(modelList)}`);
				return;
			}
		}

		else if(request.command === 'help'){
			stream.markdown(HELP_MESSAGE);
		}

		else if(request.command){
			//* Commands to be handled with agentic behavior
			// We assume that any new command which is not `help` or `switchModel` is an agentic command,
			// and will be handled by the QbraidAgent.

			let emptyPrompt = {
				prompt: '',
				model: modelListGetter.currentModel,
				stream: false
			};

			let response = await qAgent.replyStrategy(prompt, request.command, emptyPrompt);
			stream.markdown(response);
			return;
		}

		//* Default chat behavior
		let data = {
			prompt: prompt,
			model: modelListGetter.currentModel,
			stream: false
		};

		const chatResponse = await apiService.makeCall('chat', data);
		stream.markdown(chatResponse.content);

	} catch (error) {
		vscode.window.showErrorMessage(`Error: ${(error as Error).message}`);
	}
};


const qbraidChat = vscode.chat.createChatParticipant('chat-tutorial.qbraid-chat', handler);

export function deactivate() {}
