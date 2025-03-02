// File containing prompts to generate API requests for the agent to construct API requests.
// The BasePrompts object contains a function that constructs a prompt for the user to generate an API request.

//! The AgenticPrompts file has been created so that additional variables with more prompts can be added for post-processing or smart transformation of API results by the agent.

const BasePrompts = {
	// quantum-jobs endpoint
	"quantumJobs": (api_JSON: any, userPrompt: string) => `
	You will generate an API request for retrieving quantum jobs submitted to the qBraid platform.

	### API Endpoint:
	- **URL:** /quantum-jobs
	- **Method:** GET

	### API Parameters:
	Each parameter has a description ("desc") and allowed values ("allowedValues"). Use this information to extract relevant filters from the user's natural language query.

	\`\`\` 
	${JSON.stringify(api_JSON, null, 2)}
	\`\`\`

	### Task:
	- Extract the relevant parameters based on the user's input.
	- Ensure all values match the allowed values listed above.
	- If a parameter is not explicitly mentioned by the user, use reasonable defaults (if applicable).
	- Return **only** the API call parameters as a valid JSON object—do not include explanations, headers, or extra text.

	### Expected Output Format:
	{
		"status": "pending",
		"provider": "IBM",
		"resultsPerPage": 10
	}

	### User Input:
	"${userPrompt}"
	Now, generate the JSON response. Don't use markdown to generate the JSON, generate a pure JSON only. Don't add any additional words either::`,

	// quantum-devices endpoint
	"quantumDevices": (api_JSON: any, userPrompt: string) => `
		You will generate an API request for retrieving quantum devices available on the qBraid platform.

		### API Endpoint:
		- **URL:** /quantum-devices
		- **Method:** GET

		### API Parameters:
		Each parameter has a description ("desc") and allowed values ("allowedValues"). Use this information to extract relevant filters from the user's natural language query.

		\`\`\`json
		${JSON.stringify(api_JSON, null, 2)}
		\`\`\`

		### Task:
		- Extract the relevant parameters based on the user's input.
		- Ensure all values match the allowed values listed above.
		- If a parameter is not explicitly mentioned by the user, use reasonable defaults (if applicable).
		- Return **only** the API call parameters as a valid JSON object—do not include explanations, headers, or extra text.

		
		### Expected Output Format:
		{
			"provider": "IBM",
			"type": "QPU",
			"status": "ONLINE"
		}
		
		### User Input:
		"${userPrompt}"

		Also note that these parameters are optional, so they always need not be present. 
		For example, if the user does not mention the "provider" parameter, you can omit it from the JSON response.
		Another example is that the "status" parameter can be omitted if the user just wants a list of devices, and not QPUs or simulators specifically.
		Now, generate the JSON response. Don't use markdown to generate the JSON, generate a pure JSON only. Don't add any additional words either:`
};

export default BasePrompts;