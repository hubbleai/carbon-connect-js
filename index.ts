import {
  getCarbonHealthParams,
  getCarbonHealthResponse,
  AccessTokenParams,
  AccessTokenResponse,
  WhiteLabelDataParams,
  WhiteLabelDataResponse,
  UserConnectionsParams,
  UserConnectionsResponse,
  GenerateOAuthURLParams,
  GenerateOAuthURLResponse,
  UploadFilesParams,
  UploadFilesResponse,
  UploadFileFromUrlParams,
  UploadFileFromUrlResponse,
  UpdateTagsParams,
  UpdateTagsResponse,
  ProcessSitemapUrlParams,
  ProcessSitemapUrlResponse,
  SubmitScrapeRequestParams,
  SubmitScrapeRequestResponse,
  UploadTextParams,
  UploadTextResponse,
  DeleteFileParams,
  DeleteFileResponse,
  GetRawFilePresignedUrlParams,
  GetRawFilePresignedUrlResponse,
  GetParsedFilePresignedUrlParams,
  GetParsedFilePresignedUrlResponse,
  GetUserFilesParams,
  GetUserFilesResponse,
  DeleteTagsParams,
  DeleteTagsResponse,
  ResyncFileParams,
  ResyncFileResponse,
  GetUrlsFromWebPageParams,
  GetUrlsFromWebPageResponse,
  SearchUrlsForQueryParams,
  SearchUrlsForQueryResponse,
  FetchYoutubeTranscriptsParams,
  FetchYoutubeTranscriptsResponse,
  GetEmbeddingsParams,
  GetEmbeddingsResponse,
  GetTextChunksParams,
  GetTextChunksResponse,
  GetUserDataSourcesParams,
  GetUserDataSourcesResponse,
  RevokeAccessToDataSourceParams,
  RevokeAccessToDataSourceResponse,
} from './types';

export const allowedFileTypes = [
  'pdf',
  'docx',
  'txt',
  'csv',
  'md',
  'pptx',
  'tsv',
  'xlsx',
  'rtf',
  'jpg',
  'jpeg',
  'png',
  'mp3',
  'mp4',
  'mp2',
  'aac',
  'wav',
  'flac',
  'pcm',
  'm4a',
  'ogg',
  'opus',
  'webm',
];

export const BASE_URL: Record<string, string> = {
  PRODUCTION: 'https://api.carbon.ai',
  DEVELOPMENT: 'https://api.dev.carbon.ai',
  LOCAL: 'http://localhost:8000',
};

function pickRelevantIntegrationParams(integrationName: string, params: any) {
  switch (integrationName) {
    case 'ZENDESK':
      if (!params.zendeskSubdomain) {
        throw new Error(
          'Zendesk integration requires a zendeskSubdomain parameter.'
        );
      }
      return { zendesk_subdomain: params.zendeskSubdomain };

    case 'CONFLUENCE':
      if (!params.confluenceSubdomain) {
        throw new Error(
          'Confluence integration requires a confluenceSubdomain parameter.'
        );
      }
      return { confluence_subdomain: params.confluenceSubdomain };

    case 'SHAREPOINT':
      if (!params.microsoftTenant || !params.sharepointSiteName) {
        throw new Error(
          'Microsoft integration requires both microsoftTenant and sharepointSiteName parameters.'
        );
      }
      return {
        microsoft_tenant: params.microsoftTenant,
        sharepoint_site_name: params.sharepointSiteName,
      };

    default:
      return {};
  }
}

const getCarbonHealth = async ({
  environment = 'PRODUCTION',
}: getCarbonHealthParams): Promise<getCarbonHealthResponse> => {
  try {
    const carbonHealthResponse = await fetch(
      `${BASE_URL[environment]}/health`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (carbonHealthResponse.status === 200) {
      return {
        status: 200,
      };
    } else {
      return {
        status: carbonHealthResponse.status,
      };
    }
  } catch {
    return {
      status: 500,
    };
  }
};

const generateAccessToken = async ({
  apiKey,
  customerId,
  environment = 'PRODUCTION',
}: AccessTokenParams): Promise<AccessTokenResponse> => {
  try {
    const accessTokenResponse = await fetch(
      `${BASE_URL[environment]}/auth/v1/access_token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${apiKey}`,
          'customer-id': customerId,
        },
      }
    );

    const responseData = await accessTokenResponse.json();

    if (accessTokenResponse.status === 200 && responseData) {
      return {
        status: 200,
        data: responseData,
        error: null,
      };
    } else {
      return {
        status: accessTokenResponse.status,
        data: null,
        error: responseData.error || 'Unexpected error occurred.',
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

const getWhiteLabelData = async ({
  accessToken,
  environment = 'PRODUCTION',
}: WhiteLabelDataParams): Promise<WhiteLabelDataResponse> => {
  try {
    const whiteLabelingResponse = await fetch(
      `${BASE_URL[environment]}/auth/v1/white_labeling`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${accessToken}`,
        },
      }
    );
    const whiteLabelingResponseData = await whiteLabelingResponse.json();

    if (whiteLabelingResponse.status === 200) {
      return {
        status: whiteLabelingResponse.status,
        data: whiteLabelingResponseData,
        error: null,
      };
    } else {
      return {
        status: whiteLabelingResponse.status,
        data: null,
        error: whiteLabelingResponseData.error || 'Unexpected error occurred.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching white labeling data. Please try again.',
    };
  }
};

const getUserConnections = async ({
  accessToken,
  environment = 'PRODUCTION',
}: UserConnectionsParams): Promise<UserConnectionsResponse> => {
  try {
    const userIntegrationsResponse = await fetch(
      `${BASE_URL[environment]}/integrations/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      }
    );

    if (userIntegrationsResponse.status === 200) {
      const responseBody = await userIntegrationsResponse.json();
      const userConnections: any = responseBody['active_integrations'];

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
  } catch (error: any) {
    return {
      connections: [],
      error: {
        message: error.message || 'Failed to fetch user connections.',
      },
      status: 400,
    };
  }
};

const generateOauthurl = async ({
  accessToken,
  integrationName,
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false,
  tags = {},
  optionalParams = {},
  embeddingModel = 'OPENAI',
  environment = 'PRODUCTION',
}: GenerateOAuthURLParams): Promise<GenerateOAuthURLResponse> => {
  try {
    const requestBody = {
      tags: tags,
      service: integrationName,
      chunk_size: chunkSize,
      chunk_overlap: chunkOverlap,
      skip_embedding_generation: skipEmbeddingGeneration,
      embedding_model: embeddingModel,
      ...pickRelevantIntegrationParams(integrationName, optionalParams),
    };

    const oAuthURLResponse = await fetch(
      `${BASE_URL[environment]}/integrations/oauth_url`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
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
  } catch (err: any) {
    return {
      status: 400,
      data: null,
      error: err?.message || 'Error generating OAuth URL. Please try again.',
    };
  }
};

const uploadFiles = async ({
  accessToken,
  files,
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false,
  setPageAsBoundary = false,
  embeddingModel = 'OPENAI',
  useOCR = false,
  generateSparseVectors = false,
  environment = 'PRODUCTION',
}: UploadFilesParams): Promise<UploadFilesResponse> => {
  try {
    if (files.length === 0) {
      return {
        data: {
          count: 0,
          successfulUploads: [],
        },
        error: {
          message: 'Please provide atleast a file to upload',
          count: 0,
          failedUploads: [],
        },
        status: 400,
      };
    }

    const successfulUploads = <any>[];
    const failedUploads = <any>[];

    await Promise.all(
      files.map(async (file, index) => {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const fileType = file.name.split('.').pop();

          const isFileSupport = allowedFileTypes.find(
            (configuredType: string) => configuredType === fileType
          );

          if (!isFileSupport) {
            failedUploads.push(file.name);
            return;
          }

          const apiUrl = new URL(`${BASE_URL[environment]}/uploadfile`);

          apiUrl.searchParams.append('chunk_size', chunkSize.toString());
          apiUrl.searchParams.append('chunk_overlap', chunkOverlap.toString());
          apiUrl.searchParams.append(
            'skip_embedding_generation',
            skipEmbeddingGeneration.toString()
          );
          apiUrl.searchParams.append(
            'set_page_as_boundary',
            setPageAsBoundary.toString()
          );
          apiUrl.searchParams.append('embedding_model', embeddingModel);
          apiUrl.searchParams.append('use_ocr', useOCR.toString());
          apiUrl.searchParams.append(
            'generate_sparse_vectors',
            generateSparseVectors.toString()
          );
          const uploadResponse = await fetch(
            // `${BASE_URL[environment]}/uploadfile?chunk_size=${chunkSize}&chunk_overlap=${chunkOverlap}&skip_embedding_generation=${skipEmbeddingGeneration}&set_page_as_boundary=${setPageAsBoundary}&embedding_model=${embeddingModel}&use_ocr=${useOCR}&generate_sparse_vectors=${generateSparseVectors}`,
            apiUrl.toString(),
            {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: `Token ${accessToken}`,
              },
            }
          );

          if (uploadResponse.status === 200) {
            const uploadResponseData: any = await uploadResponse.json();
            successfulUploads.push(uploadResponseData);
          } else {
            const errorData = await uploadResponse.json(); // Get the error response body

            failedUploads.push({
              fileName: file.name,
              message: errorData.message || 'Failed to upload file.',
            });
          }
        } catch (error: any) {
          failedUploads.push({
            fileName: file.name,
            message: error.message || 'Failed to upload file.',
          });
        }
      })
    );

    let errorObject = null;
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
        successfulUploads: successfulUploads,
      },
      error: errorObject,
      status: 200,
    };
  } catch (error: any) {
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

const uploadFileFromUrl = async ({
  accessToken,
  url,
  fileName = '',
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false,
  embeddingModel = 'OPENAI',
  environment = 'PRODUCTION',
}: UploadFileFromUrlParams): Promise<UploadFileFromUrlResponse> => {
  try {
    const uploadResponse = await fetch(
      `${BASE_URL[environment]}/upload_file_from_url`,
      {
        method: 'POST',
        body: JSON.stringify({
          url: url,
          file_name: fileName,
          chunk_size: chunkSize,
          chunk_overlap: chunkOverlap,
          skip_embedding_generation: skipEmbeddingGeneration,
          embedding_model: embeddingModel,
        }),
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (uploadResponse.status === 200) {
      const uploadResponseData = await uploadResponse.json();
      return {
        status: 200,
        data: {
          file: uploadResponseData,
        },
        error: null,
      };
    } else {
      return {
        status: uploadResponse.status,
        data: null,
        error: 'Failed to upload file.',
      };
    }
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: 'Failed to upload file.',
    };
  }
};

const uploadText = async ({
  accessToken,
  contents,
  fileName = '',
  chunkSize = 1500,
  chunkOverlap = 20,
  skipEmbeddingGeneration = false,
  overWriteFileId = null,
  embeddingModel = 'OPENAI',
  environment = 'PRODUCTION',
}: UploadTextParams): Promise<UploadTextResponse> => {
  try {
    const uploadResponse = await fetch(`${BASE_URL[environment]}/upload_text`, {
      method: 'POST',
      body: JSON.stringify({
        contents: contents,
        file_name: fileName,
        chunk_size: chunkSize,
        chunk_overlap: chunkOverlap,
        skip_embedding_generation: skipEmbeddingGeneration,
        overwrite_file_id: overWriteFileId,
        embedding_model: embeddingModel,
      }),
      headers: {
        Authorization: `Token ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (uploadResponse.status === 200) {
      const uploadResponseData = await uploadResponse.json();
      return {
        status: 200,
        data: {
          file: uploadResponseData,
        },
        error: null,
      };
    } else {
      return {
        status: uploadResponse.status,
        data: null,
        error: 'Failed to upload text.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to upload text.',
    };
  }
};

const deleteFile = async ({
  accessToken,
  fileId,
  environment = 'PRODUCTION',
}: DeleteFileParams): Promise<DeleteFileResponse> => {
  try {
    const deleteFileResponse = await fetch(
      `${BASE_URL[environment]}/deletefile/${fileId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (deleteFileResponse.status === 200) {
      const deleteFileResponseData = await deleteFileResponse.json();
      return {
        status: 200,
        data: deleteFileResponseData,
        error: null,
      };
    } else {
      return {
        status: deleteFileResponse.status,
        data: null,
        error: 'Failed to delete file.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to delete file.',
    };
  }
};

const resyncFile = async ({
  accessToken,
  fileId,
  chunkSize = 1500,
  chunkOverlap = 20,
  environment = 'PRODUCTION',
}: ResyncFileParams): Promise<ResyncFileResponse> => {
  try {
    const resyncFileResponse = await fetch(
      `${BASE_URL[environment]}/resync_file`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: fileId,
          chunk_size: chunkSize,
          chunk_overlap: chunkOverlap,
        }),
      }
    );

    if (resyncFileResponse.status === 200) {
      const resyncFileResponseData = await resyncFileResponse.json();
      return {
        status: 200,
        data: resyncFileResponseData,
        error: null,
      };
    } else {
      return {
        status: resyncFileResponse.status,
        data: null,
        error: 'Failed to resync file.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to resync file.',
    };
  }
};

const getRawFilePresignedUrl = async ({
  accessToken,
  fileId,
  environment = 'PRODUCTION',
}: GetRawFilePresignedUrlParams): Promise<GetRawFilePresignedUrlResponse> => {
  try {
    const getRawFilePresignedUrlResponse = await fetch(
      `${BASE_URL[environment]}/raw_file/${fileId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (getRawFilePresignedUrlResponse.status === 200) {
      const getRawFilePresignedUrlResponseData =
        await getRawFilePresignedUrlResponse.json();
      return {
        status: 200,
        data: getRawFilePresignedUrlResponseData,
        error: null,
      };
    } else {
      return {
        status: getRawFilePresignedUrlResponse.status,
        data: null,
        error: 'Failed to get raw file presigned url.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to get raw file presigned url.',
    };
  }
};

const getParsedFilePresignedUrl = async ({
  accessToken,
  fileId,
  environment = 'PRODUCTION',
}: GetParsedFilePresignedUrlParams): Promise<GetParsedFilePresignedUrlResponse> => {
  try {
    const getParsedFilePresignedUrlResponse = await fetch(
      `${BASE_URL[environment]}/parsed_file/${fileId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (getParsedFilePresignedUrlResponse.status === 200) {
      const getParsedFilePresignedUrlResponseData =
        await getParsedFilePresignedUrlResponse.json();
      return {
        status: 200,
        data: getParsedFilePresignedUrlResponseData,
        error: null,
      };
    } else {
      return {
        status: getParsedFilePresignedUrlResponse.status,
        data: null,
        error: 'Failed to get parsed file presigned url.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to get parsed file presigned url.',
    };
  }
};

const getUserFiles = async ({
  accessToken,
  limit = 10,
  offset = 0,
  order_by = 'updated_at',
  order_dir = 'asc',
  filters = {},
  include_raw_file = false,
  include_parsed_file = false,
  environment = 'PRODUCTION',
}: GetUserFilesParams): Promise<GetUserFilesResponse> => {
  try {
    const requestBody = {
      pagination: { limit: limit, offset: offset },
      order_by,
      order_dir,
      filters,
      include_raw_file,
      include_parsed_file,
    };
    const getUserFilesResponse = await fetch(
      `${BASE_URL[environment]}/user_files_v2`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (getUserFilesResponse.status === 200) {
      const getUserFilesResponseData = await getUserFilesResponse.json();
      return {
        status: 200,
        data: getUserFilesResponseData,
        error: null,
      };
    } else {
      return {
        status: getUserFilesResponse.status,
        data: null,
        error: 'Failed to get user files.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to get user files.',
    };
  }
};

const updateTags = async ({
  accessToken,
  fileId,
  tags,
  environment = 'PRODUCTION',
}: UpdateTagsParams): Promise<UpdateTagsResponse> => {
  const appendTagsResponse = await fetch(
    `${BASE_URL[environment]}/create_user_file_tags`,
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

const deleteTags = async ({
  accessToken,
  organizationUserFileId,
  tags = [],
  environment = 'PRODUCTION',
}: DeleteTagsParams): Promise<DeleteTagsResponse> => {
  try {
    const deleteTagsResponse = await fetch(
      `${BASE_URL[environment]}/delete_user_file_tags`,
      {
        method: 'POST',
        body: JSON.stringify({
          tags: tags,
          organization_user_file_id: organizationUserFileId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${accessToken}`,
        },
      }
    );

    if (deleteTagsResponse.status === 200) {
      const deleteTagsResponseData = await deleteTagsResponse.json();
      return {
        status: 200,
        data: deleteTagsResponseData,
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Failed to delete tags from the file.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Failed to delete tags from the file.',
    };
  }
};

const processSitemapUrl = async ({
  accessToken,
  sitemapUrl,
  environment = 'PRODUCTION',
}: ProcessSitemapUrlParams): Promise<ProcessSitemapUrlResponse> => {
  try {
    if (!sitemapUrl) {
      return {
        status: 400,
        data: null,
        error: 'Please provide a valid sitemap URL.',
      };
    }

    const response = await fetch(
      `${BASE_URL[environment]}/process_sitemap?url=${sitemapUrl}`,
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

const fetchUrls = async ({
  accessToken,
  url,
  environment = 'PRODUCTION',
}: GetUrlsFromWebPageParams): Promise<GetUrlsFromWebPageResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL[environment]}/fetch_urls?url=${url}`,
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
          urls: responseData.urls || [],
          html_content: responseData.html_content || null,
        },
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Error fetching urls. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching urls. Please try again.',
    };
  }
};

const searchUrls = async ({
  accessToken,
  query,
  environment = 'PRODUCTION',
}: SearchUrlsForQueryParams): Promise<SearchUrlsForQueryResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL[environment]}/search_urls?query=${query}`,
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
          urls: responseData.urls || [],
          html_content: responseData.html_content || null,
        },
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Error searching urls. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error searching urls. Please try again.',
    };
  }
};

const fetchYoutubeTranscript = async ({
  accessToken,
  videoId,
  raw = false,
  environment = 'PRODUCTION',
}: FetchYoutubeTranscriptsParams): Promise<FetchYoutubeTranscriptsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL[environment]}/fetch_youtube_transcript?video_id=${videoId}&raw=${raw}`,
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
        data: responseData,
        error: null,
      };
    } else {
      return {
        status: 400,
        data: null,
        error: 'Error fetching transcript. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching transcript. Please try again.',
    };
  }
};

const submitScrapeRequest = async (
  params: SubmitScrapeRequestParams
): Promise<SubmitScrapeRequestResponse> => {
  try {
    const {
      accessToken,
      urls,
      tags = {},
      recursionDepth = 1,
      maxPagesToScrape = 1,
      chunkSize = 1500,
      chunkOverlap = 20,
      skipEmbeddingGeneration = false,
      environment = 'PRODUCTION',
      enableAutoSync = false,
    } = params;

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
      enable_auto_sync: enableAutoSync,
    }));

    const uploadResponse = await fetch(`${BASE_URL[environment]}/web_scrape`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObject),
    });

    if (uploadResponse.status === 200) {
      const responseData = await uploadResponse.json();
      return {
        status: 200,
        data: {
          files: responseData,
        },
        error: null,
      };
    } else {
      return {
        status: uploadResponse.status,
        data: null,
        error: 'Error initiating scraping. Please try again.',
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

const getEmbeddings = async ({
  accessToken,
  query,
  queryVector = null,
  k = 1,
  filesIds = null,
  parentFileIds = null,
  tags = null,
  includeTags = null,
  includeRawFile = null,
  includeVectors = null,
  hybridSearch = null,
  hybridSearchTuningParameters = null,
  environment = 'PRODUCTION',
}: GetEmbeddingsParams): Promise<GetEmbeddingsResponse> => {
  try {
    const requestObject = {
      query,
      query_vector: queryVector,
      k,
      files_ids: filesIds,
      parent_file_ids: parentFileIds,
      tags,
      include_tags: includeTags,
      include_raw_file: includeRawFile,
      include_vectors: includeVectors,
      hybrid_search: hybridSearch,
      hybrid_search_tuning_parameters: hybridSearchTuningParameters,
    };

    const embeddingsResponse = await fetch(
      `${BASE_URL[environment]}/embeddings`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      }
    );

    if (embeddingsResponse.status === 200) {
      const embeddingsResponseData = await embeddingsResponse.json();
      return {
        status: 200,
        data: embeddingsResponseData,
        error: null,
      };
    } else {
      return {
        status: embeddingsResponse.status,
        data: null,
        error: 'Error fetching embeddings. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching embeddings. Please try again.',
    };
  }
};

const getTextChunks = async ({
  accessToken,
  userFileId,
  limit = 10,
  offset = 0,
  orderBy = 'updated_at',
  orderDir = 'asc',
  includeVectors = false,
  environment = 'PRODUCTION',
}: GetTextChunksParams): Promise<GetTextChunksResponse> => {
  try {
    const requestBody = {
      pagination: { limit: limit, offset: offset },
      order_by: orderBy,
      order_dir: orderDir,
      include_vectors: includeVectors,
      filters: {
        user_file_id: userFileId,
      },
    };

    const techChunksResponse = await fetch(
      `${BASE_URL[environment]}/text_chunks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (techChunksResponse.status === 200) {
      const techChunksResponseData = await techChunksResponse.json();
      return {
        status: 200,
        data: techChunksResponseData,
        error: null,
      };
    } else {
      return {
        status: techChunksResponse.status,
        data: null,
        error: 'Error fetching text chunks. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching text chunks. Please try again.',
    };
  }
};

const getUserDataSources = async ({
  accessToken,
  limit = 10,
  offset = 0,
  orderBy = 'updated_at',
  orderDir = 'asc',
  sourceType = null,
  sourceIds = null,
  revokedAccess = null,
  environment = 'PRODUCTION',
}: GetUserDataSourcesParams): Promise<GetUserDataSourcesResponse> => {
  try {
    const requestBody = {
      pagination: { limit: limit, offset: offset },
      order_by: orderBy,
      order_dir: orderDir,
      filters: {
        source: sourceType,
        ids: sourceIds,
        revoked_access: revokedAccess,
      },
    };

    const userDataSourcesResponse = await fetch(
      `${BASE_URL[environment]}/user_data_sources`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (userDataSourcesResponse.status === 200) {
      const userDataSourcesResponseData = await userDataSourcesResponse.json();
      return {
        status: 200,
        data: userDataSourcesResponseData,
        error: null,
      };
    } else {
      return {
        status: userDataSourcesResponse.status,
        data: null,
        error: 'Error fetching user data sources. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error fetching user data sources. Please try again.',
    };
  }
};

const revokeAccessToDataSource = async ({
  accessToken,
  dataSourceId,
  environment = 'PRODUCTION',
}: RevokeAccessToDataSourceParams): Promise<RevokeAccessToDataSourceResponse> => {
  try {
    const requestBody = {
      data_source_id: dataSourceId,
    };

    const revokeAccessResponse = await fetch(
      `${BASE_URL[environment]}/revoke_access_token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (revokeAccessResponse.status === 200) {
      const revokeAccessResponseData = await revokeAccessResponse.json();
      return {
        status: 200,
        data: revokeAccessResponseData,
        error: null,
      };
    } else {
      return {
        status: revokeAccessResponse.status,
        data: null,
        error: 'Error revoking access to data source. Please try again.',
      };
    }
  } catch (err) {
    return {
      status: 400,
      data: null,
      error: 'Error revoking access to data source. Please try again.',
    };
  }
};

export {
  // Health
  getCarbonHealth,

  // Auth
  generateAccessToken,
  getWhiteLabelData,

  // Integrations
  getUserConnections,
  generateOauthurl,

  // Data Sources
  getUserDataSources,
  revokeAccessToDataSource,

  // Files
  uploadFiles,
  uploadFileFromUrl,
  uploadText,
  deleteFile,
  getRawFilePresignedUrl,
  getParsedFilePresignedUrl,
  getUserFiles,
  resyncFile,

  // Tags
  updateTags,
  deleteTags,

  // Embeddings
  getEmbeddings,
  getTextChunks,

  // Utilities
  processSitemapUrl,
  fetchUrls,
  searchUrls,
  fetchYoutubeTranscript,
  submitScrapeRequest,
};
