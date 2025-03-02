import ApiService from './ApiService';

class ModelListGetter {
	/* Class responsible for fetching a list of available models 
	   and keeping track of the current model being used for chat responses.
	*/

	refreshRate: number;

	api: ApiService;
	lastCallTimestamp: number;
	modelList: string[];
	currentModel: string;

	constructor() {
		this.refreshRate = 2 * 60 * 1000; // 2 minutes

		this.api = new ApiService();
		this.lastCallTimestamp = 0;
		this.modelList = [];
		this.currentModel = 'gpt-4o-mini';
	}

	public async getModels(): Promise<string[]> {
		if (Date.now() - this.lastCallTimestamp > this.refreshRate) {
			// Update the model list if the last call was made more than 2 minutes ago
			const response = await this.api.makeCall('getModels')
					.then((response: any) => response.map((
						item: { model: any; }) => item.model.trim().toLowerCase()
					));
			this.modelList = response;
			this.lastCallTimestamp = Date.now();
		}
		return this.modelList;
	}
}

export default ModelListGetter;