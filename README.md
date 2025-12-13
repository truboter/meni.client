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

### Using Location-based Menus

The application supports dynamic menu loading from CDN based on location IDs. There are two ways to specify a location:

#### 1. URL Path (Development)

Navigate to `http://localhost:7003/{locationId}/{lang}`:

- URL: `http://localhost:7003/lnc2w74z/en`
- Fetches: `https://cdn.meni.ge/locations/loc-lnc2w74z/en.json` (English)

Or just specify the language:

- URL: `http://localhost:7003/ru`
- Uses default location with Russian language

#### 2. Subdomain (Production)

Use a subdomain like `https://{locationId}.meni.ge/{lang}`:

- URL: `https://lnc2w74z.meni.ge/en`
- Fetches: `https://cdn.meni.ge/locations/loc-lnc2w74z/en.json` (English)
- URL: `https://lnc2w74z.meni.ge/ru`
- Fetches: `https://cdn.meni.ge/locations/loc-lnc2w74z/ru.json` (Russian)
- URL: `https://lnc2w74z.meni.ge`
- Fetches: `https://cdn.meni.ge/locations/loc-lnc2w74z/ka.json` (Georgian - default)

The app will automatically:

- Fetch menu data from `https://cdn.meni.ge/locations/loc-{locationId}/{lang}.json`
- Load images from `https://cdn.meni.ge/locations/loc-{locationId}/{itemId}/medium.webp`
- Set initial language based on URL path (e.g., `/en`, `/ru`)
- Allow language changes through the UI language selector

**CDN Data Format:**

The JSON format should follow this structure:

```json
{
  "locationId": "loc-lnc2w74z",
  "locationName": "Restaurant Name",
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name",
      "items": [
        {
          "id": "item-id",
          "name": "Item Name",
          "description": "Item Description"
        }
      ]
    }
  ]
}
```

### Auto-start Development Environment

The project is configured to automatically start both the development server and Amplify Sandbox when you open the workspace in VS Code:

1. Open the project folder in VS Code
2. When prompted "Allow Automatic Tasks in Folder?", click **Allow**
3. Two tasks will start automatically:
   - **Frontend Dev Server** on port 7003 (Vite)
   - **Amplify Sandbox** - syncs with **existing production AWS resources** (Cognito, S3, etc.)

**Important:** The Amplify Sandbox connects to existing production resources and does NOT create new AWS resources. All changes are applied to the production Cognito User Pool (`eu-central-1_g0X3qmr0t`) and S3 bucket.

The tasks will appear in separate terminal tabs. You can view them by opening the Terminal panel (`Ctrl+\``).

To disable auto-start, go to `.vscode/settings.json` and set `task.allowAutomaticTasks` to `off`.

For more details, see [`docs/VSCODE_AUTOSTART.md`](docs/VSCODE_AUTOSTART.md).

## Features

- **Authentication**: Full integration with Amazon Cognito for secure user authentication
  - Email/Password registration and login
  - Social providers support (Google, Facebook, Amazon)
  - User profile management
  - Multi-language support (Georgian, English, Russian)
  - See [`docs/TESTING_AUTH.md`](docs/TESTING_AUTH.md) for testing guide
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync
- **Database**: Real-time database powered by Amazon DynamoDB
- **CDN Integration**: Dynamic menu loading from AWS S3/CloudFront
- **Multi-language**: Support for 27+ languages with easy switching

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
