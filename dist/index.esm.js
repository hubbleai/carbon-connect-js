var e=function(){return e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},e.apply(this,arguments)};function t(e,t,r,n){return new(r||(r=Promise))((function(a,s){function o(e){try{u(n.next(e))}catch(e){s(e)}}function i(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,i)}u((n=n.apply(e,t||[])).next())}))}function r(e,t){var r,n,a,s,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,i[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&i[0]?n.return:i[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var n=["pdf","docx","txt","csv","md","pptx","tsv","xlsx","rtf","jpg","jpeg","png","mp3","mp4","mp2","aac","wav","flac","pcm","m4a","ogg","opus","webm"],a={PRODUCTION:"https://api.carbon.ai",DEVELOPMENT:"https://api.dev.carbon.ai",LOCAL:"http://localhost:8000"};var s=function(e){var n=e.environment,s=void 0===n?"PRODUCTION":n;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,fetch("".concat(a[s],"/health"),{method:"GET",headers:{"Content-Type":"application/json"}})];case 1:return 200===(e=t.sent()).status?[2,{status:200}]:[2,{status:e.status}];case 2:return t.sent(),[2,{status:500}];case 3:return[2]}}))}))},o=function(e){var n=e.apiKey,s=e.customerId,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),[4,fetch("".concat(a[i],"/auth/v1/access_token"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Bearer ".concat(n),"customer-id":s}})];case 1:return[4,(e=r.sent()).json()];case 2:return t=r.sent(),200===e.status&&t?[2,{status:200,data:t,error:null}]:[2,{status:e.status,data:null,error:t.error||"Unexpected error occurred."}];case 3:return r.sent(),[2,{status:400,data:null,error:"Error generating access token. Please try again."}];case 4:return[2]}}))}))},i=function(e){var n=e.accessToken,s=e.environment,o=void 0===s?"PRODUCTION":s;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),[4,fetch("".concat(a[o],"/auth/v1/white_labeling"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Token ".concat(n)}})];case 1:return[4,(e=r.sent()).json()];case 2:return t=r.sent(),200===e.status?[2,{status:e.status,data:t,error:null}]:[2,{status:e.status,data:null,error:t.error||"Unexpected error occurred."}];case 3:return r.sent(),[2,{status:400,data:null,error:"Error fetching white labeling data. Please try again."}];case 4:return[2]}}))}))},u=function(e){var n=e.accessToken,s=e.environment,o=void 0===s?"PRODUCTION":s;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),[4,fetch("".concat(a[o],"/integrations/"),{method:"GET",headers:{Authorization:"Token ".concat(n)}})];case 1:return 200!==(e=r.sent()).status?[3,3]:[4,e.json()];case 2:return t=r.sent(),[2,{connections:t.active_integrations,error:null,status:e.status}];case 3:return[2,{connections:[],error:{message:"Failed to fetch user connections."},status:e.status}];case 4:return[3,6];case 5:return[2,{connections:[],error:{message:r.sent().message||"Failed to fetch user connections."},status:400}];case 6:return[2]}}))}))},c=function(n){var s=n.accessToken,o=n.integrationName,i=n.chunkSize,u=void 0===i?1500:i,c=n.chunkOverlap,d=void 0===c?20:c,l=n.skipEmbeddingGeneration,v=void 0!==l&&l,h=n.tags,p=void 0===h?{}:h,f=n.optionalParams,g=void 0===f?{}:f,m=n.embeddingModel,_=void 0===m?"OPENAI":m,y=n.generateSparseVectors,T=void 0!==y&&y;n.prependTitleToChunks;var k=n.environment,b=void 0===k?"PRODUCTION":k;return t(void 0,void 0,void 0,(function(){var t,n,i;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),t=e({tags:p,service:o,chunk_size:u,chunk_overlap:d,skip_embedding_generation:v,embedding_model:_,generate_sparse_vectors:T},function(e,t){switch(e){case"ZENDESK":if(!t.zendeskSubdomain)throw new Error("Zendesk integration requires a zendeskSubdomain parameter.");return{zendesk_subdomain:t.zendeskSubdomain};case"CONFLUENCE":if(!t.confluenceSubdomain)throw new Error("Confluence integration requires a confluenceSubdomain parameter.");return{confluence_subdomain:t.confluenceSubdomain};case"SHAREPOINT":if(!t.microsoftTenant||!t.sharepointSiteName)throw new Error("Microsoft integration requires both microsoftTenant and sharepointSiteName parameters.");return{microsoft_tenant:t.microsoftTenant,sharepoint_site_name:t.sharepointSiteName};default:return{}}}(o,g)),[4,fetch("".concat(a[b],"/integrations/oauth_url"),{method:"POST",headers:{"Content-Type":"application/json",authorization:"Token ".concat(s)},body:JSON.stringify(t)})];case 1:return 200!==(n=r.sent()).status?[3,3]:[4,n.json()];case 2:return[2,{status:200,data:{oauth_url:r.sent().oauth_url,tags:p,integration:o,chunkSize:u,chunkOverlap:d,skipEmbeddingGeneration:v},error:null}];case 3:return[2,{status:400,data:null,error:"Error generating OAuth URL. Please try again."}];case 4:return[3,6];case 5:return[2,{status:400,data:null,error:(null==(i=r.sent())?void 0:i.message)||"Error generating OAuth URL. Please try again."}];case 6:return[2]}}))}))},d=function(e){var s=e.accessToken,o=e.files,i=e.chunkSize,u=void 0===i?1500:i,c=e.chunkOverlap,d=void 0===c?20:c,l=e.skipEmbeddingGeneration,v=void 0!==l&&l,h=e.setPageAsBoundary,p=void 0!==h&&h,f=e.embeddingModel,g=void 0===f?"OPENAI":f,m=e.useOCR,_=void 0!==m&&m,y=e.generateSparseVectors,T=void 0!==y&&y;e.prependTitleToChunks;var k=e.environment,b=void 0===k?"PRODUCTION":k;return t(void 0,void 0,void 0,(function(){var e,i,c;return r(this,(function(l){switch(l.label){case 0:return l.trys.push([0,2,,3]),0===o.length?[2,{data:{count:0,successfulUploads:[]},error:{message:"Please provide atleast a file to upload",count:0,failedUploads:[]},status:400}]:(e=[],i=[],[4,Promise.all(o.map((function(o,c){return t(void 0,void 0,void 0,(function(){var t,c,l,h,f,m,y;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,6,,7]),(t=new FormData).append("file",o),c=o.name.split(".").pop(),n.find((function(e){return e===c}))?((l=new URL("".concat(a[b],"/uploadfile"))).searchParams.append("chunk_size",u.toString()),l.searchParams.append("chunk_overlap",d.toString()),l.searchParams.append("skip_embedding_generation",v.toString()),l.searchParams.append("set_page_as_boundary",p.toString()),l.searchParams.append("embedding_model",g),l.searchParams.append("use_ocr",_.toString()),l.searchParams.append("generate_sparse_vectors",T.toString()),[4,fetch(l.toString(),{method:"POST",body:t,headers:{Authorization:"Token ".concat(s)}})]):(i.push(o.name),[2]);case 1:return 200!==(h=r.sent()).status?[3,3]:[4,h.json()];case 2:return f=r.sent(),e.push(f),[3,5];case 3:return[4,h.json()];case 4:m=r.sent(),i.push({fileName:o.name,message:m.message||"Failed to upload file."}),r.label=5;case 5:return[3,7];case 6:return y=r.sent(),i.push({fileName:o.name,message:y.message||"Failed to upload file."}),[3,7];case 7:return[2]}}))}))})))]);case 1:return l.sent(),c=null,i.length>0&&(c={message:"Failed to upload some files.",count:i.length,failedUploads:i}),[2,{data:{count:e.length,successfulUploads:e},error:c,status:200}];case 2:return[2,{data:{count:0,successfulUploads:[]},error:{message:l.sent().message||"Failed to upload files.",count:o.length,failedUploads:o.map((function(e){return e.name}))},status:400}];case 3:return[2]}}))}))},l=function(e){var n=e.accessToken,s=e.url,o=e.fileName,i=void 0===o?"":o,u=e.chunkSize,c=void 0===u?1500:u,d=e.chunkOverlap,l=void 0===d?20:d,v=e.skipEmbeddingGeneration,h=void 0!==v&&v,p=e.embeddingModel,f=void 0===p?"OPENAI":p,g=e.generateSparseVectors,m=void 0!==g&&g;e.prependTitleToChunks;var _=e.environment,y=void 0===_?"PRODUCTION":_;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[y],"/upload_file_from_url"),{method:"POST",body:JSON.stringify({url:s,file_name:i,chunk_size:c,chunk_overlap:l,skip_embedding_generation:h,embedding_model:f,generate_sparse_vectors:m}),headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{file:t.sent()},error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to upload file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to upload file."}];case 6:return[2]}}))}))},v=function(e){var n=e.accessToken,s=e.contents,o=e.fileName,i=void 0===o?"":o,u=e.chunkSize,c=void 0===u?1500:u,d=e.chunkOverlap,l=void 0===d?20:d,v=e.skipEmbeddingGeneration,h=void 0!==v&&v,p=e.overWriteFileId,f=void 0===p?null:p,g=e.embeddingModel,m=void 0===g?"OPENAI":g,_=e.generateSparseVectors,y=void 0!==_&&_,T=e.environment,k=void 0===T?"PRODUCTION":T;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[k],"/upload_text"),{method:"POST",body:JSON.stringify({contents:s,file_name:i,chunk_size:c,chunk_overlap:l,skip_embedding_generation:h,overwrite_file_id:f,embedding_model:m,generate_sparse_vectors:y}),headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{file:t.sent()},error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to upload text."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to upload text."}];case 6:return[2]}}))}))},h=function(e){var n=e.accessToken,s=e.fileId,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[i],"/deletefile/").concat(s),{method:"DELETE",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to delete file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to delete file."}];case 6:return[2]}}))}))},p=function(e){var n=e.accessToken,s=e.fileId,o=e.chunkSize,i=void 0===o?1500:o,u=e.chunkOverlap,c=void 0===u?20:u,d=e.environment,l=void 0===d?"PRODUCTION":d;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[l],"/resync_file"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify({file_id:s,chunk_size:i,chunk_overlap:c})})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to resync file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to resync file."}];case 6:return[2]}}))}))},f=function(e){var n=e.accessToken,s=e.fileId,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[i],"/raw_file/").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to get raw file presigned url."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to get raw file presigned url."}];case 6:return[2]}}))}))},g=function(e){var n=e.accessToken,s=e.fileId,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[i],"/parsed_file/").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:e.status,data:null,error:"Failed to get parsed file presigned url."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to get parsed file presigned url."}];case 6:return[2]}}))}))},m=function(e){var n=e.accessToken,s=e.limit,o=void 0===s?10:s,i=e.offset,u=void 0===i?0:i,c=e.order_by,d=void 0===c?"updated_at":c,l=e.order_dir,v=void 0===l?"asc":l,h=e.filters,p=void 0===h?{}:h,f=e.include_raw_file,g=void 0!==f&&f,m=e.include_parsed_file,_=void 0!==m&&m,y=e.environment,T=void 0===y?"PRODUCTION":y;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),e={pagination:{limit:o,offset:u},order_by:d,order_dir:v,filters:p,include_raw_file:g,include_parsed_file:_},[4,fetch("".concat(a[T],"/user_files_v2"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(t=r.sent()).status?[3,3]:[4,t.json()];case 2:return[2,{status:200,data:r.sent(),error:null}];case 3:return[2,{status:t.status,data:null,error:"Failed to get user files."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Failed to get user files."}];case 6:return[2]}}))}))},_=function(e){var n=e.accessToken,s=e.fileId,o=e.tags,i=e.environment,u=void 0===i?"PRODUCTION":i;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(a[u],"/create_user_file_tags"),{method:"POST",body:JSON.stringify({tags:o,organization_user_file_id:s}),headers:{"Content-Type":"application/json",Authorization:"Token ".concat(n)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Failed to add tags to the file."}]}}))}))},y=function(e){var n=e.accessToken,s=e.organizationUserFileId,o=e.tags,i=void 0===o?[]:o,u=e.environment,c=void 0===u?"PRODUCTION":u;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[c],"/delete_user_file_tags"),{method:"POST",body:JSON.stringify({tags:i,organization_user_file_id:s}),headers:{"Content-Type":"application/json",Authorization:"Token ".concat(n)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Failed to delete tags from the file."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Failed to delete tags from the file."}];case 6:return[2]}}))}))},T=function(e){var n=e.accessToken,s=e.sitemapUrl,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),s?[4,fetch("".concat(a[i],"/process_sitemap?url=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})]:[2,{status:400,data:null,error:"Please provide a valid sitemap URL."}];case 1:return 200!==(e=r.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(t=r.sent()).urls,count:t.urls.length},error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 6:return[2]}}))}))},k=function(e){var n=e.accessToken,s=e.url,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),[4,fetch("".concat(a[i],"/fetch_urls?url=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=r.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(t=r.sent()).urls||[],html_content:t.html_content||null},error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching urls. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error fetching urls. Please try again."}];case 6:return[2]}}))}))},b=function(e){var n=e.accessToken,s=e.query,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),[4,fetch("".concat(a[i],"/search_urls?query=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=r.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(t=r.sent()).urls||[],html_content:t.html_content||null},error:null}];case 3:return[2,{status:400,data:null,error:"Error searching urls. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error searching urls. Please try again."}];case 6:return[2]}}))}))},O=function(e){var n=e.accessToken,s=e.videoId,o=e.raw,i=void 0!==o&&o,u=e.environment,c=void 0===u?"PRODUCTION":u;return t(void 0,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(a[c],"/fetch_youtube_transcript?video_id=").concat(s,"&raw=").concat(i),{method:"GET",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching transcript. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching transcript. Please try again."}];case 6:return[2]}}))}))},P=function(e){return t(void 0,void 0,void 0,(function(){var t,n,s,o,i,u,c,d,l,v,h,p,f,g,m,_,y,T,k,b,O,P,S,w,C,E,N,j,z,I;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),t=e.accessToken,n=e.urls,s=e.tags,o=void 0===s?{}:s,i=e.recursionDepth,u=void 0===i?1:i,c=e.maxPagesToScrape,d=void 0===c?1:c,l=e.chunkSize,v=void 0===l?1500:l,h=e.chunkOverlap,p=void 0===h?20:h,f=e.skipEmbeddingGeneration,g=void 0!==f&&f,m=e.environment,_=void 0===m?"PRODUCTION":m,y=e.enableAutoSync,T=void 0!==y&&y,k=e.generateSparseVectors,b=void 0!==k&&k,O=e.prependTitleToChunks,P=void 0!==O&&O,S=e.skipHTMLTags,w=void 0===S?[]:S,C=e.skipCSSClasses,E=void 0===C?[]:C,N=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),0===(j=n.filter((function(e){return N.test(e)}))).length?[2,{status:400,data:null,error:"Please provide at least one valid URL."}]:(z=j.map((function(e){return{url:e,tags:o,recursion_depth:u,max_pages_to_scrape:d,chunk_size:v,chunk_overlap:p,skip_embedding_generation:g,enable_auto_sync:T,generate_sparse_vectors:b,prepend_title_to_chunks:P,skip_html_tags:w,skip_css_classes:E}})),[4,fetch("".concat(a[_],"/web_scrape"),{method:"POST",headers:{Authorization:"Token ".concat(t),"Content-Type":"application/json"},body:JSON.stringify(z)})]);case 1:return 200!==(I=r.sent()).status?[3,3]:[4,I.json()];case 2:return[2,{status:200,data:{files:r.sent()},error:null}];case 3:return[2,{status:I.status,data:null,error:"Error initiating scraping. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error initiating scraping. Please try again."}];case 6:return[2]}}))}))},S=function(e){var n=e.accessToken,s=e.query,o=e.queryVector,i=void 0===o?null:o,u=e.k,c=void 0===u?1:u,d=e.filesIds,l=void 0===d?null:d,v=e.parentFileIds,h=void 0===v?null:v,p=e.tags,f=void 0===p?null:p,g=e.includeTags,m=void 0===g?null:g,_=e.includeRawFile,y=void 0===_?null:_,T=e.includeVectors,k=void 0===T?null:T,b=e.hybridSearch,O=void 0===b?null:b,P=e.hybridSearchTuningParameters,S=void 0===P?null:P,w=e.environment,C=void 0===w?"PRODUCTION":w;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),e={query:s,query_vector:i,k:c,files_ids:l,parent_file_ids:h,tags:f,include_tags:m,include_raw_file:y,include_vectors:k,hybrid_search:O,hybrid_search_tuning_parameters:S},[4,fetch("".concat(a[C],"/embeddings"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(t=r.sent()).status?[3,3]:[4,t.json()];case 2:return[2,{status:200,data:r.sent(),error:null}];case 3:return[2,{status:t.status,data:null,error:"Error fetching embeddings. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error fetching embeddings. Please try again."}];case 6:return[2]}}))}))},w=function(e){var n=e.accessToken,s=e.userFileId,o=e.limit,i=void 0===o?10:o,u=e.offset,c=void 0===u?0:u,d=e.orderBy,l=void 0===d?"updated_at":d,v=e.orderDir,h=void 0===v?"asc":v,p=e.includeVectors,f=void 0!==p&&p,g=e.environment,m=void 0===g?"PRODUCTION":g;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),e={pagination:{limit:i,offset:c},order_by:l,order_dir:h,include_vectors:f,filters:{user_file_id:s}},[4,fetch("".concat(a[m],"/text_chunks"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(t=r.sent()).status?[3,3]:[4,t.json()];case 2:return[2,{status:200,data:r.sent(),error:null}];case 3:return[2,{status:t.status,data:null,error:"Error fetching text chunks. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error fetching text chunks. Please try again."}];case 6:return[2]}}))}))},C=function(e){var n=e.accessToken,s=e.limit,o=void 0===s?10:s,i=e.offset,u=void 0===i?0:i,c=e.orderBy,d=void 0===c?"updated_at":c,l=e.orderDir,v=void 0===l?"asc":l,h=e.sourceType,p=void 0===h?null:h,f=e.sourceIds,g=void 0===f?null:f,m=e.revokedAccess,_=void 0===m?null:m,y=e.environment,T=void 0===y?"PRODUCTION":y;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),e={pagination:{limit:o,offset:u},order_by:d,order_dir:v,filters:{source:p,ids:g,revoked_access:_}},[4,fetch("".concat(a[T],"/user_data_sources"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(t=r.sent()).status?[3,3]:[4,t.json()];case 2:return[2,{status:200,data:r.sent(),error:null}];case 3:return[2,{status:t.status,data:null,error:"Error fetching user data sources. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error fetching user data sources. Please try again."}];case 6:return[2]}}))}))},E=function(e){var n=e.accessToken,s=e.dataSourceId,o=e.environment,i=void 0===o?"PRODUCTION":o;return t(void 0,void 0,void 0,(function(){var e,t;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),e={data_source_id:s},[4,fetch("".concat(a[i],"/revoke_access_token"),{method:"POST",headers:{Authorization:"Token ".concat(n),"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return 200!==(t=r.sent()).status?[3,3]:[4,t.json()];case 2:return[2,{status:200,data:r.sent(),error:null}];case 3:return[2,{status:t.status,data:null,error:"Error revoking access to data source. Please try again."}];case 4:return[3,6];case 5:return r.sent(),[2,{status:400,data:null,error:"Error revoking access to data source. Please try again."}];case 6:return[2]}}))}))};export{a as BASE_URL,n as allowedFileTypes,h as deleteFile,y as deleteTags,k as fetchUrls,O as fetchYoutubeTranscript,o as generateAccessToken,c as generateOauthurl,s as getCarbonHealth,S as getEmbeddings,g as getParsedFilePresignedUrl,f as getRawFilePresignedUrl,w as getTextChunks,u as getUserConnections,C as getUserDataSources,m as getUserFiles,i as getWhiteLabelData,T as processSitemapUrl,p as resyncFile,E as revokeAccessToDataSource,b as searchUrls,P as submitScrapeRequest,_ as updateTags,l as uploadFileFromUrl,d as uploadFiles,v as uploadText};
