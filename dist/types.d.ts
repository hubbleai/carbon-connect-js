export type Environment = 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL';
export type TextEmbeddingModel = 'OPENAI' | 'AZURE_OPENAI' | 'COHERE_MULTILINGUAL_V3';
export type EmbeddingModel = 'OPENAI' | 'AZURE_OPENAI' | 'COHERE_MULTILINGUAL_V3' | 'VERTEX_MULTIMODAL';
export interface getCarbonHealthParams {
    environment?: Environment;
}
export interface getCarbonHealthResponse {
    status: number;
}
export interface AccessTokenParams {
    apiKey: string;
    customerId: string;
    environment?: Environment;
}
export interface AccessTokenResponse {
    status: number;
    data: any;
    error: string | null;
}
export interface WhiteLabelDataParams {
    accessToken: string;
    environment?: Environment;
}
export interface WhiteLabelDataResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface UserConnectionsParams {
    accessToken: string;
    environment?: Environment;
}
export interface UserConnectionsResponse {
    connections: any;
    error: {
        message: string;
    } | null;
    status: number;
}
export interface GenerateOAuthURLParams {
    accessToken: string;
    integrationName: string;
    chunkSize?: number;
    chunkOverlap?: number;
    skipEmbeddingGeneration?: boolean;
    embeddingModel?: EmbeddingModel;
    tags?: Record<string, any>;
    optionalParams?: {
        zendeskSubdomain?: string;
        confluenceSubdomain?: string;
        microsoftTenant?: string;
        sharepointSiteName?: string;
    };
    environment?: Environment;
}
export interface GenerateOAuthURLResponse {
    status: number;
    data: {
        oauth_url?: string;
        tags: Record<string, any>;
        integration: string;
        chunkSize: number;
        chunkOverlap: number;
        skipEmbeddingGeneration: boolean;
    } | null;
    error: string | null;
}
export interface UploadFilesParams {
    accessToken: string;
    files: File[];
    chunkSize?: number;
    chunkOverlap?: number;
    skipEmbeddingGeneration?: boolean;
    setPageAsBoundary?: boolean;
    embeddingModel?: EmbeddingModel;
    useOCR?: boolean;
    generateSparseVectors?: boolean;
    environment?: Environment;
}
export interface UploadFilesResponse {
    data: {
        count: number;
        successfulUploads: any[];
    };
    error: {
        message: string;
        count: number;
        failedUploads: (string | {
            fileName: string;
            message: string;
        })[];
    } | null;
    status: number;
}
export interface UploadFileFromUrlParams {
    accessToken: string;
    url: string;
    fileName?: string;
    chunkSize?: number;
    chunkOverlap?: number;
    skipEmbeddingGeneration?: boolean;
    embeddingModel?: EmbeddingModel;
    environment?: Environment;
}
export interface UploadFileFromUrlResponse {
    status: number;
    data: {
        file: any;
    } | null;
    error: string | null;
}
export interface UploadTextParams {
    accessToken: string;
    contents: string;
    fileName?: string;
    chunkSize?: number;
    chunkOverlap?: number;
    skipEmbeddingGeneration?: boolean;
    overWriteFileId?: number | null;
    embeddingModel?: TextEmbeddingModel;
    environment?: Environment;
}
export interface UploadTextResponse {
    status: number;
    data: {
        file: any;
    } | null;
    error: string | null;
}
export interface DeleteFileParams {
    accessToken: string;
    fileId: string;
    environment?: Environment;
}
export interface DeleteFileResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface ResyncFileParams {
    accessToken: string;
    fileId: string;
    chunkSize?: number;
    chunkOverlap?: number;
    environment?: Environment;
}
export interface ResyncFileResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface GetRawFilePresignedUrlParams {
    accessToken: string;
    fileId: string;
    environment?: Environment;
}
export interface GetRawFilePresignedUrlResponse {
    status: number;
    data: {
        presigned_url: string;
    } | null;
    error: string | null;
}
export interface GetParsedFilePresignedUrlParams {
    accessToken: string;
    fileId: string;
    environment?: Environment;
}
export interface GetParsedFilePresignedUrlResponse {
    status: number;
    data: {
        presigned_url: string;
    } | null;
    error: string | null;
}
export interface GetUserFilesParams {
    accessToken: string;
    limit?: number;
    offset?: number;
    order_by?: string;
    order_dir?: string;
    filters?: Record<string, any>;
    include_raw_file?: boolean;
    include_parsed_file?: boolean;
    environment?: Environment;
}
export interface GetUserFilesResponse {
    status: number;
    data: {
        results: any[];
        count: number;
    } | null;
    error: string | null;
}
export interface UpdateTagsParams {
    accessToken: string;
    fileId: string;
    tags: Record<string, any>;
    environment?: Environment;
}
export interface UpdateTagsResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface DeleteTagsParams {
    accessToken: string;
    organizationUserFileId: number;
    tags: string[];
    environment?: Environment;
}
export interface DeleteTagsResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface GetUrlsFromWebPageParams {
    accessToken: string;
    url: string;
    environment?: Environment;
}
export interface GetUrlsFromWebPageResponse {
    status: number;
    data: {
        urls: string[];
        html_content: string | null;
    } | null;
    error: string | null;
}
export interface SearchUrlsForQueryParams {
    accessToken: string;
    query: string;
    environment?: Environment;
}
export interface SearchUrlsForQueryResponse {
    status: number;
    data: {
        urls: string[];
        html_content: string | null;
    } | null;
    error: string | null;
}
export interface FetchYoutubeTranscriptsParams {
    accessToken: string;
    videoId: string;
    raw?: boolean;
    environment?: Environment;
}
export interface FetchYoutubeTranscriptsResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface ProcessSitemapUrlParams {
    accessToken: string;
    sitemapUrl: string;
    environment?: Environment;
}
export interface ProcessSitemapUrlResponse {
    status: number;
    data: {
        urls: string[];
        count: number;
    } | null;
    error: string | null;
}
export interface SubmitScrapeRequestParams {
    accessToken: string;
    urls: string[];
    tags: Record<string, any>;
    recursionDepth?: number;
    maxPagesToScrape?: number;
    chunkSize?: number;
    chunkOverlap?: number;
    skipEmbeddingGeneration?: boolean;
    enableAutoSync?: boolean;
    environment?: Environment;
}
export interface SubmitScrapeRequestResponse {
    status: number;
    data: {
        files: string[];
    } | null;
    error: string | null;
}
export interface HybridSearchParams {
    weightA: number;
    weightB: number;
}
export interface GetEmbeddingsParams {
    accessToken: string;
    query: string;
    queryVector?: number[] | null;
    k: number;
    filesIds?: number[] | null;
    parentFileIds?: number[] | null;
    tags?: Record<string, any> | null;
    includeTags?: boolean | null;
    includeVectors?: boolean | null;
    includeRawFile?: boolean | null;
    hybridSearch?: boolean | null;
    hybridSearchTuningParameters?: HybridSearchParams | null;
    environment?: Environment;
}
export interface GetEmbeddingsResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface GetTextChunksParams {
    accessToken: string;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDir?: string;
    userFileId: number;
    includeVectors?: boolean;
    environment?: Environment;
}
export interface GetTextChunksResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface GetUserDataSourcesParams {
    accessToken: string;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDir?: string;
    sourceType?: string | null;
    sourceIds?: number[] | null;
    revokedAccess?: boolean | null;
    environment?: Environment;
}
export interface GetUserDataSourcesResponse {
    status: number;
    data: any | null;
    error: string | null;
}
export interface RevokeAccessToDataSourceParams {
    accessToken: string;
    dataSourceId: number;
    environment?: Environment;
}
export interface RevokeAccessToDataSourceResponse {
    status: number;
    data: any | null;
    error: string | null;
}
