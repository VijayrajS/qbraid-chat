// Strategy pattern to post-process raw API response and return a formatted string for streaming

const AgentPostProcessor = {
	"quantumDevices": (apiResponse: any) => {
		// Constructing a markdown table for available quantum devices.
		//TODO: (For future): allow for dynamic headers, letting the Agent decide what headers to display based on user queries. 

		let header = "| Provider | Device Name | Type | Number of Qubits | Status |\n";
		header += "| --- | --- | --- | --- | --- |\n";
		let tableRow = (device:any):string => `| ${device.provider} | ${device.name} | ${device.type} | ${device.numberQubits} | ${device.status} |\n`;

		return apiResponse.reduce((acc: string, device:any) => acc + tableRow(device), header);
	},
	"quantumJobs": (apiResponse: any) => {
		let summary = `Total number of jobs: ${apiResponse.total}\n`;
		let header = "| Job ID | Provider | Execution Time | Status | Cost |\n";
		header += "| --- | --- | --- | --- | --- |\n";
		let tableRow = (job:any):string => `| ${job.qbraidJobId} | ${job.provider} | ${job.timeStamps.executionDuration} | ${job.status} | ${job.cost}\n`;

		return apiResponse.jobsArray.reduce((acc: string, job:any) => acc + tableRow(job), summary + header);
	}
};

export default AgentPostProcessor;