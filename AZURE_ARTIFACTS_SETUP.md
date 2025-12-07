# Setup Guide for Azure Artifacts NPM Publishing

This guide will help you set up Azure Artifacts to publish your npm package.

## Prerequisites

1. Azure DevOps Organization
2. Azure DevOps Project
3. Azure Artifacts feed for npm packages

## Step-by-Step Setup

### 1. Create Azure Artifacts Feed

1. Go to your Azure DevOps project
2. Navigate to **Artifacts** → **Create Feed**
3. Name your feed (e.g., `npm-packages`)
4. Set visibility (Project/Organization/Public)
5. Select package types: **npm**

### 2. Configure Authentication

#### Option A: Using Personal Access Token (PAT)
1. Go to Azure DevOps → User Settings → Personal Access Tokens
2. Create new token with **Packaging (read, write)** scope
3. Run the following commands locally:

```bash
# Configure npm to use Azure Artifacts
npm config set registry https://pkgs.dev.azure.com/YOUR_ORGANIZATION/YOUR_PROJECT/_packaging/YOUR_FEED_NAME/npm/registry/

# Authenticate (you'll be prompted for PAT)
npm login --registry=https://pkgs.dev.azure.com/YOUR_ORGANIZATION/YOUR_PROJECT/_packaging/YOUR_FEED_NAME/npm/registry/
```

#### Option B: Using Azure CLI
```bash
# Login to Azure
az login

# Get npm access token
az artifacts universal publish --organization https://dev.azure.com/YOUR_ORGANIZATION --feed YOUR_FEED_NAME --name YOUR_PACKAGE_NAME --version 1.0.0 --path .
```

### 3. Update Configuration Files

Update the following placeholders in your files:

#### In `.npmrc`:
- `<YOUR_ORGANIZATION>` → Your Azure DevOps organization name
- `<YOUR_PROJECT>` → Your project name
- `<YOUR_FEED_NAME>` → Your artifacts feed name
- `<YOUR_SCOPE>` → Your npm scope (e.g., @atulkamble)

#### In `package.json`:
- Update the `publishConfig.registry` URL with your actual values

#### In `azure-pipelines.yml`:
- Update the `feedName` variable
- Configure service connections if publishing to npmjs.com

### 4. Set up Azure Pipeline

1. Go to Azure DevOps → Pipelines → Create Pipeline
2. Select your repository source
3. Choose "Existing Azure Pipelines YAML file"
4. Select `azure-pipelines.yml`
5. Review and run the pipeline

### 5. Pipeline Service Connections (Optional - for npmjs.com publishing)

To enable publishing to npmjs.com in addition to Azure Artifacts:

#### Create npmjs Service Connection:
1. Go to **Project Settings** → **Service Connections** in Azure DevOps
2. Click **New service connection**
3. Select **npm** from the list
4. Fill in the details:
   - **Connection name**: `npmjs-connection` (must match pipeline variable)
   - **Registry URL**: `https://registry.npmjs.org/`
   - **Username**: Your npmjs username
   - **Password**: Your npmjs password or access token
5. Check **Grant access permission to all pipelines**
6. Click **Save**

#### Enable npmjs Publishing:
1. In your Azure DevOps pipeline, go to **Variables**
2. Set `publishToNpmjs` to `true`
3. Ensure `npmjsServiceConnection` matches your service connection name

#### Alternative: Skip npmjs Publishing
The pipeline works perfectly without npmjs publishing. The step is conditional and will be skipped if:
- `publishToNpmjs` variable is `false` (default)
- The service connection doesn't exist
- It's a pull request build

## Manual Publishing (Local Development)

For local testing and publishing:

```bash
# Install dependencies
npm install

# Run tests (if any)
npm test

# Publish to Azure Artifacts
npm publish

# Or publish with specific registry
npm publish --registry=https://pkgs.dev.azure.com/YOUR_ORGANIZATION/YOUR_PROJECT/_packaging/YOUR_FEED_NAME/npm/registry/
```

## Consuming the Package

To install your published package:

```bash
# Configure npm to use your Azure Artifacts feed
npm config set registry https://pkgs.dev.azure.com/YOUR_ORGANIZATION/YOUR_PROJECT/_packaging/YOUR_FEED_NAME/npm/registry/
npm config set always-auth true

# Install the package
npm install @atulkamble/azure-artifacts-npm
```

## Troubleshooting

### Common Issues:

1. **Authentication Failed**: Ensure your PAT has the correct permissions
2. **Registry Not Found**: Verify the registry URL format
3. **Package Already Exists**: Increment the version in package.json
4. **Permission Denied**: Check your Azure Artifacts feed permissions

### Useful Commands:

```bash
# Check current npm configuration
npm config list

# Clear npm cache
npm cache clean --force

# Test authentication
npm whoami --registry=YOUR_REGISTRY_URL
```

## Security Best Practices

1. Never commit `.npmrc` with authentication tokens to git
2. Use environment variables for sensitive configuration
3. Regularly rotate Personal Access Tokens
4. Use least-privilege access for service accounts
5. Enable package vulnerability scanning in Azure Artifacts