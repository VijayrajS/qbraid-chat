
## qBraid-chat

A VSCode extension that interacts with the qBraid API endpoints.

### Level 0: Basic Chat Interface

**Requirements**:
1. Enables the chat extension to make authenticated requests to the qBraid API with a user's API Key. This is achieved using reading API keys directly from the `~/.qbraid/qbraidrc` configuration file.
2. Send chat messages via [`POST` `/chat`](https://docs.qbraid.com/api-reference/rest/post-chat) and stream responses back to the user.
3. Allows users to select which model to use based on the models listed by [`GET` `/chat/models`](https://docs.qbraid.com/api-reference/rest/get-chat-models) (Users can use the `switchModel` command to do this).

### Level 1: Agentic Behavior

**Requirements**:

Extends the chat functionality to handle real-time server requests to other qBraid API endpoints to answer platform-specific questions, such as:
   - "What quantum devices available through qBraid are currently online and available?"
   - "What is the status of the most recent quantum job I submitted to the qBraid QIR simulator?"

This has been currently coded for the GET endpoints of qBraid, and can be queried using the `quantumJobs` and `quantumDevices` commands, following with their natural language query.

## Packaging Requirements

Your project must include a script to package the extension using [`@vscode/vsce`](https://www.npmjs.com/package/@vscode/vsce). The script should generate a `.vsix` file named `qbraid-chat-0.1.0.vsix` in the root directory. Ensure the following commands work as expected:

```bash
npm install
npm run vsce:package
code --install-extension "qbraid-chat-0.1.0.vsix"
```
