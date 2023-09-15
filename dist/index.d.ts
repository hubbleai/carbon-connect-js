import { AccessTokenParams, AccessTokenResponse, WhiteLabelDataParams, WhiteLabelDataResponse, UserConnectionsParams, UserConnectionsResponse, GenerateOAuthURLParams, GenerateOAuthURLResponse, UploadFilesParams, UploadFilesResponse, UpdateTagsParams, UpdateTagsResponse, ProcessSitemapUrlParams, ProcessSitemapUrlResponse, SubmitScrapeRequestParams, SubmitScrapeRequestResponse } from './types';
export declare const allowedFileTypes: string[];
export declare const BASE_URL: Record<string, string>;
declare const generateAccessToken: ({ apiKey, customerId, environment, }: AccessTokenParams) => Promise<AccessTokenResponse>;
declare const getWhiteLabelData: ({ accessToken, environment, }: WhiteLabelDataParams) => Promise<WhiteLabelDataResponse>;
declare const getUserConnections: ({ accessToken, environment, }: UserConnectionsParams) => Promise<UserConnectionsResponse>;
declare const generateOauthurl: ({ accessToken, integrationName, chunkSize, chunkOverlap, skipEmbeddingGeneration, tags, environment, }: GenerateOAuthURLParams) => Promise<GenerateOAuthURLResponse>;
declare const uploadFiles: ({ accessToken, files, chunkSize, chunkOverlap, skipEmbeddingGeneration, environment, }: UploadFilesParams) => Promise<UploadFilesResponse>;
declare const updateTags: ({ accessToken, fileId, tags, environment, }: UpdateTagsParams) => Promise<UpdateTagsResponse>;
declare const processSitemapUrl: ({ accessToken, sitemapUrl, environment, }: ProcessSitemapUrlParams) => Promise<ProcessSitemapUrlResponse>;
declare const submitScrapeRequest: (params: SubmitScrapeRequestParams) => Promise<SubmitScrapeRequestResponse>;
export { generateAccessToken, getWhiteLabelData, getUserConnections, generateOauthurl, uploadFiles, updateTags, processSitemapUrl, submitScrapeRequest, };
