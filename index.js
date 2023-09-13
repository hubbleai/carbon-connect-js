import { allowedFileTypes } from './constants';

const generateAccessToken = async (apiKey, customerId) => {
  try {
    const accessTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CARBON_API_BASE_URL}/auth/v1/access_token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${apiKey}`,
          'customer-id': customerId,
        },
      }
    );

    if (accessTokenResponse.status === 200 && accessTokenResponse.data) {
      return {
        status: 200,
        data: accessTokenResponse.data,
        error: null,
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error generating access token. Please try again.',
    };
  }
};

const getWhiteLabelData = async (accessToken) => {
  const whiteLabelingResponse = await fetch(
    `https://api.carbon.ai/auth/v1/white_labeling`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${accessToken}`,
      },
    }
  );
  const whiteLabelingResponseData = await whiteLabelingResponse.json();

  return {
    status: whiteLabelingResponse.status,
    data: whiteLabelingResponseData,
  };
};

const getUserConnections = async (accessToken) => {
  try {
    const userIntegrationsResponse = await fetch(
      `https://api.carbon.ai/integrations/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      }
    );

    if (userIntegrationsResponse.status === 200) {
      const responseBody = await userIntegrationsResponse.json();
      const userConnections = responseBody['active_integrations'];

      return {
        connections: userConnections,
        error: null,
        status: userIntegrationsResponse.status,
      };
    } else {
      return {
        connections: [],
        error: {
          message: 'Failed to fetch user connections.',
        },
        status: userIntegrationsResponse.status,
      };
    }
  } catch (error) {
    return {
      connections: [],
      error: {
        message: error.message || 'Failed to fetch user connections.',
      },
      status: 400,
    };
  }
};

const generateOauthurl = async (
  accessToken,
  integrationName,
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false,
  tags = {}
) => {
  try {
    const oAuthURLResponse = await fetch(
      `https://api.carbon.ai/integrations/oauth_url`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${accessToken}`,
        },
        body: JSON.stringify({
          tags: tags,
          service: integrationName,
          chunk_size: chunkSize,
          chunk_overlap: chunkOverlap,
          skip_embedding_generation: skipEmbeddingGeneration,
        }),
      }
    );

    if (oAuthURLResponse.status === 200) {
      const oAuthURLResponseData = await oAuthURLResponse.json();
      return {
        status: 200,
        data: {
          oauth_url: oAuthURLResponseData.oauth_url,
          tags: tags,
          integration: integrationName,
          chunkSize: chunkSize,
          chunkOverlap: chunkOverlap,
          skipEmbeddingGeneration: skipEmbeddingGeneration,
        },
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Error generating OAuth URL. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error generating OAuth URL. Please try again.',
    };
  }
};

const uploadFilesToCarbon = async (
  accessToken,
  files,
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false
) => {
  try {
    if (files.length === 0) {
      return {
        successfulUploads: [],
        error: {
          message: 'Please provide atleast a file to upload',
          count: 0,
          failedUploads: [],
        },
        status: 400,
      };
    }

    const successfulUploads = [];
    const failedUploads = [];

    await Promise.all(
      files.map(async (file, index) => {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const fileType = file.name.split('.').pop();

          const isFileSupport = allowedFileTypes.find(
            (configuredType) => configuredType === fileType
          );

          if (!isFileSupport) {
            failedUploads.push(file.name);
            return;
          }

          const uploadResponse = await fetch(
            `https://api.carbon.ai/uploadfile?chunk_size=${chunkSize}&chunk_overlap=${chunkOverlap}&skip_embedding_generation=${skipEmbeddingGeneration}`,
            {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: `Token ${accessToken}`,
              },
            }
          );

          if (uploadResponse.status === 200) {
            const uploadResponseData = await uploadResponse.json();
            successfulUploads.push(uploadResponseData);
          } else {
            const errorData = await uploadResponse.json(); // Get the error response body

            failedUploads.push({
              fileName: file.name,
              message: errorData.message || 'Failed to upload file.',
            });
          }
        } catch (error) {
          failedUploads.push({
            fileName: file.name,
            message: errorData.message || 'Failed to upload file.',
          });
        }
      })
    );

    const errorObject = null;
    if (failedUploads.length > 0) {
      errorObject = {
        message: 'Failed to upload some files.',
        count: failedUploads.length,
        failedUploads,
      };
    }
    return {
      data: {
        count: successfulUploads.length,
        successfulUploads,
      },
      error: errorObject,
      status: 200,
    };
  } catch (error) {
    return {
      data: {
        count: 0,
        successfulUploads: [],
      },
      error: {
        message: error.message || 'Failed to upload files.',
        count: files.length,
        failedUploads: files.map((file) => file.name),
      },
      status: 400,
    };
  }
};

const updateTags = async (accessToken, fileId, tags) => {
  const appendTagsResponse = await fetch(
    `https://api.carbon.ai/create_user_file_tags`,
    {
      method: 'POST',
      body: JSON.stringify({
        tags: tags,
        organization_user_file_id: fileId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  if (appendTagsResponse.status === 200) {
    const appendTagsResponseData = await appendTagsResponse.json();
    return {
      status: 200,
      data: appendTagsResponseData,
      error: null,
    };
  } else {
    return {
      status: 400,
      data: null,
      error: 'Failed to add tags to the file.',
    };
  }
};

const handleFetchSitemapUrls = async (accessToken, sitemapUrl) => {
  try {
    if (!sitemapUrl) {
      return {
        status: 400,
        data: null,
        error: 'Please provide a valid sitemap URL.',
      };
    }

    const response = await fetch(
      `https://api.carbon.ai/process_sitemap?url=${sitemapUrl}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const responseData = await response.json();
      return {
        status: 200,
        data: {
          urls: responseData.urls,
          count: responseData.urls.length,
        },
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Error fetching sitemap. Please try again.',
      };
    }
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching sitemap. Please try again.',
    };
  }
};

const submitScrapeRequest = async (
  accessToken,
  urls,
  recursionDepth = 1,
  maxPagesToScrape = 1,
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false
) => {
  try {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator

    let validUrls = urls.filter((url) => urlPattern.test(url));

    if (validUrls.length === 0) {
      return {
        status: 400,
        data: null,
        error: 'Please provide at least one valid URL.',
      };
    }

    const requestObject = validUrls.map((url) => ({
      url: url,
      tags: tags,
      recursion_depth: recursionDepth,
      max_pages_to_scrape: maxPagesToScrape,
      chunk_size: chunkSize,
      chunk_overlap: chunkOverlap,
      skip_embedding_generation: skipEmbeddingGeneration,
    }));

    const uploadResponse = await carbonFetch(
      `https://api.carbon.ai/web_scrape`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      }
    );

    if (uploadResponse.status === 200) {
      const responseData = await uploadResponse.json();
      return {
        status: 200,
        data: {
          files: responseData.files,
        },
        error: null,
      };
    }
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: 'Error initiating scraping. Please try again.',
    };
  }
};

export {
  generateAccessToken,
  getWhiteLabelData,
  getUserConnections,
  generateOauthurl,
  uploadFilesToCarbon,
  updateTags,
  handleFetchSitemapUrls,
  submitScrapeRequest,
};
