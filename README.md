# Carbon Connect

Carbon Connect JS is a vanilla JS wrapper and a headless offering to integrate Carbon API into your product.

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

  - `apiKey` (string): Your API key.
  - `customerId` (string): The customer's unique ID.

- **Returns**: A promise that resolves to an `AccessTokenResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data containing the access token, if the request was successful. Otherwise, null.
  - `error` (string or null): Error message if there was an issue generating the token. Otherwise, null.

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

  - `accessToken` (string): The access token obtained from the authentication process.

- **Returns**: A promise that resolves to an `WhiteLabelDataResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): The response data containing details of the white label settings.

- **Usage**: Here's how you can use the `getWhiteLabelData()` method

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

  - `accessToken` (string): The access token obtained from the authentication process.

- **Returns**: A promise that resolves to a `UserConnectionsResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `connections` (array): List of active integrations or connections associated with the user.
  - `error` (object or null): Contains error details if any issues arise while fetching user connections.

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

  - `accessToken` (string): The access token obtained through authentication.
  - `integrationName` (string): Name of the third-party service you want to integrate.
  - `chunkSize` (number, optional): Defines the chunk size. Defaults to 1500.
  - `chunkOverlap` (number, optional): Defines the chunk overlap. Defaults to 20.
  - `skipEmbeddingGeneration` (boolean, optional): If set to true, embedding generation will be skipped. Defaults to false.
  - `tags` (object, optional): Tags that can be passed for additional information. Defaults to an empty object.

- **Returns**: A promise that resolves to a `GenerateOAuthURLResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): Contains details like the generated OAuth URL, integration name, chunk size, chunk overlap, and other specified parameters.
  - `error` (string or null): Contains error message if there's any issue generating the OAuth URL.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function generateIntegrationOAuthURL() {
    try {
      const response = await Carbon.generateOauthurl({
        accessToken: 'YOUR_ACCESS_TOKEN',
        integrationName: 'SERVICE_NAME',
        // Accepted values are: NOTION, GOOGLE_DRIVE, ONEDRIVE, INTERCOM, DROPBOX, ZENDESK, BOX, CONFLUENCE, SHAREPOINT
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

  - `accessToken` (string): The access token obtained through authentication.
  - `files` (Array<File>): An array of files you want to upload.
  - `chunkSize` (number, optional): Defines the chunk size. Defaults to 1500.
  - `chunkOverlap` (number, optional): Defines the chunk overlap. Defaults to 20.
  - `skipEmbeddingGeneration` (boolean, optional): If set to true, embedding generation will be skipped. Defaults to false.

- **Returns**: A promise that resolves to an UploadFilesResponse object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): Contains details of the uploaded files, including count and array of successful uploads.
  - `error` (object or null): Contains error details if there's an issue during file upload.

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

### 6. updateTags()

- **Description**: Updates or appends tags to a specified file in Carbon.

- **Parameters**:

  - `accessToken` (string): The access token obtained through authentication.
  - `fileId` (int): The ID of the file you want to update tags for.
  - `tags` (object): The tags you want to add or update for the specified file.

- **Returns**: A promise that resolves to an `UpdateTagsResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): Contains details of the updated file, including the file ID and updated tags.
  - `error` (object or null): Contains error details if there's an issue updating the tags.

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

### 7. processSitemapUrl()

- **Description**: Fetches and processes the URLs present in a specified sitemap.

- **Parameters**: The `processSitemapUrl()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `sitemapUrl` (string): The URL of the sitemap to be fetched.

- **Returns**: A promise that resolves to a `ProcessSitemapUrlResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): Contains details of the fetched URLs.
    - `urls` (array): An array of URLs retrieved from the sitemap.
    - `count` (number): Total number of URLs retrieved from the sitemap.
  - `error` (string or null): Error message if there's an issue fetching the sitemap.

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

  - `accessToken` (string): The access token obtained through authentication.
  - `urls` (array of strings): An array of URLs you want to scrape.
  - `tags` (object, optional): Tags associated with the scraping request. Defaults to an empty object.
  - `recursionDepth` (number, optional): Specifies the depth of scraping for linked pages. Defaults to 1.
  - `maxPagesToScrape` (number, optional): Maximum number of pages to scrape per URL. Defaults to 1.
  - `chunkSize` (number, optional): Size of data chunks. Defaults to 1500.
  - `chunkOverlap` (number, optional): Overlapping size between chunks. Defaults to 20.
  - `skipEmbeddingGeneration` (boolean, optional): Indicates whether to skip embedding generation during scraping. Defaults to false.

- **Returns**: A promise that resolves to a `SubmitScrapeRequestResponse` object:

  - `status` (number): The HTTP status code of the response.
  - `data` (object): Contains details of the scraping response.
    - `files` (array): An array of objects, each representing a file resulting from the scraping process.
  - `error` (string or null): Error message if there's an issue initiating the scraping.

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

  initiateScraping();
  ```

### 9. getCarbonHealth()

- **Description**: This function retrieves the health status of the Carbon service.

- **Parameters**: The `getCarbonHealth()` method does not require any parameters.

- **Returns**: A promise that resolves to a `getCarbonHealthResponse` object:

  - status (number): An HTTP status code indicating the health status. A status code of 200 indicates that the service is in a healthy state.

- **Usage**: Below is an example of how to utilize the `getCarbonHealth()` method

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchCarbonHealth() {
    try {
      const response = await Carbon.getCarbonHealth();

      if (response.status === 200) {
        console.log('Carbon service is healthy.');
      } else {
        console.error(
          'Carbon service is currently unavailable:',
          response.status
        );
      }
    } catch (err) {
      console.error(
        'Unexpected error while checking Carbon health:',
        err.message
      );
    }
  }

  fetchCarbonHealth();
  ```

### 10. uploadFileFromUrl()

- **Description**: This function allows you to upload a file to the Carbon service by fetching it from a specified URL.

- **Parameters**: The `uploadFileFromUrl()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `url` (string): The URL from which the file should be retrieved and uploaded.
  - `fileName` (string, optional): A custom name for the file. If not specified, the original filename from the URL will be used.
  - `chunkSize` (number, optional): The size of data chunks during the upload process. Default is set to 1500.
  - `chunkOverlap` (number, optional): The overlap size between chunks. Default is set to 20.
  - `skipEmbeddingGeneration` (boolean, optional): Indicates whether to skip embedding generation during the upload. Default is set to false.

- **Returns**: A promise that resolves to an `UploadFileFromUrlResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): Contains details of the uploaded file.
    - `file` (object): Represents the uploaded file and all its properties.
  - `error` (string or null): An error message, if there's an issue with the upload.

- **Usage**: Below is an example of how to use the `uploadFileFromUrl()` method

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function uploadFromUrl() {
    const fileUrl = 'URL_TO_THE_FILE'; // Replace with the actual URL

    try {
      const response = await Carbon.uploadFileFromUrl({
        accessToken: 'YOUR_ACCESS_TOKEN',
        url: fileUrl,
        fileName: 'custom_file_name.ext',
      });

      if (response.status === 200) {
        console.log('Uploaded file details:', response.data.file);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during upload:', err.message);
    }
  }

  uploadFromUrl();
  ```

### 11. uploadText()

- **Description**: This function enables the uploading of textual content to the Carbon service.

- **Parameters**: The `uploadText()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `contents` (string): The text content you wish to upload.
  - `fileName` (string, optional): A custom name for the file. If not specified, a random name will be used.
  - `chunkSize` (number, optional): The size of data chunks during the upload process. The default value is 1500.
  - `chunkOverlap` (number, optional): The overlapping size between chunks. The default value is 20.
  - `skipEmbeddingGeneration` (boolean, optional): An indicator of whether to skip embedding generation during the upload. The default is set to false.
  - `overWriteFileId` (number or null, optional): If provided, the uploaded content will overwrite an existing file with the specified ID.

- **Returns**: A promise that resolves to an `UploadTextResponse` object containing the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): Contains details of the uploaded file.
    - `file` (object): Represents the uploaded file along with its properties.
  - `error` (string or null): An error message in case of an issue during the upload.

- **Usage**: Below is an example of how to utilize the `uploadText()` method

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function uploadCustomText() {
    const textContent = 'This is a sample text content for upload.';

    try {
      const response = await Carbon.uploadText({
        accessToken: 'YOUR_ACCESS_TOKEN',
        contents: textContent,
        fileName: 'sample_text.txt',
      });

      if (response.status === 200) {
        console.log('Uploaded file details:', response.data.file);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during upload:', err.message);
    }
  }

  uploadCustomText();
  ```

### 12. deleteFile()

- **Description**: This function allows for the removal of a specified file from the Carbon service.

- **Parameters**: The `deleteFile()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `fileId` (string): The ID of the file you intend to delete.

- **Returns**: A promise that resolves to an `DeleteFileResponse` object containing the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): Contains details of the deleted file or any additional response data.
  - `error` (string or null): An error message in case there is an issue with the file deletion.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function removeFile() {
    const targetFileId = 'YOUR_FILE_ID_HERE';

    try {
      const response = await Carbon.deleteFile({
        accessToken: 'YOUR_ACCESS_TOKEN',
        fileId: targetFileId,
      });

      if (response.status === 200) {
        console.log('File successfully deleted:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during file deletion:', err.message);
    }
  }

  removeFile();
  ```

### 13. resyncFile()

- **Description**: This function triggers a resynchronization of a specified file with the Carbon service. This can be valuable in scenarios where a file's internal data changes or if there are discrepancies in the data on the server.

- **Parameters**: The `resyncFile()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `fileId` (string): The ID of the file you wish to resynchronize.
  - `chunkSize` (number, optional, default 1500): Specifies the chunk size when processing the file.
  - `chunkOverlap` (number, optional, default 20): Specifies the overlap size between each chunk.

- **Returns**: A promise that resolves to an `ResyncFileResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data, containing the access token if the request was successful; otherwise, it is null.
  - `error` (string or null): An error message if there was an issue generating the token, otherwise null.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function resynchronizeFile() {
    const targetFileId = 'YOUR_FILE_ID_HERE';

    try {
      const response = await Carbon.resyncFile({
        accessToken: 'YOUR_ACCESS_TOKEN',
        fileId: targetFileId,
        chunkSize: 1600, // Optional. Default is 1500.
        chunkOverlap: 25, // Optional. Default is 20.
      });

      if (response.status === 200) {
        console.log('File successfully resynced:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during file resync:', err.message);
    }
  }

  resynchronizeFile();
  ```

### 14. getRawFilePresignedUrl()

- **Description**: This function retrieves a presigned URL that can be utilized to directly access the unprocessed content of a file stored within the Carbon service.

- **Parameters**: The `getRawFilePresignedUrl()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `fileId` (string): The ID of the file for which you seek to obtain the presigned URL.

- **Returns**: A promise that resolves to an `GetRawFilePresignedUrlResponse` object comprising the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null):
    - `presigned_url` (string): The presigned URL that can be used to access the raw file content.
  - `error` (string or null): An error message if there is an issue with fetching the presigned URL.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchPresignedUrl() {
    const targetFileId = 'YOUR_FILE_ID_HERE';

    try {
      const response = await Carbon.getRawFilePresignedUrl({
        accessToken: 'YOUR_ACCESS_TOKEN',
        fileId: targetFileId,
      });

      if (response.status === 200) {
        console.log('Presigned URL:', response.data.presigned_url);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error fetching presigned URL:', err.message);
    }
  }

  fetchPresignedUrl();
  ```

### 15. getParsedFilePresignedUrl()

- **Description**: This function retrieves a presigned URL that can be employed to directly access the parsed content of a file stored within the Carbon service.

- **Parameters**: The `getParsedFilePresignedUrl()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `fileId` (string): The ID of the file for which you desire the presigned URL.

- **Returns**: A promise that resolves to an `GetParsedFilePresignedUrlResponse` object containing the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null):
    - `presigned_url` (string): The presigned URL that enables access to the parsed file content.
  - `error` (string or null): An error message in the event of any issues with obtaining the presigned URL.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchParsedPresignedUrl() {
    const targetFileId = 'YOUR_FILE_ID_HERE';

    try {
      const response = await Carbon.getParsedFilePresignedUrl({
        accessToken: 'YOUR_ACCESS_TOKEN',
        fileId: targetFileId,
      });

      if (response.status === 200) {
        console.log(
          'Presigned URL for parsed content:',
          response.data.presigned_url
        );
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error(
        'Unexpected error fetching presigned URL for parsed content:',
        err.message
      );
    }
  }

  fetchParsedPresignedUrl();
  ```

### 16. getUserFiles()

- **Description**: This function retrieves a list of user files from the Carbon service based on specified filters.

- **Parameters**: The `getUserFiles()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `limit` (number, optional, default = 10): The maximum number of files to be returned.
  - `offset` (number, optional, default = 0): The starting point from which to fetch files.
  - `order_by` (string, optional, default = 'updated_at'): The attribute by which the returned files are ordered.
  - `order_dir` (string, optional, default = 'asc'):The direction in which the files are ordered. Options are 'asc' or 'desc'.
  - `filters` (Record<string, any>, optional, default = {}): An object of filters to apply to the file list query.
  - `include_raw_file` (boolean, optional, default = false): If set to true, includes the presigned URL for the raw file in the response.
  - `include_parsed_file` (boolean, optional, default = false): If set to true, includes the presigned URL for the parsed file in the response.

- **Returns**: A promise that resolves to an `GetUserFilesResponse` object with the following properties:

  - status (number): The HTTP status code of the response.
  - data (object or null):
    - files (any[]): An array of user file data objects.
  - error (string or null): An error message if there are issues with fetching user files.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function fetchUserFiles() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      limit: 5,
      order_by: 'created_at',
      order_dir: 'desc',
    };

    try {
      const response = await Carbon.getUserFiles(params);

      if (response.status === 200) {
        console.log('Fetched user files:', response.data.files);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error fetching user files:', err.message);
    }
  }

  fetchUserFiles();
  ```

### 17. deleteTags()

- **Description**: This function removes specified tags from a user file within the given organization. The method sends a request to the Carbon service to delete the provided tags from the file associated with the `organizationUserFileId`.

- **Parameters**: The `deleteTags()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `organizationUserFileId` (number): The unique identifier of the user file within the organization.
  - `tags` (string[]): An array of tag names to be deleted from the user file.

- **Returns**: A promise that resolves to an `DeleteTagsResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data received from the Carbon service after the tags have been deleted.
  - `error` (string or null): An error message in case there are issues with the deletion of tags from the user file.

- **Usage**: Below is an example of how to use the `generateAccessToken()` method

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

### 18. fetchUrls()

- **Description**: This method retrieves all URLs from a specified web page. It initiates a GET request to the Carbon service with the target URL as a parameter. The Carbon service will then access the content of the specified web page and parse it to extract all the URLs.

- **Parameters**: The `fetchUrls()` method requires an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `url` (string): The URL of the web page from which the links should be fetched.

- **Returns**: A promise that resolves to an `AccessTokenResponse` object comprising the following properties:

  - status (number): The HTTP status code of the response.
  - data (object or null): The response data object containing the extracted URLs and potentially the raw HTML content.
    - urls (string[]): A list of URLs extracted from the web page.
    - html_content (string or null): The raw HTML content of the fetched web page (if provided by the Carbon service).
  - error (string or null): An error message in case there are issues with fetching the URLs.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveUrls() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      url: 'https://www.example.com', // replace with actual URL
    };

    try {
      const response = await Carbon.fetchUrls(params);

      if (response.status === 200) {
        console.log('Fetched URLs successfully:', response.data.urls);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error fetching URLs:', err.message);
    }
  }

  retrieveUrls();
  ```

### 19. searchUrls()

- **Description**: This method conducts a search for URLs based on the provided query string.

  As an illustration, when you perform a search for “content related to MRNA,” you will receive a list of links such as the following:

  - https://tomrenz.substack.com/p/mrna-and-why-it-matters
  - https://www.statnews.com/2020/11/10/the-story-of-mrna-how-a-once-dismissed-idea-became-a-leading-technology-in-the-covid-vaccine-race/
  - https://www.statnews.com/2022/11/16/covid-19-vaccines-were-a-success-but-mrna-still-has-a-delivery-problem/
  - https://joomi.substack.com/p/were-still-being-misled-about-how

  Subsequently, you can submit these links to the `web_scrape` endpoint in order to retrieve the content of the respective web pages.

- **Parameters**: The `searchUrls()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `query` (string): The search term or query for which URLs are to be discovered.

- **Returns**: A promise that resolves to an `SearchUrlsForQueryResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data object containing the discovered URLs.
    - `urls` (string[]): A list of URLs associated with the search query.
    - `html_content` (null): A null value is returned.
  - `error` (string or null): An error message if there are any issues with the URL search.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveSearchResults() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      query: 'example search term', // replace with actual query
    };

    try {
      const response = await Carbon.searchUrls(params);

      if (response.status === 200) {
        console.log('Search results:', response.data.urls);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during search:', err.message);
    }
  }

  retrieveSearchResults();
  ```

### 20. fetchYoutubeTranscript()

- **Description**: This method retrieves the transcript for a specific YouTube video.

  **Example:** In the URL https://www.youtube.com/watch?v=_Nq2m5LRQ3g&t=1080s, the video id is `_Nq2m5LRQ3`

- **Parameters**: The `fetchYoutubeTranscript()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `videoId` (string): The unique identifier of the YouTube video.
  - `raw` (boolean, optional): A flag indicating whether to fetch the raw transcript (default is false, indicating that only the processed transcript is fetched).

- **Returns**: A promise that resolves to an `FetchYoutubeTranscriptsResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data object containing the transcript information.
  - `error` (string or null): An error message if there are any issues with fetching the transcript.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveTranscript() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      videoId: 'YOUR_YOUTUBE_VIDEO_ID',
      raw: true,
    };

    try {
      const response = await Carbon.fetchYoutubeTranscript(params);

      if (response.status === 200) {
        console.log('Transcript data:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during transcript fetch:', err.message);
    }
  }

  retrieveTranscript();
  ```

### 21. getEmbeddingsfetchUrls()

- **Description**: This method is utilized to retrieve embeddings based on a provided query.

- **Parameters**: The `getEmbeddings()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `query` (string): The search query.
  - `queryVector` (number[] or null, optional): The query vector.
  - `k` (number): The number of nearest embeddings to retrieve.
  - `filesIds` (number[] or null, optional): An array of file IDs.
  - `parentFileIds` (number[] or null, optional): An array of parent file IDs.
  - `tags` (Record<string, any> or null, optional): Tags associated with the embeddings.
  - `includeTags` (boolean or null, optional): A flag to include tags.
  - `includeVectors` (boolean or null, optional): A flag to include vectors.
  - `includeRawFile` (boolean or null, optional): A flag to include raw file.
  - `hybridSearch` (boolean or null, optional): A flag to indicate hybrid search.
  - `hybridSearchTuningParameters` (HybridSearchParams or null, optional): Parameters for fine-tuning hybrid search. The following properties are available:
    - `weightA`
    - `weightB`

- **Returns**: A promise that resolves to an `GetEmbeddingsResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data containing the embeddings information.
  - `error` (string or null): An error message if there's an issue fetching the embeddings.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveEmbeddings() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      query: 'YOUR_SEARCH_QUERY',
      k: 5, // Example: retrieve 5 nearest embeddings.
      // Add other parameters as needed
    };

    try {
      const response = await Carbon.getEmbeddings(params);

      if (response.status === 200) {
        console.log('Embeddings data:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during embeddings fetch:', err.message);
    }
  }

  retrieveEmbeddings();
  ```

### 22. getTextChunks()

- **Description**: This method fetches text chunks based on the specified user file ID and other optional parameters.

- **Parameters**: The `getTextChunks()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `userFileId` (number): ID of the user file for which text chunks are being fetched.
  - `limit` (number, optional): Maximum number of text chunks to retrieve. Defaults to 10.
  - `offset` (number, optional): The number to start the fetch from. Useful for pagination. Defaults to 0.
  - `orderBy` (string, optional): The column name to order the results by. Defaults to 'updated_at'.
  - `orderDir` (string, optional): Direction of the order ('asc' or 'desc'). Defaults to 'asc'.
  - `includeVectors` (boolean, optional): Flag to indicate whether to include vectors in the response. Defaults to false.

- **Returns**: A promise that resolves to an `GetTextChunksResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data containing the text chunks information.
  - `error` (string or null): Error message if there's an issue fetching the text chunks.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveTextChunks() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      userFileId: 12345, // Replace with actual user file ID.
      limit: 5, // Example: retrieve 5 text chunks.
      // Add other parameters as needed
    };

    try {
      const response = await Carbon.getTextChunks(params);

      if (response.status === 200) {
        console.log('Text chunks data:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during text chunks fetch:', err.message);
    }
  }

  retrieveTextChunks();
  ```

### 23. getUserDataSources()

- **Description**: This method retrieves user data sources based on the provided parameters.

- **Parameters**: The `getUserDataSources()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `limit` (number, optional): The maximum number of data sources to retrieve. Defaults to 10.
  - `offset` (number, optional): The starting point for the fetch, useful for pagination. Defaults to 0.
  - `orderBy` (string, optional): The column name to order the results by. Defaults to 'updated_at'.
  - `orderDir` (string, optional): The direction of the order ('asc' or 'desc'). Defaults to 'asc'.
  - `sourceType` (string, optional): The type of data source to filter the results by.
  - `sourceIds` (number[] or null, optional): An array of specific data source IDs to retrieve.
  - `revokedAccess` (boolean or null, optional): A flag to filter data sources based on revoked access.

- **Returns**: A promise that resolves to an `AccessTokenResponse` object with the following properties:

  - status (number): The HTTP status code of the response.
  - data (object or null): The response data containing user data sources information.
  - error (string or null): An error message if there's an issue fetching the user data sources.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function retrieveUserDataSources() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      limit: 5, // Example: retrieve 5 data sources.
      // Add other parameters as needed
    };

    try {
      const response = await Carbon.getUserDataSources(params);

      if (response.status === 200) {
        console.log('User data sources data:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error(
        'Unexpected error during user data sources fetch:',
        err.message
      );
    }
  }

  retrieveUserDataSources();
  ```

### 24. revokeAccessToDataSource()

- **Description**: This method revokes user access to a specified data source. The user will need to re-authenticate after access is revoked.

- **Parameters**: The `revokeAccessToDataSource()` method accepts an object with the following properties:

  - `accessToken` (string): The access token obtained through authentication.
  - `dataSourceId` (number): The ID of the data source for which access should be revoked.

- **Returns**: A promise that resolves to an `RevokeAccessToDataSourceResponse` object with the following properties:

  - `status` (number): The HTTP status code of the response.
  - `data` (object or null): The response data indicating the outcome of the access revocation request.
  - `error` (string or null): An error message if there are any issues with revoking access to the data source.

- **Usage**:

  ```javascript
  import * as Carbon from 'carbon-connect-js';

  async function revokeDataSourceAccess() {
    const params = {
      accessToken: 'YOUR_ACCESS_TOKEN',
      dataSourceId: 12345, // Example: data source ID to revoke access to.
    };

    try {
      const response = await Carbon.revokeAccessToDataSource(params);

      if (response.status === 200) {
        console.log('Successfully revoked access:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    } catch (err) {
      console.error('Unexpected error during access revocation:', err.message);
    }
  }

  revokeDataSourceAccess();
  ```
