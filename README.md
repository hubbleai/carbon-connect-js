# Carbon Connect

Carbon Connect JS is a vanilla JS wrapper and a headless offering to integration carbon.ai API into your product.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install carbon-connect.

```bash
npm install carbon-connect-js
```

## Usage

```javascript
import * as Carbon from 'carbon-connect-js';

// Note: Access token generation should happen prior to other function calls!

// Generate Access Token
const accessTokenResponse = await Carbon.generateAccessToken(
  'api_key',
  'customer_id'
);
console.log(accessTokenResponse.data.access_token);

// Get White Label data
const whiteLabelResponse = Carbon.getWhiteLabelData('ACCESS_TOKEN');
console.log(whiteLabelResponse.data);
```

## API Methods

### 1. generateAccessToken()

- **Description**: Generate an access token for authentication.
- **Usage**:
  ```javascript
  const response = await Carbon.generateAccessToken('api_key', 'customer_id');
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 2. getWhiteLabelData()

- **Description**: Get white label data of the organization.
- **Usage**:
  ```javascript
  const response = await Carbon.getWhiteLabelData('ACCESS_TOKEN');
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 3. getUserConnections()

- **Description**: Get all the user connections.
- **Usage**:
  ```javascript
  const response = await Carbon.getUserConnections('ACCESS_TOKEN');
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 4. generateOauthurl()

- **Description**: Generate an OAuth URL for the user to connect a third party account.
- **Usage**:
  ```javascript
  const response = await Carbon.generateOauthurl(
    accessToken,
    integrationName,
    chunkSize,
    chunkOverlap,
    skipEmbeddingGeneration,
    tags
  );
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 5. uploadFilesToCarbon()

- **Description**: Upload files to Carbon.
- **Usage**:

  ```javascript
  const response = await Carbon.uploadFilesToCarbon(
    accessToken,
    files,
    chunkSize,
    chunkOverlap,
    skipEmbeddingGeneration
  );
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 6. upateTags()

- **Description**: Update tags for a given file object.
- **Usage**:

  ```javascript
  const response = await Carbon.updateTags(accessToken, fileId, tags);
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 7. handleFetchSitemapUrls()

- **Description**: Fetch all the URLs from a given sitemap URL.
- **Usage**:

  ```javascript
  const response = await Carbon.handleFetchSitemapUrls(accessToken, sitemapUrl);
  if (response.status === 200) {
    console.log(response.data);
  }
  ```

### 8. submitScrapeRequest()

- **Description**: Submit a scrape request for a given URL.
- **Usage**:

  ```javascript
  const response = await Carbon.submitScrapeRequest(
    accessToken,
    urls,
    recursionDepth,
    maxPagesToScrape,
    chunkSize,
    chunkOverlap,
    skipEmbeddingGeneration
  );
  if (response.status === 200) {
    console.log(response.data);
  }
  ```
