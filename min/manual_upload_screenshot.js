((e,n,o)=>{"use strict";async function i(){const o=this;try{const i=o.upload,s=i.windowFile;if(!s)throw new Error("Cannot upload a screenshot without a screenshot!");const t=i.fullFile;if(t&&s.name===t.name)throw new Error("Cannot upload two files with the same name.");const a=o.case.id,c=o.sighting.id,d=`case-${a}-url-${c}-window.png`,p=`case-${a}-url-${c}-full.png`,r=new Date(s.lastModified).toUTCString(),h=new FormData;h.set("case_id",a),h.set("case_url_id",c),h.set("screenshot",s,d),t&&h.set("full_screenshot",t,p),h.set("last_modified",r),i.uploading=!0;const u=await l(e,{method:"POST",body:h});if("ok"!==u.status||"string"!=typeof u.window_url){const e=new Error("Did not receive expected response from upload.");throw e.json=u,e}const g=await l(n+a);if(!Array.isArray(g))return location.reload();const w=o.img.id,f=g.find(e=>e.id===w);if(!f)return location.reload();const m=f.urls.find(e=>e.id===c);if(!m)return location.reload();o.sighting.thumb=m.thumb}catch(e){console.error(e),alert(e.message)}finally{o.reset()}}async function l(e,n={}){const o=Object.assign({credentials:"include"},n),i=await fetch(e,o);if(200!==i.status||i.redirected){const e=new Error("An error occurred while uploading.");throw e.response=i,e}return i.json()}function s(e){const n=this.upload,o=e.files[0];n.windowChosen=!!o,n.windowFile=o}function t(e){const n=this.upload,o=e.files[0];n.fullChosen=!!o,n.fullFile=o}jQuery(".row[ng-repeat]").find("img + span").each((e,n)=>{const o=$(n),l=o.scope(),a=l.$new(!1,l),c=function(e){console.log("Resetting");const n=this.upload,o=e.find("input[type=file]");o.each((e,n)=>console.log(n.files[0])),o.each((e,n)=>n.onchange()),this.$apply(()=>{n.windowChosen=n.fullChosen=n.uploading=!1,n.windowFile=n.fullFile=null,o.each((e,n)=>console.log(n.files[0]))})}.bind(a,o);Object.assign(a,{uploadFiles:i,getWindowFile:s,getFullFile:t,reset:c}),a.upload={windowFile:null,fullFile:null,windowChosen:!1,fullChosen:!1,uploading:!1},o.injector().invoke(["$compile",function(e){o.append(e(`\n<label>\n  <input class="hidden" type="file" accept="image/*" onchange="$(this).scope().getWindowFile(this)">\n  <div class="ha-icon-toggle hit-purple" ng-class="{active:upload.windowChosen}" tooltip="choose screenshot" tooltip-placement="right">\n    <span class="glyphicon glyphicon-paperclip"></span>\n  </div>\n</label>\n<label>\n  <input class="hidden" type="file" accept="image/*" onchange="$(this).scope().getFullFile(this)">\n  <div ng-show="upload.windowChosen" class="ha-icon-toggle hit-purple" ng-class="{active:upload.fullChosen}" tooltip="choose full screenshot" tooltip-placement="right">\n    <span class="glyphicon glyphicon-paperclip"></span>\n  </div>\n</label>\n<div ng-click="uploadFiles()" ng-show="upload.windowChosen" ng-class="{active:upload.uploading}" class="ha-icon-toggle hit-danger" tooltip="upload screenshot{{upload.fullChosen ? 's' : ''}}" tooltip-placement="right">\n  <span class="glyphicon glyphicon-cloud-upload"></span>\n</div>\n`)(a))}])})})("/api/v1/admin/screenshot/submit_screenshots","/api/v1/admin/case_images?case_id=");