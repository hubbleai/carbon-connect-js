"use strict";function e(e,t,n,r){return new(n||(n=Promise))((function(a,s){function o(e){try{u(r.next(e))}catch(e){s(e)}}function i(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,i)}u((r=r.apply(e,t||[])).next())}))}function t(e,t){var n,r,a,s,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s&&(s=0,i[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var n=["pdf","docx","txt","csv","md","pptx"],r={PRODUCTION:"https://api.carbon.ai",DEVELOPMENT:"https://api.dev.carbon.ai",LOCAL:"http://localhost:8000"};exports.BASE_URL=r,exports.allowedFileTypes=n,exports.generateAccessToken=function(n){var a=n.apiKey,s=n.customerId,o=n.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,3,,4]),[4,fetch("".concat(r[i],"/auth/v1/access_token"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Bearer ".concat(a),"customer-id":s}})];case 1:return[4,(e=t.sent()).json()];case 2:return n=t.sent(),200===e.status&&n?[2,{status:200,data:n,error:null}]:[2,{status:e.status,data:null,error:n.error||"Unexpected error occurred."}];case 3:return t.sent(),[2,{status:400,data:null,error:"Error generating access token. Please try again."}];case 4:return[2]}}))}))},exports.generateOauthurl=function(n){var a=n.accessToken,s=n.integrationName,o=n.chunkSize,i=void 0===o?1500:o,u=n.chunkOverlap,c=void 0===u?20:u,l=n.skipEmbeddingGeneration,d=void 0!==l&&l,p=n.tags,h=void 0===p?{}:p,v=n.environment,f=void 0===v?"PRODUCTION":v;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(r[f],"/integrations/oauth_url"),{method:"POST",headers:{"Content-Type":"application/json",authorization:"Token ".concat(a)},body:JSON.stringify({tags:h,service:s,chunk_size:i,chunk_overlap:c,skip_embedding_generation:d})})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{oauth_url:t.sent().oauth_url,tags:h,integration:s,chunkSize:i,chunkOverlap:c,skipEmbeddingGeneration:d},error:null}];case 3:return[2,{status:400,data:null,error:"Error generating OAuth URL. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error generating OAuth URL. Please try again."}];case 6:return[2]}}))}))},exports.getUserConnections=function(n){var a=n.accessToken,s=n.environment,o=void 0===s?"PRODUCTION":s;return e(void 0,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),[4,fetch("".concat(r[o],"/integrations/"),{method:"GET",headers:{Authorization:"Token ".concat(a)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return n=t.sent(),[2,{connections:n.active_integrations,error:null,status:e.status}];case 3:return[2,{connections:[],error:{message:"Failed to fetch user connections."},status:e.status}];case 4:return[3,6];case 5:return[2,{connections:[],error:{message:t.sent().message||"Failed to fetch user connections."},status:400}];case 6:return[2]}}))}))},exports.getWhiteLabelData=function(n){var a=n.accessToken,s=n.environment,o=void 0===s?"PRODUCTION":s;return e(void 0,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(r[o],"/auth/v1/white_labeling"),{method:"GET",headers:{"Content-Type":"application/json",authorization:"Token ".concat(a)}})];case 1:return[4,(e=t.sent()).json()];case 2:return n=t.sent(),[2,{status:e.status,data:n}]}}))}))},exports.processSitemapUrl=function(n){var a=n.accessToken,s=n.sitemapUrl,o=n.environment,i=void 0===o?"PRODUCTION":o;return e(void 0,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),s?[4,fetch("".concat(r[i],"/process_sitemap?url=").concat(s),{method:"GET",headers:{Authorization:"Token ".concat(a),"Content-Type":"application/json"}})]:[2,{status:400,data:null,error:"Please provide a valid sitemap URL."}];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:{urls:(n=t.sent()).urls,count:n.urls.length},error:null}];case 3:return[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error fetching sitemap. Please try again."}];case 6:return[2]}}))}))},exports.submitScrapeRequest=function(n){return e(void 0,void 0,void 0,(function(){var e,a,s,o,i,u,c,l,d,p,h,v,f,g,m,y,T,k,b,O;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,5,,6]),e=n.accessToken,a=n.urls,s=n.tags,o=void 0===s?{}:s,i=n.recursionDepth,u=void 0===i?1:i,c=n.maxPagesToScrape,l=void 0===c?1:c,d=n.chunkSize,p=void 0===d?1500:d,h=n.chunkOverlap,v=void 0===h?20:h,f=n.skipEmbeddingGeneration,g=void 0!==f&&f,m=n.environment,y=void 0===m?"PRODUCTION":m,T=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),0===(k=a.filter((function(e){return T.test(e)}))).length?[2,{status:400,data:null,error:"Please provide at least one valid URL."}]:(b=k.map((function(e){return{url:e,tags:o,recursion_depth:u,max_pages_to_scrape:l,chunk_size:p,chunk_overlap:v,skip_embedding_generation:g}})),[4,fetch("".concat(r[y],"/web_scrape"),{method:"POST",headers:{Authorization:"Token ".concat(e),"Content-Type":"application/json"},body:JSON.stringify(b)})]);case 1:return 200!==(O=t.sent()).status?[3,3]:[4,O.json()];case 2:return[2,{status:200,data:{files:t.sent().files},error:null}];case 3:return[2,{status:O.status,data:null,error:"Error initiating scraping. Please try again."}];case 4:return[3,6];case 5:return t.sent(),[2,{status:400,data:null,error:"Error initiating scraping. Please try again."}];case 6:return[2]}}))}))},exports.updateTags=function(n){var a=n.accessToken,s=n.fileId,o=n.tags,i=n.environment,u=void 0===i?"PRODUCTION":i;return e(void 0,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(r[u],"/create_user_file_tags"),{method:"POST",body:JSON.stringify({tags:o,organization_user_file_id:s}),headers:{"Content-Type":"application/json",Authorization:"Token ".concat(a)}})];case 1:return 200!==(e=t.sent()).status?[3,3]:[4,e.json()];case 2:return[2,{status:200,data:t.sent(),error:null}];case 3:return[2,{status:400,data:null,error:"Failed to add tags to the file."}]}}))}))},exports.uploadFiles=function(a){var s=a.accessToken,o=a.files,i=a.chunkSize,u=void 0===i?1500:i,c=a.chunkOverlap,l=void 0===c?20:c,d=a.skipEmbeddingGeneration,p=void 0!==d&&d,h=a.environment,v=void 0===h?"PRODUCTION":h;return e(void 0,void 0,void 0,(function(){var a,i,c;return t(this,(function(d){switch(d.label){case 0:return d.trys.push([0,2,,3]),0===o.length?[2,{data:{count:0,successfulUploads:[]},error:{message:"Please provide atleast a file to upload",count:0,failedUploads:[]},status:400}]:(a=[],i=[],[4,Promise.all(o.map((function(o,c){return e(void 0,void 0,void 0,(function(){var e,c,d,h,f,g;return t(this,(function(t){switch(t.label){case 0:return t.trys.push([0,6,,7]),(e=new FormData).append("file",o),c=o.name.split(".").pop(),n.find((function(e){return e===c}))?[4,fetch("".concat(r[v],"/uploadfile?chunk_size=").concat(u,"&chunk_overlap=").concat(l,"&skip_embedding_generation=").concat(p),{method:"POST",body:e,headers:{Authorization:"Token ".concat(s)}})]:(i.push(o.name),[2]);case 1:return 200!==(d=t.sent()).status?[3,3]:[4,d.json()];case 2:return h=t.sent(),a.push(h),[3,5];case 3:return[4,d.json()];case 4:f=t.sent(),i.push({fileName:o.name,message:f.message||"Failed to upload file."}),t.label=5;case 5:return[3,7];case 6:return g=t.sent(),i.push({fileName:o.name,message:g.message||"Failed to upload file."}),[3,7];case 7:return[2]}}))}))})))]);case 1:return d.sent(),c=null,i.length>0&&(c={message:"Failed to upload some files.",count:i.length,failedUploads:i}),[2,{data:{count:a.length,successfulUploads:a},error:c,status:200}];case 2:return[2,{data:{count:0,successfulUploads:[]},error:{message:d.sent().message||"Failed to upload files.",count:o.length,failedUploads:o.map((function(e){return e.name}))},status:400}];case 3:return[2]}}))}))};
