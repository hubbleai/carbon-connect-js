# Carbon Connect

Carbon Connect JS is a vanilla JS wrapper and a headless offering to integrate carbon.ai API into your product.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install `carbon-connect-js`.

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

## Methods

### 1. generateAccessToken()

- **Description**: This method is used to generate an access token required for authentication. The access token will be valid for 10 hours.

- **Parameters**: The `generateAccessToken()` method accepts an object with the following properties:

  - apiKey (string): Your API key.
  - customerId (string): The customer's unique ID.

- **Returns**: A promise that resolves to an `AccessTokenResponse` object:

  - status (number): The HTTP status code of the response.
  - data (object or null): The response data containing the access token, if the request was successful. Otherwise, null.
  - error (string or null): Error message if there was an issue generating the token. Otherwise, null.

- **Usage**: Here's how you can use the `generateAccessToken()` method

  ```javascript
  const Carbon = require('carbon-connect-js');

  async function fetchAccessToken() {
    try {
      const response = await Carbon.generateAccessToken({
        apiKey: 'your_api_key',
        customerId: 'your_customer_id',
      });

      if (response.status === 200) {
        console.log('Access token:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }

  fetchAccessToken();
  ```

- **Note** : It is ideal to call this method from your backend code and return it to your frontend. This is to avoid exposing your API key to the frontend.

### 2. getWhiteLabelData()

- **Description**: This method retrieves the white label data of the organization, which can be useful for custom branding and theming.
- **Parameters**: The `getWhiteLabelData()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from the authentication process.

- **Returns**: A promise that resolves to an `WhiteLabelDataResponse` object:

  - status (number): The HTTP status code of the response.
  - data (object): The response data containing details of the white label settings.

- **Usage**: Here's how you can use the `getWhiteLabelData()`` method

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchWhiteLabelDetails() {
    try {
      const response = await Carbon.getWhiteLabelData({
        accessToken: 'ACCESS_TOKEN',
      });

      if (response.status === 200) {
        console.log('White Label Data:', response.data);
      } else {
        console.error(
          'Failed to fetch white label data. Status:',
          response.status
        );
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  // Call the function to fetch the data.
  fetchWhiteLabelDetails();
  ```

### 3. getUserConnections()

- **Description**: Retrieve all the active integrations or connections associated with a user.
- **Parameters**: The `getUserConnections()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from the authentication process.

- **Returns**: A promise that resolves to a `UserConnectionsResponse` object:

  - status (number): The HTTP status code of the response.
  - connections (array): List of active integrations or connections associated with the user.
  - error (object or null): Contains error details if any issues arise while fetching user connections.

- **Usage**:

```javascript
import * as Carbon from 'carbon-connect-js';

async function fetchUserIntegrations() {
  try {
    const response = await Carbon.getUserConnections({
      accessToken: 'ACCESS_TOKEN',
    });

    if (response.status === 200) {
      console.log('User Connections:', response.connections);
    } else {
      console.error('Error:', response.error.message);
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

// Initiate the call to fetch user integrations.
fetchUserIntegrations();
```

### 4. generateOauthurl()

- **Description**: Generate an OAuth URL to facilitate users in connecting a third-party account.

- **Parameters**: The `generateOauthurl()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from authentication.
  - integrationName (string): Name of the third-party service you want to integrate.
  - chunkSize (number, optional): Defines the chunk size. Defaults to 1500.
  - chunkOverlap (number, optional): Defines the chunk overlap. Defaults to 20.
  - skipEmbeddingGeneration (boolean, optional): If set to true, embedding generation will be skipped. Defaults to false.
  - tags (object, optional): Tags that can be passed for additional information. Defaults to an empty object.

- **Returns**: A promise that resolves to a `GenerateOAuthURLResponse` object:

  - status (number): HTTP status code of the response.
  - data (object): Contains details like the generated OAuth URL, integration name, chunk size, chunk overlap, and other specified parameters.
  - error (string or null): Contains error message if there's any issue generating the OAuth URL.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function generateIntegrationOAuthURL() {
    try {
      const response = await Carbon.generateOauthurl({
        accessToken: 'YOUR_ACCESS_TOKEN',
        integrationName: 'SERVICE_NAME',
        // Accepted values are: NOTION, GOOGLE_DRIVE, ONEDRIVE, INTERCOM, DROPBOX, ZENDESK, BOX
      });

      if (response.status === 200) {
        console.log('Generated OAuth URL:', response.data.oauth_url);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  generateIntegrationOAuthURL();
  ```

### 5. uploadFiles()

- **Description**: Upload one or multiple files to Carbon, with options to control chunk size, chunk overlap, and embedding generation.

- **Parameters**: The `uploadFiles()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from authentication.
  - files (Array<File>): An array of files you want to upload.
  - chunkSize (number, optional): Defines the chunk size. Defaults to 1500.
  - chunkOverlap (number, optional): Defines the chunk overlap. Defaults to 20.
  - skipEmbeddingGeneration (boolean, optional): If set to true, embedding generation will be skipped. Defaults to false.

- **Returns**: A promise that resolves to an UploadFilesResponse object:

  - status (number): HTTP status code of the response.
  - data (object): Contains details of the uploaded files, including count and array of successful uploads.
  - error (object or null): Contains error details if there's an issue during file upload.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function uploadFilesToPlatform() {
    try {
      const response = await Carbon.uploadFilesToCarbon({
        accessToken: 'YOUR_ACCESS_TOKEN',
        files: filesToUploadArray,
        // You can also specify other parameters here if needed.
      });

      if (response.status === 200) {
        console.log('Uploaded Files:', response.data.successfulUploads);
        if (response.error) {
          console.warn('Failed Uploads:', response.error.failedUploads);
        }
      } else {
        console.error('Error:', response.error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  uploadFilesToPlatform();
  ```

### 6. upateTags()

- **Description**: Updates or appends tags to a specified file in Carbon.

- **Parameters**:

  - accessToken (string): The access token obtained from authentication.
  - fileId (int): The ID of the file you want to update tags for.
  - tags (object): The tags you want to add or update for the specified file.

- **Returns**: A promise that resolves to an `UpdateTagsResponse` object:

  - status (number): HTTP status code of the response.
  - data (object): Contains details of the updated file, including the file ID and updated tags.
  - error (object or null): Contains error details if there's an issue updating the tags.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function updateFileTags() {
    const fileId = 'YOUR_FILE_ID'; // Replace with your actual file ID
    const tagsToUpdate = {
      category: 'document',
      type: 'pdf',
      // ... add more tags as needed
    };

    try {
      const response = await Carbon.updateTags({
        accessToken: 'YOUR_ACCESS_TOKEN',
        fileId: fileId,
        tags: tagsToUpdate,
      });

      if (response.status === 200) {
        console.log('Updated Tags:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  updateFileTags();
  ```

### 7. handleFetchSitemapUrls()

- **Description**: Fetches and processes the URLs present in a specified sitemap.

- **Parameters**: The `handleFetchSitemapUrls()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from authentication.
  - sitemapUrl (string): The URL of the sitemap to be fetched.

- **Returns**: A promise that resolves to a `ProcessSitemapUrlResponse` object:

  - status (number): HTTP status code of the response.
  - data (object): Contains details of the fetched URLs.
    - urls (array): An array of URLs retrieved from the sitemap.
    - count (number): Total number of URLs retrieved from the sitemap.
  - error (string or null): Error message if there's an issue fetching the sitemap.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchSitemapUrls() {
    const sitemap = 'YOUR_SITEMAP_URL'; // Replace with your actual sitemap URL

    try {
      const response = await Carbon.handleFetchSitemapUrls({
        accessToken: 'ACCESS_TOKEN',
        sitemapUrl: sitemap,
      });

      if (response.status === 200) {
        console.log('Retrieved URLs:', response.data.urls);
        console.log('Total URLs:', response.data.count);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  fetchSitemapUrls();
  ```

### 8. submitScrapeRequest()

- **Description**: Initiates a scraping request for specified URLs. This function supports batch scraping and can take multiple URLs in a single request.

- **Parameters**: The `submitScrapeRequest()` method accepts an object with the following properties:

  - accessToken (string): The access token obtained from authentication.
  - urls (array of strings): An array of URLs you want to scrape.
  - tags (object, optional): Tags associated with the scraping request. Defaults to an empty object.
  - recursionDepth (number, optional): Specifies the depth of scraping for linked pages. Defaults to 1.
  - maxPagesToScrape (number, optional): Maximum number of pages to scrape per URL. Defaults to 1.
  - chunkSize (number, optional): Size of data chunks. Defaults to 1500.
  - chunkOverlap (number, optional): Overlapping size between chunks. Defaults to 20.
  - skipEmbeddingGeneration (boolean, optional): Indicates whether to skip embedding generation during scraping. Defaults to false.

- **Returns**: A promise that resolves to a `SubmitScrapeRequestResponse` object:

  - status (number): HTTP status code of the response.
  - data (object): Contains details of the scraping response.
    - files (array): An array of objects, each representing a file resulting from the scraping process.
  - error (string or null): Error message if there's an issue initiating the scraping.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function initiateScraping() {
    const urlsToScrape = ['URL_1', 'URL_2']; // Replace with your actual URLs

    try {
      const response = await Carbon.submitScrapeRequest({
        accessToken: 'YOUR_ACCESS_TOKEN',
        urls: urlsToScrape,
        recursionDepth: 2,
        maxPagesToScrape: 5,
      });

      if (response.status === 200) {
        console.log('Scraping result:', response.data.files);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  }

  // For demonstration purposes, invoking the function.
  initiateScraping();
  ```
