// Config file containing the API request details.
// This file must be used for additional URL related configurations.

const config = {
	// We can potentially bring the baseURL to this file instead of 
	// reading it from the qbraidrc, since the KV pair in this file
	// can be edited in future updates in case of a change. 
	"requests": {
		"chat": {
			"url": "/chat",
			"requestType": "POST"
		},
		"getModels": {
			"url": "/chat/models",
			"requestType": "GET"
		},
		"quantumDevices": {
			"url": "/quantum-devices",
			"requestType": "GET",
			"params": [
				{
					"paramName": "provider",
					"desc": "Filter devices by provider.",
					"allowedValues": ["AWS", "IBM", "QuEra", "qBraid", "Rigetti", "IonQ", "OQC"]
				},
				{
					"paramName": "type",
					"desc": "Filter devices by type.",
					"allowedValues": ["QPU", "Simulator"]
				},
				{
					"paramName": "status",
					"desc": "Filter devices by status.",
					"allowedValues": ["ONLINE", "OFFLINE"]
				},
				{
					"paramName": "isAvailable",
					"desc": "Filter devices with status ONLINE by availability.",
					"allowedValues": ["true", "false"]
				}
			]
		},
		"quantumJobs": {
			"url": "/quantum-jobs",
			"requestType": "GET",
			"params": [
				{
					"paramName": "status",
					"desc": "Filter jobs by their status group.",
					"default": "all",
					"allowedValues": ["all", "pending", "returned"]
				},
				{
					"paramName": "resultsPerPage",
					"desc": "The number of job results to return per page.",
					"default": 10,
					"allowedValues": []
				},
				{
					"paramName": "provider",
					"desc": "Filter jobs by the quantum computing provider.",
					"default": "all",
					"allowedValues": ["aws", "ionq", "oqc", "quera", "rigetti", "ibm", "qbraid", "all"]
				},
				{
					"paramName": "vendorJobId",
					"desc": "Filter jobs by the vendor's job ID.",
					"allowedValues": []
				},
				{
					"paramName": "tags",
					"desc": "Filter jobs by tags; each tag is a key-value pair.",
					"allowedValues": []
				}
			]
		}

	}
};

export default config;