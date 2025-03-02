import config from './config/URLConfig';
import { readFileSync } from 'fs';
import * as os from 'os';
import path from 'path';

class ApiService {
	baseURL: string;
	apiKey: string;
	requestConfig: any;

	constructor() {
		this.baseURL = '';
		this.apiKey = '';
		this.requestConfig = config.requests;

		const filePath = path.join(os.homedir(), '.qbraid/qbraidrc');

		try{
			// Reading qbraidrc file for API key and base URL
			const fileContent = readFileSync(filePath, 'utf-8');
			const lines = fileContent.split('\n');
			for (const line of lines) {
				if(line.startsWith('api-key')){
					this.apiKey = line.split('=')[1].trim();
				}
				if(line.startsWith('url')){
					this.baseURL = line.split('=')[1].trim();
				}
			}
		} catch(error){
			console.error('Error reading file:', error);
		}
		
	}

	private getHeaders() {
		return {
			'Content-Type': 'application/json',
			'api-key': this.apiKey
		};
	}

	public async makeCall(method: string, data?: any): Promise<any> {
		let url = this.baseURL + this.requestConfig[method].url;
		const requestType =  this.requestConfig[method].requestType;

		let options = {
			method: requestType,
			headers: this.getHeaders(),
			...(data && requestType !== 'GET' && { body: JSON.stringify(data) })
		};

		if(requestType === 'GET' && data) {
			// Append parameters to the URL in the case of a get request
			url += '?';
			let isFirstArg = true;
			for(const key in data){
				if(!isFirstArg){
					url += '&';
				}
				url += `${key}=${data[key]}`;
				isFirstArg = false;
			}
		}

		return fetch(url, options)
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.catch(error => {
				console.error('Error with request:', error);
				throw error;
		});
	}
}

export default ApiService;