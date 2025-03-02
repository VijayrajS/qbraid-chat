// File containing miscellaneous utility functions for the extension.

function extractJSONObjects(input: string): any[] {
    //* Function to extract JSON objects from a string, including those inside markdown code blocks

    const jsonObjects: any[] = [];
    
    // Regular expression to match JSON objects, even inside markdown code blocks
    const jsonRegex = /{.*}/g;
    
    let match;
    while ((match = jsonRegex.exec(input)) !== null) {
        const jsonString = match[1] || match[2]; // Match either markdown block or inline JSON

        try {
            const parsedJSON = JSON.parse(jsonString);
            jsonObjects.push(parsedJSON);
        } catch (error) {
            // Ignore invalid JSON
        }
    }

    return jsonObjects;
}

function toMarkdownList(items: string[]): string {
    //* Function to convert an array of strings to a markdown list

	return items.map(item => `- ${item}`).join("\n");
}

export { extractJSONObjects, toMarkdownList };