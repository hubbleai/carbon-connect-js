"use strict";function e(e,t,r,n){return new(r||(r=Promise))((function(a,s){function o(e){try{u(n.next(e))}catch(e){s(e)}}function i(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}u((n=n.apply(e,t||[])).next())}))}function t(e,t){var r,n,a,s,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&i[0]?n.return:i[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var r=["pdf","docx","txt","csv","md","pptx"],n={PRODUCTION:"https://api.carbon.ai",DEVELOPMENT:"https://api.dev.carbon.ai",LOCAL:"http://localhost:8000"};exports.BASE_URL=n,exports.allowedFileTypes=r,exports.deleteFile=function(r){var a=r.accessToken,s=r.fileId,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[i],"/deletefile/").concat(s),{method:"DELETE",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to delete file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to delete file."}];case 6:return[2]}}))}))},exports.deleteTags=function(r){var a=r.accessToken,s=r.organizationUserFileId,o=r.tags,i=void 0===o?[]:o,u=r.environment,c=void 0===u?"PRODUCTION":u;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[c],"/delete_user_file_tags"),{method:"POST",body:JSON.stringify({tags:i,organization_user_file_id:s}),headers:{"Content-Type":"application/json",Authorization:"Token ".concat(a)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Failed to delete tags from the file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to delete tags from the file."}];case 6:return[2]}}))}))},exports.fetchUrls=function(r){var a=r.accessToken,s=r.url,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[i],"/fetch_urls?url=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(r=t.sent()).urls||[],html_content:r.html_content||null},error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching urls. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching urls. Please try again."}];case 6:return[2]}}))}))},exports.fetchYoutubeTranscript=function(r){var a=r.accessToken,s=r.videoId,o=r.raw,i=void 0!==o&&o,u=r.environment,c=void 0===u?"PRODUCTION":u;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[c],"/fetch_youtube_transcript?video_id=").concat(s,"&raw=").concat(i),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching transcript. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching transcript. Please try again."}];case 6:return[2]}}))}))},exports.generateAccessToken=function(r){var a=r.apiKey,s=r.customerId,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),[4,fetch("".concat(n[i],"/auth/v1/access_token"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Bearer ".concat(a),"customer-id":s}})];case 1:return[4,(e=t.sent()).json()];case 2:return r=t.sent(),200===e.status&&r?[2,{status:200,data:r,error:null}]:[2,{status:e.status,data:null,error:r.error||"Unexpected error occurred."}];case 3:return t.sent(),[2,{status:400,data:null,error:"Error generating access token. Please try again."}];case 4:return[2]}}))}))},exports.generateOauthurl=function(r){var a=r.accessToken,s=r.integrationName,o=r.chunkSize,i=void 0===o?1500:o,u=r.chunkOverlap,c=void 0===u?20:u,l=r.skipEmbeddingGeneration,d=void 0!==l&&l,h=r.tags,v=void 0===h?{}:h,p=r.environment,f=void 0===p?"PRODUCTION":p;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[f],"/integrations/oauth_url"),{method:"POST",headers:{"Content-Type":"application/json",authorization:"Token ".concat(a)},body:JSON.stringify({tags:v,service:s,chunk_size:i,chunk_overlap:c,skip_embedding_generation:d})})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{oauth_url:t.sent().oauth_url,tags:v,integration:s,chunkSize:i,chunkOverlap:c,skipEmbeddingGeneration:d},error:null}];case 3:return[2,{status:400,data:null,error:"Error generating OAuth URL. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error generating OAuth URL. Please try again."}];case 6:return[2]}}))}))},exports.getCarbonHealth=function(r){var a=r.environment,s=void 0===a?"PRODUCTION":a;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,fetch("".concat(n[s],"/health"),{method:"GET",headers:{"Content-Type":"application/json"}})];case 1:return 200===(e=t.sent()).status?[2,{status:200}]:[2,{status:e.status}];case 2:return t.sent(),[2,{status:500}];case 3:return[2]}}))}))},exports.getEmbeddings=function(r){var a=r.accessToken,s=r.query,o=r.queryVector,i=void 0===o?null:o,u=r.k,c=void 0===u?1:u,l=r.filesIds,d=void 0===l?null:l,h=r.parentFileIds,v=void 0===h?null:h,p=r.tags,f=void 0===p?null:p,g=r.includeTags,y=void 0===g?null:g,T=r.includeRawFile,m=void 0===T?null:T,_=r.includeVectors,k=void 0===_?null:_,b=r.hybridSearch,O=void 0===b?null:b,P=r.hybridSearchTuningParameters,w=void 0===P?null:P,C=r.environment,U=void 0===C?"PRODUCTION":C;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e={query:s,query_vector:i,k:c,files_ids:d,parent_file_ids:v,tags:f,include_tags:y,include_raw_file:m,include_vectors:k,hybrid_search:O,hybrid_search_tuning_parameters:w},[4,fetch("".concat(n[U],"/embeddings"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(r=t.sent()).status?[3,3]:[4,r.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:r.status,data:null,error:"Error fetching embeddings. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching embeddings. Please try again."}];case 6:return[2]}}))}))},exports.getParsedFilePresignedUrl=function(r){var a=r.accessToken,s=r.fileId,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[i],"/parsed_file/").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to get parsed file presigned url."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to get parsed file presigned url."}];case 6:return[2]}}))}))},exports.getRawFilePresignedUrl=function(r){var a=r.accessToken,s=r.fileId,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[i],"/raw_file/").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to get raw file presigned url."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to get raw file presigned url."}];case 6:return[2]}}))}))},exports.getTextChunks=function(r){var a=r.accessToken,s=r.userFileId,o=r.limit,i=void 0===o?10:o,u=r.offset,c=void 0===u?0:u,l=r.orderBy,d=void 0===l?"updated_at":l,h=r.orderDir,v=void 0===h?"asc":h,p=r.includeVectors,f=void 0!==p&&p,g=r.environment,y=void 0===g?"PRODUCTION":g;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e={pagination:{limit:i,offset:c},order_by:d,order_dir:v,include_vectors:f,filters:{user_file_id:s}},[4,fetch("".concat(n[y],"/text_chunks"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(r=t.sent()).status?[3,3]:[4,r.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:r.status,data:null,error:"Error fetching text chunks. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching text chunks. Please try again."}];case 6:return[2]}}))}))},exports.getUserConnections=function(r){var a=r.accessToken,s=r.environment,o=void 0===s?"PRODUCTION":s;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[o],"/integrations/"),{method:"GET",headers:{Authorization:"Token ".concat(a)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return r=t.sent(),[2,{connections:r.active_integrations,error:null,status:e.status}];case 3:return[2,{connections:[],error:{message:"Failed to fetch user connections."},status:e.status}];case 4:return[3,6];case 5:return[2,{connections:[],error:{message:t.sent().message||"Failed to fetch user connections."},status:400}];case 6:return[2]}}))}))},exports.getUserDataSources=function(r){var a=r.accessToken,s=r.limit,o=void 0===s?10:s,i=r.offset,u=void 0===i?0:i,c=r.orderBy,l=void 0===c?"updated_at":c,d=r.orderDir,h=void 0===d?"asc":d,v=r.sourceType,p=void 0===v?null:v,f=r.sourceIds,g=void 0===f?null:f,y=r.revokedAccess,T=void 0===y?null:y,m=r.environment,_=void 0===m?"PRODUCTION":m;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e={pagination:{limit:o,offset:u},order_by:l,order_dir:h,filters:{source:p,ids:g,revoked_access:T}},[4,fetch("".concat(n[_],"/user_data_sources"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(r=t.sent()).status?[3,3]:[4,r.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:r.status,data:null,error:"Error fetching user data sources. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching user data sources. Please try again."}];case 6:return[2]}}))}))},exports.getUserFiles=function(r){var a=r.accessToken,s=r.limit,o=void 0===s?10:s,i=r.offset,u=void 0===i?0:i,c=r.order_by,l=void 0===c?"updated_at":c,d=r.order_dir,h=void 0===d?"asc":d,v=r.filters,p=void 0===v?{}:v,f=r.include_raw_file,g=void 0!==f&&f,y=r.include_parsed_file,T=void 0!==y&&y,m=r.environment,_=void 0===m?"PRODUCTION":m;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e={pagination:{limit:o,offset:u},order_by:l,order_dir:h,filters:p,include_raw_file:g,include_parsed_file:T},[4,fetch("".concat(n[_],"/user_files_v2"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(r=t.sent()).status?[3,3]:[4,r.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:r.status,data:null,error:"Failed to get user files."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to get user files."}];case 6:return[2]}}))}))},exports.getWhiteLabelData=function(r){var a=r.accessToken,s=r.environment,o=void 0===s?"PRODUCTION":s;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),[4,fetch("".concat(n[o],"/auth/v1/white_labeling"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Token ".concat(a)}})];case 1:return[4,(e=t.sent()).json()];case 2:return r=t.sent(),200===e.status?[2,{status:e.status,data:r,error:null}]:[2,{status:e.status,data:null,error:r.error||"Unexpected error occurred."}];case 3:return t.sent(),[2,{status:400,data:null,error:"Error fetching white labeling data. Please try again."}];case 4:return[2]}}))}))},exports.processSitemapUrl=function(r){var a=r.accessToken,s=r.sitemapUrl,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),s?[4,fetch("".concat(n[i],"/process_sitemap?url=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})]:[2,{status:400,data:null,error:"Please provide a valid sitemap URL."}];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(r=t.sent()).urls,count:r.urls.length},error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 6:return[2]}}))}))},exports.resyncFile=function(r){var a=r.accessToken,s=r.fileId,o=r.chunkSize,i=void 0===o?1500:o,u=r.chunkOverlap,c=void 0===u?20:u,l=r.environment,d=void 0===l?"PRODUCTION":l;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[d],"/resync_file"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify({file_id:s,chunk_size:i,chunk_overlap:c})})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to resync file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to resync file."}];case 6:return[2]}}))}))},exports.revokeAccessToDataSource=function(r){var a=r.accessToken,s=r.dataSourceId,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e={data_source_id:s},[4,fetch("".concat(n[i],"/revoke_access_token"),{method:"POST",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(r=t.sent()).status?[3,3]:[4,r.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:r.status,data:null,error:"Error revoking access to data source. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error revoking access to data source. Please try again."}];case 6:return[2]}}))}))},exports.searchUrls=function(r){var a=r.accessToken,s=r.query,o=r.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[i],"/search_urls?query=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(r=t.sent()).urls||[],html_content:r.html_content||null},error:null}];case 3:return[2,{status:400,data:null,error:"Error searching urls. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error searching urls. Please try again."}];case 6:return[2]}}))}))},exports.submitScrapeRequest=function(r){return e(void 0,void 0,void 0,(function(){var e,a,s,o,i,u,c,l,d,h,v,p,f,g,y,T,m,_,k,b;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e=r.accessToken,a=r.urls,s=r.tags,o=void 0===s?{}:s,i=r.recursionDepth,u=void 0===i?1:i,c=r.maxPagesToScrape,l=void 0===c?1:c,d=r.chunkSize,h=void 0===d?1500:d,v=r.chunkOverlap,p=void 0===v?20:v,f=r.skipEmbeddingGeneration,g=void 0!==f&&f,y=r.environment,T=void 0===y?"PRODUCTION":y,m=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),0===(_=a.filter((function(e){return m.test(e)}))).length?[2,{status:400,data:null,error:"Please provide at least one valid URL."}]:(k=_.map((function(e){return{url:e,tags:o,recursion_depth:u,max_pages_to_scrape:l,chunk_size:h,chunk_overlap:p,skip_embedding_generation:g}})),[4,fetch("".concat(n[T],"/web_scrape"),{method:"POST",headers:{Authorization:"Token ".concat(e),"Content-Type":"application/json"},body:JSON.stringify(k)})]);case 1:return 200!==(b=t.sent()).status?[3,3]:[4,b.json()];case 2:return[2,{status:200,data:{files:t.sent()},error:null}];case 3:return[2,{status:b.status,data:null,error:"Error initiating scraping. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error initiating scraping. Please try again."}];case 6:return[2]}}))}))},exports.updateTags=function(r){var a=r.accessToken,s=r.fileId,o=r.tags,i=r.environment,u=void 0===i?"PRODUCTION":i;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(n[u],"/create_user_file_tags"),{method:"POST",body:JSON.stringify({tags:o,organization_user_file_id:s}),headers:{"Content-Type":"application/json",Authorization:"Token ".concat(a)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Failed to add tags to the file."}]}}))}))},exports.uploadFileFromUrl=function(r){var a=r.accessToken,s=r.url,o=r.fileName,i=void 0===o?"":o,u=r.chunkSize,c=void 0===u?1500:u,l=r.chunkOverlap,d=void 0===l?20:l,h=r.skipEmbeddingGeneration,v=void 0!==h&&h,p=r.environment,f=void 0===p?"PRODUCTION":p;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[f],"/upload_file_from_url"),{method:"POST",body:JSON.stringify({url:s,file_name:i,chunk_size:c,chunk_overlap:d,skip_embedding_generation:v}),headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{file:t.sent()},error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to upload file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to upload file."}];case 6:return[2]}}))}))},exports.uploadFiles=function(a){var s=a.accessToken,o=a.files,i=a.chunkSize,u=void 0===i?1500:i,c=a.chunkOverlap,l=void 0===c?20:c,d=a.skipEmbeddingGeneration,h=void 0!==d&&d,v=a.setPageAsBoundary,p=void 0!==v&&v,f=a.environment,g=void 0===f?"PRODUCTION":f;return e(void 0,void 0,void 0,(function(){var a,i,c;return t(this,(function(d){switch(d.label){case 0:return d.trys.push([0,2,,3]),0===o.length?[2,{data:{count:0,successfulUploads:[]},error:{message:"Please provide atleast a file to upload",count:0,failedUploads:[]},status:400}]:(a=[],i=[],[4,Promise.all(o.map((function(o,c){return e(void 0,void 0,void 0,(function(){var e,c,d,v,f,y;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,6,,7]),(e=new FormData).append("file",o),c=o.name.split(".").pop(),r.find((function(e){return e===c}))?[4,fetch("".concat(n[g],"/uploadfile?chunk_size=").concat(u,"&chunk_overlap=").concat(l,"&skip_embedding_generation=").concat(h,"&set_page_as_boundary=").concat(p),{method:"POST",body:e,headers:{Authorization:"Token ".concat(s)}})]:(i.push(o.name),[2]);case 1:return 200!==(d=t.sent()).status?[3,3]:[4,d.json()];case 2:return v=t.sent(),a.push(v),[3,5];case 3:return[4,d.json()];case 4:f=t.sent(),i.push({fileName:o.name,message:f.message||"Failed to upload file."}),t.label=5;case 5:return[3,7];case 6:return y=t.sent(),i.push({fileName:o.name,message:y.message||"Failed to upload file."}),[3,7];case 7:return[2]}}))}))})))]);case 1:return d.sent(),c=null,i.length>0&&(c={message:"Failed to upload some files.",count:i.length,failedUploads:i}),[2,{data:{count:a.length,successfulUploads:a},error:c,status:200}];case 2:return[2,{data:{count:0,successfulUploads:[]},error:{message:d.sent().message||"Failed to upload files.",count:o.length,failedUploads:o.map((function(e){return e.name}))},status:400}];case 3:return[2]}}))}))},exports.uploadText=function(r){var a=r.accessToken,s=r.contents,o=r.fileName,i=void 0===o?"":o,u=r.chunkSize,c=void 0===u?1500:u,l=r.chunkOverlap,d=void 0===l?20:l,h=r.skipEmbeddingGeneration,v=void 0!==h&&h,p=r.overWriteFileId,f=void 0===p?null:p,g=r.environment,y=void 0===g?"PRODUCTION":g;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(n[y],"/upload_text"),{method:"POST",body:JSON.stringify({contents:s,file_name:i,chunk_size:c,chunk_overlap:d,skip_embedding_generation:v,overwrite_file_id:f}),headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{file:t.sent()},error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to upload text."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to upload text."}];case 6:return[2]}}))}))};
