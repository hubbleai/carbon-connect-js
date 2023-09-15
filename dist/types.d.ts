export type Environment = 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL';
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
    data: any;
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
    tags?: Record<string, any>;
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
    environment?: Environment;
}
export interface SubmitScrapeRequestResponse {
    status: number;
    data: {
        files: string[];
    } | null;
    error: string | null;
}
