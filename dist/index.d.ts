import { getCarbonHealthParams, getCarbonHealthResponse, AccessTokenParams, AccessTokenResponse, WhiteLabelDataParams, WhiteLabelDataResponse, UserConnectionsParams, UserConnectionsResponse, GenerateOAuthURLParams, GenerateOAuthURLResponse, UploadFilesParams, UploadFilesResponse, UploadFileFromUrlParams, UploadFileFromUrlResponse, UpdateTagsParams, UpdateTagsResponse, ProcessSitemapUrlParams, ProcessSitemapUrlResponse, SubmitScrapeRequestParams, SubmitScrapeRequestResponse, UploadTextParams, UploadTextResponse, DeleteFileParams, DeleteFileResponse, GetRawFilePresignedUrlParams, GetRawFilePresignedUrlResponse, GetParsedFilePresignedUrlParams, GetParsedFilePresignedUrlResponse, GetUserFilesParams, GetUserFilesResponse, DeleteTagsParams, DeleteTagsResponse, ResyncFileParams, ResyncFileResponse, GetUrlsFromWebPageParams, GetUrlsFromWebPageResponse, SearchUrlsForQueryParams, SearchUrlsForQueryResponse, FetchYoutubeTranscriptsParams, FetchYoutubeTranscriptsResponse, GetEmbeddingsParams, GetEmbeddingsResponse, GetTextChunksParams, GetTextChunksResponse, GetUserDataSourcesParams, GetUserDataSourcesResponse, RevokeAccessToDataSourceParams, RevokeAccessToDataSourceResponse } from './types';
export declare const allowedFileTypes: string[];
export declare const BASE_URL: Record<string, string>;
declare function pickRelevantIntegrationParams(integrationName: string, params: any): {
    zendesk_subdomain: any;
    confluence_subdomain?: undefined;
    microsoft_tenant?: undefined;
    sharepoint_site_name?: undefined;
} | {
    confluence_subdomain: any;
    zendesk_subdomain?: undefined;
    microsoft_tenant?: undefined;
    sharepoint_site_name?: undefined;
} | {
    microsoft_tenant: any;
    sharepoint_site_name: any;
    zendesk_subdomain?: undefined;
    confluence_subdomain?: undefined;
} | {
    zendesk_subdomain?: undefined;
    confluence_subdomain?: undefined;
    microsoft_tenant?: undefined;
    sharepoint_site_name?: undefined;
};
declare const getCarbonHealth: ({ environment, }: getCarbonHealthParams) => Promise<getCarbonHealthResponse>;
declare const generateAccessToken: ({ apiKey, customerId, environment, }: AccessTokenParams) => Promise<AccessTokenResponse>;
declare const getWhiteLabelData: ({ accessToken, environment, }: WhiteLabelDataParams) => Promise<WhiteLabelDataResponse>;
declare const getUserConnections: ({ accessToken, environment, }: UserConnectionsParams) => Promise<UserConnectionsResponse>;
declare const generateOauthurl: ({ accessToken, integrationName, chunkSize, chunkOverlap, skipEmbeddingGeneration, tags, optionalParams, embeddingModel, generateSparseVectors, prependFilenameToChunks, environment, }: GenerateOAuthURLParams) => Promise<GenerateOAuthURLResponse>;
declare const uploadFiles: ({ accessToken, files, chunkSize, chunkOverlap, skipEmbeddingGeneration, setPageAsBoundary, embeddingModel, useOCR, generateSparseVectors, prependFilenameToChunks, environment, }: UploadFilesParams) => Promise<UploadFilesResponse>;
declare const uploadFileFromUrl: ({ accessToken, url, fileName, chunkSize, chunkOverlap, skipEmbeddingGeneration, embeddingModel, generateSparseVectors, prependFilenameToChunks, environment, }: UploadFileFromUrlParams) => Promise<UploadFileFromUrlResponse>;
declare const uploadText: ({ accessToken, contents, fileName, chunkSize, chunkOverlap, skipEmbeddingGeneration, overWriteFileId, embeddingModel, generateSparseVectors, environment, }: UploadTextParams) => Promise<UploadTextResponse>;
declare const deleteFile: ({ accessToken, fileId, environment, }: DeleteFileParams) => Promise<DeleteFileResponse>;
declare const resyncFile: ({ accessToken, fileId, chunkSize, chunkOverlap, environment, }: ResyncFileParams) => Promise<ResyncFileResponse>;
declare const getRawFilePresignedUrl: ({ accessToken, fileId, environment, }: GetRawFilePresignedUrlParams) => Promise<GetRawFilePresignedUrlResponse>;
declare const getParsedFilePresignedUrl: ({ accessToken, fileId, environment, }: GetParsedFilePresignedUrlParams) => Promise<GetParsedFilePresignedUrlResponse>;
declare const getUserFiles: ({ accessToken, limit, offset, order_by, order_dir, filters, include_raw_file, include_parsed_file, environment, }: GetUserFilesParams) => Promise<GetUserFilesResponse>;
declare const updateTags: ({ accessToken, fileId, tags, environment, }: UpdateTagsParams) => Promise<UpdateTagsResponse>;
declare const deleteTags: ({ accessToken, organizationUserFileId, tags, environment, }: DeleteTagsParams) => Promise<DeleteTagsResponse>;
declare const processSitemapUrl: ({ accessToken, sitemapUrl, environment, }: ProcessSitemapUrlParams) => Promise<ProcessSitemapUrlResponse>;
declare const fetchUrls: ({ accessToken, url, environment, }: GetUrlsFromWebPageParams) => Promise<GetUrlsFromWebPageResponse>;
declare const searchUrls: ({ accessToken, query, environment, }: SearchUrlsForQueryParams) => Promise<SearchUrlsForQueryResponse>;
declare const fetchYoutubeTranscript: ({ accessToken, videoId, raw, environment, }: FetchYoutubeTranscriptsParams) => Promise<FetchYoutubeTranscriptsResponse>;
declare const submitScrapeRequest: (params: SubmitScrapeRequestParams) => Promise<SubmitScrapeRequestResponse>;
declare const getEmbeddings: ({ accessToken, query, queryVector, k, filesIds, parentFileIds, tags, includeTags, includeRawFile, includeVectors, hybridSearch, hybridSearchTuningParameters, environment, }: GetEmbeddingsParams) => Promise<GetEmbeddingsResponse>;
declare const getTextChunks: ({ accessToken, userFileId, limit, offset, orderBy, orderDir, includeVectors, environment, }: GetTextChunksParams) => Promise<GetTextChunksResponse>;
declare const getUserDataSources: ({ accessToken, limit, offset, orderBy, orderDir, sourceType, sourceIds, revokedAccess, environment, }: GetUserDataSourcesParams) => Promise<GetUserDataSourcesResponse>;
declare const revokeAccessToDataSource: ({ accessToken, dataSourceId, environment, }: RevokeAccessToDataSourceParams) => Promise<RevokeAccessToDataSourceResponse>;
export { pickRelevantIntegrationParams, getCarbonHealth, generateAccessToken, getWhiteLabelData, getUserConnections, generateOauthurl, getUserDataSources, revokeAccessToDataSource, uploadFiles, uploadFileFromUrl, uploadText, deleteFile, getRawFilePresignedUrl, getParsedFilePresignedUrl, getUserFiles, resyncFile, updateTags, deleteTags, getEmbeddings, getTextChunks, processSitemapUrl, fetchUrls, searchUrls, fetchYoutubeTranscript, submitScrapeRequest, };
