var _gravity=_gravity||[];var GrInitialized=false;var GravityApiObject=function(g){var e={logging:false,grApiDebug:false,userId:USERID};var b={logging:false,grApiDebug:false};function a(){if(window.console&&console.log&&b.logging===true){console.log("GravityHstApi:",arguments[0],(arguments.length>1?arguments:""))}}function i(){if(window.console&&console.error&&b.logging===true){console.error("GravityHstApi:",arguments[0],(arguments.length>1?arguments:""))}throw arguments[0]}$.extend(b,e);if(!$.isEmptyObject(g)){$.extend(b,g)}a("Applied config... >> ",b);if(GrInitialized!==true){a("Set Gravity config...");var f=$.cookie("hstgr");var c={type:"set",mode:(b.grApiDebug===true?"DEVELOP":"PROD"),useJsGeneratedCookie:(f===null?true:false),userId:b.userId};if(f!==null){$.extend(c,{cookieId:f})}d(c);a("Applied Gravity config... >> ",c)}var j={isNumber:function(l){return typeof(l)=="number"},existsDataInContainer:function(l,m){if(m.length==0||!$.isArray(m)){i("Require data is empty or not array. o.O")}if(!(l instanceof $)){i("This is not jQuery object.")}var n;var o=true;var p=l.data();for(n in m){if(!$.inArray(m[n],p)||($.inArray(m[n],p)&&(typeof(p[m[n]])=="undefined"||$.trim(p[m[n]])==""))){i("Required key not exists or empty. >> "+n);o=false}}return o},existsDataInObject:function(m,l){if(l.length==0||!$.isArray(l)){i("Require data is empty or not array. o.O")}if($.isEmptyObject(m)){i("This is not object or empty.")}var n;var o=true;for(n in l){if(typeof(m[l[n]])=="undefined"||$.trim(m[l[n]])==""){i("Required key not exists or empty. >> "+l[n]);o=false}}return o},setConfigContainer:function(n,m){var l=n;if(typeof m!="undefined"&&m instanceof $){l=m}return l},getVid:function(n){var m=$(this);var l=j.setConfigContainer(m,n);if(typeof(l.data("vid"))=="undefined"&&typeof(l.attr("id"))!="undefined"){return l.attr("id").substr(2,l.attr("id").length)}else{if(typeof(l.data("vid"))!="undefined"){return l.data("vid").substr(2,l.data("vid").length)}}return false}};var k={openPage:function(n){if((typeof VIDEOID=="undefined"||!j.isNumber(VIDEOID))&&(typeof n=="undefined"||!j.isNumber(n))){i("Invalid video id or undefined.")}var l=(typeof(n)!="undefined"&&n>0?n:VIDEOID);var m={type:"event",eventType:"VIEW",itemId:l.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(m);a("Opened "+l+" video page.",m)},favorite:function(r){var q=$(this);var l=j.setConfigContainer(q,r);var m=["id","eventType"];j.existsDataInContainer(l,m);var s=l.data("id");var n=l.data("eventType");var p=l.data("source");var o={type:"event",eventType:(n.toLowerCase()=="add"?"ADD_TO_FAVORITES":"REMOVE_FROM_FAVORITES"),itemId:s.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};if(p!="undefined"&&p!=""){$.extend(o,{source:p})}d(o);a(n.toLowerCase()+" to favorite >> "+s,o)},rate:function(r){var q=$(this);var l=j.setConfigContainer(q,r);var n=["id","value"];j.existsDataInContainer(l,n);var s=l.data("id");var p=l.data("value");var m=l.data("where");var o={type:"event",eventType:"RATING",value:p,itemId:s.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};if(typeof(m)!="undefined"){$.extend(o,{source:m.toLowerCase()+":rating"})}d(o);a("rating >> "+s+":"+p,o)},like:function(r){var q=$(this);var l=j.setConfigContainer(q,r);var n=["id","type"];j.existsDataInContainer(l,n);var s=l.data("id");var o=l.data("type").toLowerCase();var m=l.data("where");var p={type:"event",eventType:(o=="dislike"?"DISLIKE":"LIKE"),itemId:s.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};if(typeof(m)!="undefined"){$.extend(p,{source:m.toLowerCase()+":like"})}d(p);a("Like >> "+s,p)},playlist:function(m){var l=["id"];j.existsDataInObject(m,l);var n={type:"event",eventType:"ADD_TO_PLAYLIST",itemId:m.id.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(n);a("Add to Playlist >> "+m.id,n)},commentVideo:function(r,p){var o=$(this);var l=j.setConfigContainer(o,p);var m=["id"];j.existsDataInContainer(l,m);if(typeof(r)=="undefined"){throw"Comment field undefined!"}var q=l.data("id");var n={type:"event",eventType:"COMMENT",itemId:q.toString(),text:r,device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(n);a("commented >> "+q,n)},startVideoPlayerCallback:function(m){if(typeof(m)=="undefined"||m<1){throw"Video id not defined or invalid!"}var l={type:"event",eventType:"FREE_VIEW",itemId:m.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(l);_gaq.push(["_trackEvent","Vidii",DEVICE+"_PlayVideo"]);a(DEVICE+"_PlayVideo >> "+m,l);if(DEVICE!="mobile"){$("body").playVideoLog(m)}vidiiPopupCallback()},click:function(p){var o=$(this);var m=j.setConfigContainer(o,p);var n=["id","eventType","eventName","source"];j.existsDataInContainer(m,n);var l={id:m.data("id"),eventType:m.data("eventType"),eventName:m.data("eventName"),source:m.data("source")};k._sendClick(l)},clickVideoPlayerCallback:function(m){var l=["id","eventType","eventName","source"];j.existsDataInObject(m,l);k._sendClick(m)},_sendClick:function(l){var m={type:"event",eventType:l.eventType.toUpperCase(),itemId:l.id.toString(),source:l.source.replace(new RegExp(" ","g"),"+"),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(m)},downloadVideo:function(p){var l=$(p);var m=["videoId"];j.existsDataInContainer(l,m);var o=l.data("videoId");var n={type:"event",eventType:"DOWNLOAD",itemId:o.toString(),device:DEVICE,geo:GEO,language:LANGUAGE,trafficType:trafficType};d(n);a("commented >> "+o,n)}};function d(l){l.recommendationId=window.recommendationId;_gravity.push(l)}var h=function(n,o){var l=this;var m=["method","device"];j.existsDataInObject(n,m);a("Send JSONP request...",n);$.getJSON(globalVars.www_subdomain+"/pollingVideoIdsAPI.php?callback=?",n,function(p){a("JSONP request completed...",p);if(typeof(o)=="function"){o.call(l,p)}}).error(function(){i("Failed to load data!")})};return{event:k,get:h,getVid:j.getVid}};var GravityCallbackUtilities={pushOtherData:function(c,b){if(typeof(c.items)!="undefined"&&c.items.length>0){var a;for(a in c.items){c.items[a].pollingSourceEvent=(c.pollingSource=="gravity"?"REC_CLICK":"CLICK");if(c.items[a].daysold<=0){c.items[a].uploaded="today"}else{if(c.items[a].daysold==1){c.items[a].uploaded="yesterday"}else{c.items[a].uploaded=c.items[a].daysold+" days ago"}}$.extend(c.items[a],b)}}return c.items}};var GravityApi=new GravityApiObject();$(document).ready(function(){if(globalVars.whereAmI=="video"){GravityApi.event.openPage()}$(document).on("click",".thumb:not(.noGrClick) a",function(){var b=$(this);var a=b.parents("li.normal_li");if(typeof(whereAmI)!=="undefined"&&whereAmI==globalVars.community_subdomain.replace("http://","")){GravityApi.event.click(b.parents("div.thumb"))}else{GravityApi.event.click(a)}});$(document).on("click","#playlist-video-list-wrap a[href*=hardsextube]",function(){var a=$(this).parent("div.playlist-thumb");if(a.size()>0){GravityApi.event.click(a)}})});