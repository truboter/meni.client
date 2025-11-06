# AWS Amplify Deployment Documentation

## Application Information

- **App ID**: `d2mf63neo372qs`
- **App Name**: meni.client
- **Region**: eu-central-1
- **Default Domain**: d2mf63neo372qs.amplifyapp.com
- **Repository**: https://github.com/truboter/meni.client
- **Production Branch**: main

## Current Status

- **Last Deploy**: 2025-11-06T14:52:04 (Failed)
- **Status**: FAILED
- **Commit**: ebcfd554c5b54d70c6eeaf5d23d343648c76975f
- **Message**: "Add auto-start dev server on VS Code open"

## Build Configuration

- **Compute Type**: STANDARD_8GB
- **Platform**: WEB
- **Image**: amplify:al2023

### Build Spec

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*
      - node_modules/**/*
```

## Recent Deployment History

| Job ID | Status | Commit Message | Date |
|--------|--------|----------------|------|
| 4 | FAILED | Add auto-start dev server on VS Code open | 2025-11-06 14:50 |
| 3 | FAILED | Fix TypeScript build: add path aliases, fix lucide-react imports | 2025-11-06 14:45 |
| 2 | FAILED | Migrate visual-menu frontend: React 19, Vite 6.2, shadcn/ui | 2025-11-06 14:36 |
| 1 | FAILED | HEAD | 2025-11-06 13:26 |

## Current Issue

### Problem
Build fails during `npm ci` with peer dependency conflict:

```
npm error ERESOLVE could not resolve
npm error While resolving: lucide-react@0.344.0
npm error Found: react@19.2.0
npm error Could not resolve dependency:
npm error peer react@"^16.5.1 || ^17.0.0 || ^18.0.0" from lucide-react@0.344.0
```

### Root Cause
- **lucide-react@0.344.0** does not support React 19
- Project uses React 19.2.0
- AWS Amplify build uses `npm ci` which requires exact dependency resolution

### Solution Options

1. ✅ **Upgrade lucide-react** to a version that supports React 19 (^0.552.0)
2. ✅ **Add .npmrc** with legacy-peer-deps=true for additional compatibility

### Applied Fix

- Updated `lucide-react` from `^0.344.0` to `^0.552.0`
- Created `.npmrc` with `legacy-peer-deps=true`
- Verified build completes successfully locally

## AWS CLI Commands Reference

### Get App Info
```bash
aws amplify get-app --app-id d2mf63neo372qs
```

### List Branches
```bash
aws amplify list-branches --app-id d2mf63neo372qs
```

### List Recent Jobs
```bash
aws amplify list-jobs --app-id d2mf63neo372qs --branch-name main --max-results 5
```

### Get Job Details
```bash
aws amplify get-job --app-id d2mf63neo372qs --branch-name main --job-id 4
```

### Get Build Logs
```bash
# Get log URL from job details, then:
curl "$(aws amplify get-job --app-id d2mf63neo372qs --branch-name main --job-id 4 --query 'job.steps[0].logUrl' --output text)"
```

### Trigger New Deployment
```bash
aws amplify start-job --app-id d2mf63neo372qs --branch-name main --job-type RELEASE
```

## Configuration Files

### Custom Redirects
- `/<*>` → `/index.html` (404-200) - SPA fallback

### Cache Configuration
- Type: AMPLIFY_MANAGED_NO_COOKIES

## IAM Role
- **ARN**: arn:aws:iam::220427457121:role/service-role/AmplifySSRLoggingRole-5bf5168d-9ea5-44f6-b822-3287a4b3bda0

## Webhook
- **Created**: 2025-11-06T13:26:38
