# Meni Client

React+Vite frontend application powered by AWS Amplify, designed for scalability and performance.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Getting Started

### Development

To start the development server:

```bash
# Default port (5173)
npm run dev

# Custom port 7003
npm run dev:7003
```

The application will be available at:

- Default: <http://localhost:5173>
- Port 7003: <http://localhost:7003>

### Auto-start Development Server

The project is configured to automatically start the development server when you open the workspace in VS Code:

1. Open the project folder in VS Code
2. When prompted "Allow Automatic Tasks in Folder?", click **Allow**
3. The dev server will start automatically on port 7003

To disable auto-start, go to VS Code settings and set `task.allowAutomaticTasks` to `off`.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.