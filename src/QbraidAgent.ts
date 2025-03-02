import ApiService from "./ApiService";
import config from './config/URLConfig';
import BasePrompts from './config/AgenticPrompts';
import {extractJSONObjects} from './utils';
import AgentPostProcessor from "./AgentPostProcessor";

class QbraidAgent {
	//* Class enabling agentic behavior, constructing prompts based on user input and post-processing API responses.

	apiService: ApiService;

	constructor() {
		this.apiService = new ApiService();
	}

	async replyStrategy(userPrompt: string, promptType: string, payload: any) {
		//* Function that enables agentic behavior based on the type of prompt and user input.

		const promptFunc = BasePrompts[promptType as keyof typeof BasePrompts];
		const requestConfig = config.requests[promptType as keyof typeof config.requests];

		if (!promptFunc || !requestConfig) {
			throw new Error(`Invalid promptType: ${promptType}`);
		}

		let agenticPrompt = promptFunc(requestConfig, userPrompt);
		payload.prompt = agenticPrompt;
		// Hitting the chat endpoint with a prompt-engineered input
		let agenticAPIPayload = await this.apiService.makeCall('chat', payload);
		let finalResponseMarkdown;
		try {
			// Second API call to appropriate endpoints and post-processing of responses.
			console.log('Agentic API response:', agenticAPIPayload);
			let agenticAPIPayloadJSON = JSON.parse(agenticAPIPayload.content);

			let finalResponse = await this.apiService.makeCall(promptType, agenticAPIPayloadJSON);
			finalResponseMarkdown = AgentPostProcessor[promptType as keyof typeof AgentPostProcessor
			](finalResponse);
		} catch (error) {
			console.error('Agent error:', error);
		}

		return finalResponseMarkdown;
	}
}

export default QbraidAgent;