var timer;var actual_id;var vpmouseover=false;var thumbCol=0;var vidiiAdxloaded=false;var vp;if($.getUrlVar("vp")=="off"||globalVars.sessionPrefervp=="no"){vp=0}else{vp=1;var vpDOM}var vpReady=false;var mySize=windowSize();function hidePostrollAd(){$(".player-html5").show();$(".player-html5")[0].currentTime=0;$(".player-html5")[0].pause();$("#adultmoda_postroll_ad .ad_text")[0].innerHTML="";$("#adultmoda_postroll_ad .banner")[0].innerHTML="";$("#adultmoda_postroll_ad").hide()}function getCategoryName(b){var a=new RegExp(/(.+)(\s\([0-9]+\))/);return b.replace(a,"$1")}$(document).on("click",".normal_li.bigThumb A",function(a){vpPopupCallback()});$(document).on("click",".shortRow > a",function(b){$this=$(this);$catImgWrap=$this.find(".catImgWrap");var a=$(".browseby_change").val().replace(" ","_").toLowerCase();analyticsCategoryPush($catImgWrap.attr("data-catname"),"image",a)});$(document).on("click","#categoryNameList > a",function(a){$this=$(a.target);analyticsCategoryPush($this.attr("data-catname"),"abc")});$(document).on("click","#categoriesHotLinks a",function(a){analyticsCategoryPush($(this).html(),"hotlinks")});function analyticsCategoryPush(c,b,a){if(typeof category_page_from==="undefined"){category_page_from="page_from_not_found_error"}if(typeof a==="undefined"){a=new String()}else{a=":"+a}}$(document).ready(function(){videoLinkUrl=typeof videoLinkUrl!=="undefined"?videoLinkUrl.replace(/\+/g,"."):undefined;if(typeof videoLinkUrl!=="undefined"&&typeof videoLinkTitle!=="undefined"&&videoLinkTitle!=""){var l="<big>"+_("Visit")+' <a target="_blank" rel="nofollow" href="'+videoLinkUrl+'">'+videoLinkTitle+"</a> "+_("for more videos!")+"</big>";$("#videolink-wrap").html(l)}else{if(videoLinkUrl){var l="<big> "+_("Visit")+' <a target="_blank" rel="nofollow" href="'+videoLinkUrl+'">'+videoLinkUrl+"</a> "+_("for more videos!")+"</big>";$("#videolink-wrap").html(l)}}if(typeof(onTablet)!="undefined"&&onTablet){if(isIpad){playIpadVideo($("#flvAnyad"))}$("#loginbox").popUpMe("#community_login_btn")}switch(globalVars.whereAmI){case"video":initDynamicWrap();$("#player-overlay").on("click",function(){getFlashMovie("PseudoFlvPlayerProg").startVideoFromJS();$("#player-overlay").remove()});$("#reportsend").reportBtn("#reportForm");$(".fav").favoriteBtn();$("#suggest_to_friends").popUpMe(".suggest_btn","");if(onTablet){TabbedContent_tablet.init("#tab_details",".details")}else{if($.getUrlVar("report")){TabbedContent.init("#tab_report",".report")}else{TabbedContent.init("#commentsBlock",".commentsBlock")}}var d=$(".video_blockmenu").children().find(".active").attr("id");$(".video_blockmenu").videoBlock(d);$(".stream").hover(function(){$(".stream DIV").parent().find("DIV").addClass("hover")},function(){$(".stream DIV").parent().find("DIV").removeClass("hover")});$("#separator_bar").scrollToMiddle();if($("#aboveplayerad").size()>0){var h=$("#aboveplayerad");var f=$(".videoplayer H1").html();var b=JSON_SUBDOMAIN+"/onPlayerAd.php?aboveplayer=1&title="+f;$.ajax({url:b,dataType:"json",success:function(q){if(q.results.length==0){return}if(!q){return}if($.isEmptyObject(q.results.result[0].image)){return}var n=q.results.result[0];$("<img/>").attr({src:n.image}).appendTo(h);$("<span></span>").html(_("Sponsored:")).appendTo(h);$("<span></span>").attr({id:"textad"}).appendTo(h);var p=n.description;if(n.description.length+n.title.length>70){var r=70-n.title.length;var o=n.description.substr(0,r).lastIndexOf(" ");if((r-o)<3&&o>=0){o=n.description.substr(0,o).lastIndexOf(" ")}if(o==-1){o=70}var p=n.description.substr(0,o)+"..."}$("#textad").html(n.title+"<strong>"+p+"</strong>");h.click(function(){window.open(n.click,"_blank")});m(h,10000)},timeout:30000,error:function(){h.hide()}});function m(n,o){var n=$(n);n.fadeOut("2000",function(){n.fadeIn("2000")});setTimeout(function(){m(n,o)},o)}}break;case"main":initDynamicWrap();if(browserIsOldIE){resizeDivs()}if($.getUrlVar("login")){$("#loginbox").popUpMe("#login_btn","",true)}var c=$.getUrlVar("filter");$("#longshort_change").slideButton("long","on","off");$("#thumbVideo_change").slideButton("vp","off","on");$("#ggender").slideButton("vp","off","on");$("#static_menu").showPage();if(mySize.width<1150||browserIsOldIE){$("#tagcloud").css({"font-size":"17px"})}else{$("#tagcloud").css({"font-size":"13px"})}break;case"community":break;case"categories_ads":var g=14;if($(".categories").hasClass("tail")){g=23}else{g=16}if(mySize.width<1150||browserIsOldIE){g-=6;$(".wrap").css({width:"1000px"});$(".category_pic img").css({width:"160px",height:"120px"});$("ul.wrap_thumbs li.category_pic.normal_li").css({width:"25%",height:"130px"});$("ul.wrap_thumbs li.category_pic span.title").css({width:"155px",height:"22px"});$("ul.wrap_thumbs li.category_pic.normal_li .thumb").css({width:"162px",height:"150px"});$(".categorytotal").css({display:"none","font-size":"11px",width:"70px"});$("ul.wrap_thumbs li.category_pic a.category_name").css({"font-size":"14px",width:"100%","line-height":"10px","margin-top":"7px"});$("#tagcloud").css({"font-size":"14px"});$("#categories_sidebar #tagcloud").css({"font-size":g+"px"});$(".video-block.categories.dynamic").show("fast")}else{$(".video-block.categories.dynamic").show("fast");$("#categories_sidebar #tagcloud").css({"font-size":g+"px"});initDynamicWrap(true)}break;case"categories":$(".video-block.categories.dynamic").show("fast");initDynamicWrap(true);break;case"register":$("#panForm").validationEngine("attach",{scroll:false});break;case"pornstars":initDynamicWrap(true);if(browserIsOldIE){resizeDivs()}break;default:}function i(){var n=window.location.search;if(n.length>0){exp=new RegExp("[?&]page=[^&]+|page=[^&]+$");n=n.replace(exp,"");return n}else{return false}}function e(q,n){var p=i();if(!p){return location.origin+"/?"+q+"="+n}else{var o=new RegExp("[?&]"+q+"=[^&]+|"+q+"=[^&]+$");p=p.replace(o,"");p="?"+p.substring(1);if(p.length>0){return location.origin+"/"+p+"&"+q+"="+n}else{return location.origin+"/?"+q+"="+n}}}$("#genderSlider").slider({value:$("#genderSlider").attr("data-act"),min:1,max:3,step:1,change:function(n,o){if($("#genderSlider").attr("data-act")==o.value){return false}switch(o.value){case 1:location.href=globalVars.www_subdomain+"/?filter=straight";break;case 2:location.href=globalVars.www_subdomain+"/?filter=no";break;case 3:location.href=globalVars.www_subdomain+"/?filter=gay";break}}});$("#videoLengthSlider").slider({value:$("#videoLengthSlider").attr("data-act"),min:0,max:1,step:1,change:function(n,o){if($("#videoLengthSlider").attr("data-act")==o.value){return false}switch(o.value){case 0:location.href=e("long","off");break;case 1:location.href=e("long","on");break}}});$("#videoPreviewSlider").slider({value:$("#videoPreviewSlider").attr("data-act"),min:0,max:1,step:1,change:function(n,o){if($("#videoPreviewSlider").attr("data-act")==o.value){return false}switch(o.value){case 0:location.href=e("vp","on");break;case 1:location.href=e("vp","off");break}}});if($("#newRateBar").size()>0){readOnlyRate=($("#newRateBar").hasClass("canRate"))?false:true;rateDefVal=$("#newRateBar").attr("data-val").substr(0,3);if(parseFloat(rateDefVal)>0){$("#definedRate").html(rateDefVal)}$(".rateDick").each(function(){if(parseFloat($(this).val())==parseFloat(rateDefVal)){$(this).attr("checked",true)}});function a(){$("#track-source-field").val("rating_video");openLoginModal({source:"rating_video"});setGaTrackSourceToJoinBtn("rating_video");pushGaLoginRegTrack("rating_video");$(".rateDick").rating("enable")}$(".rateDick").rating({readOnly:readOnlyRate,starWidth:30,split:10,required:true,focus:function(o,n){},blur:function(o,n){},callback:function(q,p){$(".rateDick").rating("disable");$("#thanksrate").fadeIn();if(typeof USERNAME=="undefined"||USERNAME==""){a();return false}var o=$("#newRateBar");var n=o.attr("data-vid");o.data("value",q);$.post(DOMAIN+"/api.php",{data:JSON.stringify({type:"video_rate",id:n,value:q})},function(r){if(r.msg=="notloggedin"||r.rating==null||r.msg==null){a()}else{$(".rateDick").rating("disable");$("#thanksrate").fadeIn();$(".rateVal").html(r.rating.toFixed(1));GravityApi.event.rate(o)}})}})}var j=$("#likeBlock");if(j.length>0){var k=false;$("#likeBtn,#dislikeBtn").on("click",function(n){if(k===true){return}likeVideo(j.data("contentId"),j.data("contentType"),"like")})}});function likeVideo(d,c,a){var b=$(this);likeProcess=true;b.addClass("clicked");$.getJSON(DOMAIN+"/api.php",{data:JSON.stringify({type:"like",content_id:d,content_type:c,like_type:a})}).done(function(e){if(e.msg==="ok"){$("#likeStatus").addClass("save");$("#likePercent").text(e.likesPercent+"%");GravityApi.event.like(b);likeProcess=true;return}if(e.msg==="notloggedin"){openLoginModal({source:"like"});likeProcess=false}b.removeClass("clicked")})}$(document).ready(function(){function b(){if($("#nextVidBtn").size()===0){return false}if($("#nextVidBtn").hasClass("hidden")){return false}if($(document).width()>=1170){$("#nextVidBtn").css("display","block")}else{$("#nextVidBtn").css("display","none")}}function a(){if($("#nextVidBtn").size()===0){return false}var d=$("#nextVidBtn").offset().top;var c=$(".video_tabbedblocks").offset().top;if($(document).width()<=1450){if(d-$(window).scrollTop()>c-$(window).scrollTop()-$(window).height()/3){$("#nextVidBtn").addClass("hidden");$("#nextVidBtn").css("display","none")}else{$("#nextVidBtn").removeClass("hidden");$("#nextVidBtn").css("display","block")}}}b();if($("#nextVidBtn").size>1){$(window).bind("resize",b);$(window).bind("scroll",a)}});var savedWidth=$.cookie("wrapWidth");var savedThumbWidth=$.cookie("percentageWidth");var prevWidth=$.cookie("bWidth");var staticWidth="1005px";function initDynamicWrap(a){if(browserIsOldIE){return false}if(typeof(NODYNAMICWRAP)!="undefined"){if(NODYNAMICWRAP){return false}}if(a||$("div.mainBlock:first").data("forceResize")||onTablet||savedWidth==null||isNaN(parseInt(savedWidth))||parseInt(savedWidth)==100||parseInt(savedWidth)<770||prevWidth!=mySize.width){resizePage()}$(window).resize(function(){$.cookie("wrapWidth",null,{domain:".hardsextube.com"});$.cookie("pecentagleWidth",null,{domain:".hardsextube.com"});$.cookie("bWidth",null,{domain:".hardsextube.com"});resizePage()})}function resizePage(){var c=windowSize(),a=$(".video-block.dynamic:not(.relatedblock):eq(0)"),b="100%";if(c.width<=800){if(isIpad){b="610px";resetWrap("1020px")}else{resetWrap("770px")}}else{if(c.width>=1349){b="100%";resetWrap("1260px")}else{if(c.width==1280){b="870px";resetWrap("1221px")}else{if(c.width<=1277&&c.width>1124){b="670px";if(onTablet){b="606px"}resetWrap("1010px")}else{if(c.width<=1124){if(onTablet){b="610px";resetWrap("1020px")}else{b="578px";resetWrap("965px")}}else{b="910px";resetWrap("100%")}}}}}if(globalVars.whereAmI!="video"&&globalVars.whereAmI!="pornstars"){a.css("width",b)}}function resetWrap(a){if(a=="reset"){var b=true;a="1005px"}$(".mainBlock").css({width:"100%"});$(".wrap").css({width:a,margin:"auto"});if(savedWidth!=a){$.cookie("wrapWidth",a,{expires:100,domain:".hardsextube.com"});$.cookie("bWidth",mySize.width,{expires:100,domain:".hardsextube.com"})}if(!b){resizeDivs()}}function resizeDivs(){resizeBlock(".video-block.dynamic");if(globalVars.whereAmI=="main"){resizeBlock(".video-block.dynamic_mainblock")}}function resizeBlock(h,e){var g=windowSize();var l=$(h).parents().find(".relatedvid.wrap").width();if(l==0||l==null||l==undefined){l=$(h).width()}if(l<100){l=parseInt(WRAPWIDTH)}if($(h).hasClass("categories")){var i=0}else{var i=(isIpad?0:6);if(g.width>800&&g.width<=1124){i=5}}var d=$(h+" ..wrap_thumbs LI.normal_li").find(".thumb").width()+i;var b=parseInt($(h+" ..wrap_thumbs LI.normal_li").css("height"));var c=parseInt(l/d);var a=$(h+" ..wrap_thumbs LI.normal_li").size();var j;if($(h+" ..wrap_thumbs.hotcontent LI.normal_li").size()>0){a=a-$(h+" ..wrap_thumbs.hotcontent LI.normal_li").size()}if(c>10){return false}j=($(h).hasClass("relatedblock")||$(h).hasClass("rtab")||$(h).attr("id")=="pornstarVideoPagination")?7:5;if(c>j&&!$(h).hasClass("reviews")){resetWrap("reset");c=j}var f=100/c+"%";if(!$(h).hasClass("relatedblock")&&!$(h).hasClass("rtab")){if(a/c!=0){var k=((parseInt(a/c)*b)<1)?b:parseInt(a/c)*b;if(!$(h).find(".wrap_thumbs").hasClass("featured")){if(!$(".wrap_thumbs").data("dont-cut-widow")){$(h).find(".wrap_thumbs").css({height:k})}}}}$(h+" ..wrap_thumbs LI.normal_li").width(f);if(g.width<=1277&&g.width>1124&&!onTablet){$(".video-block.dynamic:eq(0)").find("li.normal_li").css("width","25%")}$.cookie("percentageWidth",f,{expires:100,domain:".hardsextube.com"})}$(function(){$(".showHide,.TshowHide").click(function(){var b=$(this).attr("data-href");var a=$(this);$(this).children().each(function(){$(this).hide()});if($(b).css("display")=="none"){$(b).slideDown(function(){$(".slideContent").css("display","block");$("#tagcloud").css("font-size","11px");$("#morebtn").html("close");$("#showHide").removeClass("inactive");$(this).parent().find("A").removeClass("inactive");$("#showHide").addClass("active");$(this).parent().find("A").addClass("active")});b=b.replace("#","");$.cookie(b,"active")}else{$(b).children().each(function(){$(this).hide()});$(b).slideUp(function(){$("#tagcloud").css("font-size","12px");$("#showHide").removeClass("active");$("#showHide").addClass("inactive");$(this).parent().find("A").removeClass("active");$("#morebtn").html("more")});b=b.replace("#","");$.cookie(b,null)}})});function adxShowonPlayer(a,b){var e=$("#"+a).offset();var d=$("#"+a).width();var g=$("#"+a).height();var c=$("#"+b).width();var f=$("#"+b).height();$("#"+b).css("left",e.left+(d/2)-(c/2)-3);$("#"+b).css("top",e.top+(g/2)-(f/2)-80-11);$("#"+b).slideDown("fast")}function adxRemoveAdsX(){if($("#vidii_adx").has(".remove-adverts-x").length===1){return false}var b=$("#vidii_adx");var a="";if(isLoggedIn()){a='href="'+globalVars.www_subdomain+'/memberUpgrade.php?type=vip"'}b.append("<a "+a+' class="remove-adverts-x" data-track-source="remove_ads_link_x">x</a>')}function adxLoadonPlayer(a){if(vidiiAdxloaded){return false}$.post("/api.php",{data:JSON.stringify({type:"getVideoInnerAds",filter:$("#vidii_adx").attr("data-filter"),device:DEVICE})},function(b){$("#"+a).html(b.banner);vidiiAdxloaded=true})}function adxHidePlayer(a,b){$("#"+b).hide()}function vpPopupCallback(){if(typeof AdCreative.click=="function"){AdCreative.click()}}function vidiiPopupCallback(){adxLoadonPlayer("vidii_adx");if(typeof AdCreative.click=="function"){AdCreative.click()}}function shareVideo(a){$("#share_vid").popUpMe("","videoShare()",true)}function videoShare(){var b=0;var a=_("Please fill this field...");$("#videoShareForm").css("display","block");$("#videoShareForm_div").html("");$("#videoShareForm .input").click(function(){if(b!=3){$("#videoShareForm .input").each(function(){if($(this).attr("title")=="wrong"){$(this).val("");$(this).attr("title","ok")}})}});$("#videoShareForm_submit").live("click",function(){$("#videoShareForm .input").each(function(){if($(this).val()!=""&&$(this).attr("title")=="ok"){b++}else{$(this).attr("title","wrong");$(this).val(a);b=0}});if(b>=2){$.post(globalVars.www_subdomain+"/share.php",$("#videoShareForm").serialize(),function(c){if(c=="1"){$("#videoShareForm").hide();$("#videoShareForm_div").html("<span class='msg'>"+_("Your message has sent.")+"</span>")}else{$("#videoShareForm").hide();$("#videoShareForm_div").html("<span class='msg_error'>"+_("Shit! Something happened wrong!Try it later!")+"</span>")}})}})}function onPlayAdError(){}function adBlockerDeterctor(){var _abdStatusFnc="_status";function _status(isDetected){if(isDetected){$.post(globalVars.www_subdomain+"/adblockerdetect.php",{adbdetected:1},function(data){})}else{}}eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!"".replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return"\\w+"};c=1}while(c--){if(k[c]){p=p.replace(new RegExp("\\b"+e(c)+"\\b","g"),k[c])}}return p}("(g(){a 5=z;a 2=8;a 4=8;g A(){2=6.u(\"I\");4=6.u(\"H\");2.l='b';2.n='/o/';2.3.v='G';2.3.F='C';4.l='s';4.n='/o/E-N.P';4.3.p=2.3.p='m';4.3.q=2.3.q='m';4.3.r=2.3.r='-h';4.3.t=2.3.t='-h';6.j.i(2);6.j.i(4);Q(k,O)};g k(){7(6.c('s').3.v.J('C')>-1)5=9;f 7(6.c('b').3.K=='L')5=9;f 7(6.c('b').M==0)5=9;2.x.D(2);4.x.D(4);7(d(w)!='8')e(w+'('+5+');');f{7((5==9)&&(d(y)!='8'))e(y+'();');7((5==z)&&(d(B)!='8'))e(B+'();')}};A()})();",53,53,"||_af|style|_am|_ab|document|if|undefined|true|var|_afd|getElementById|typeof|eval|else|function|1000px|appendChild|body|_ss|id|1px|src|adimages|width|height|top|_amd|left|createElement|display|_abdStatusFnc|parentNode|_abdDetectedFnc|false|detect_ab|_abdNotDetectedFnc|none|removeChild|textlink|border|block|IMG|IFRAME|indexOf|visibility|hidden|clientHeight|ads|100|jpg|setTimeout".split("|"),0,{}))}jQuery.fn.scrollToMiddle=function(a){var b=(mySize.height-parseInt($(this).css("height")));if(mySize.height>480){$("html, body").animate({scrollTop:$(this).offset().top-(b/2)},100)}else{$("html, body").animate({scrollTop:$(this).offset().top},100)}};jQuery.fn.videoBlock=function(d){var c=2;var j=0;var h=new Object();h.name=d;h.size=0;var f=$(d).children().find(".thumb").width();var i;if(onTablet){i=705}else{i=570}$(d+" .video-block").addClass("dynamic");resizeDivs(d+".wrap");if(mySize.width<=800){h.thumbPerPage=8}else{if(mySize.width>=1349){h.thumbPerPage=14}else{if(mySize.width==1280){h.thumbPerPage=14}else{if(mySize.width<=1277&&mySize.width>1124){h.thumbPerPage=12}else{if(mySize.width<=1124){h.thumbPerPage=10}else{h.thumbPerPage=14}}}}}if(browserIsOldIE){h.thumbPerPage=10}h.thumbPerPage=h.thumbPerPage*1.5;this.children().each(function(){if(this.childNodes[0].id==d){this.childNodes[0].className="active"}});function g(m,l,k){$(m).find("IMG").each(function(n){if(n>=l){$(this).attr("src",$(this).attr("data-href"));$(this).slideDown("fast")}if(k&&k==n+1){j=n+1;return false}})}function b(k){h.name=k;h.size=$(k+" LI").size();h.children=$(h.name).children();if(h.size>h.thumbPerPage){h.children.find(".next").show()}else{h.children.find(".next").hide()}}$(".next").unbind("click");$(".next").click(function(){if(h.children.find(".wrap_thumbs").is(":animated")){return false}gaTrack("RealatedPaging","next","");if(!$(this).children("A").hasClass("inactive")){if(h.size>j){h.children.find(".wrap_thumbs").animate({top:"-="+i+"px"},function(){if(h.size-h.thumbPerPage<j){h.children.find(".next").children("A").addClass("inactive")}});g(h.name,j,parseInt(j+h.thumbPerPage));h.children.find(".prev").children("A").removeClass("inactive")}else{$(this).hide()}}});$(".prev").unbind("click");$(".prev").click(function(){if(h.children.find(".wrap_thumbs").is(":animated")){return false}gaTrack("RealatedPaging","prev","");if(!$(this).children("A").hasClass("inactive")){if((j-h.thumbPerPage)>=h.thumbPerPage){j=j-h.thumbPerPage;$(".next").children("A").removeClass("inactive");h.children.find(".wrap_thumbs").animate({top:"+="+i+"px"},function(){if(j<=h.thumbPerPage){$(h.name).children().find(".prev").children("A").addClass("inactive")}})}else{$(this).hide()}}});$(d).show();b(d);g(d,0,h.thumbPerPage);var a=0;var e=0;this.children().find("SPAN").click(function(){var n=$(this);var q=n.attr("id");var m=n.parent().parent().find(".active");lastActiveDiv=m.attr("id");$(lastActiveDiv).hide();m.removeClass("active");n.addClass("active");var k=$(q).children().find("UL.wrap_thumbs");k.css("top","0px");var o=(n.data("method")!="undefined"?n.data("method"):"");var l=(n.data("source")!="undefined"?n.data("source"):"");if(k.find("li").size()<1&&o){GravityApi.get({method:o,device:(typeof(DEVICE)!="undefined"?DEVICE.toLowerCase():"pc"),currentItemId:VIDEOID,numberLimit:63,nick:(n.data("nick")!="undefined"?n.data("nick"):""),orientation:(n.data("orientation")!="undefined"?n.data("orientation"):""),title:(n.data("title")!="undefined"?n.data("title"):"")},function(r){r.domain=DOMAIN;r.items=GravityCallbackUtilities.pushOtherData(r,{source:l});$("#\\"+h.name).data("recommendation-id",r.recommendationId);window.recommendationId=r.recommendationId;fetchTpl("gravityRelatedVideos",r,function(s){k.html(s);g(q,0,h.thumbPerPage);b(q);resizeBlock(q+".wrap")})})}else{window.recommendationId=n.data("recommendation-id")}$(q).show();$(q+" .video-block").addClass("dynamic");g(q,0,h.thumbPerPage);b(q);if(q==".reviews"&&e==0){var p=$(q).children("SPAN").html();$.post("/xreview.php",{t:p},function(r){e=1;$(".reviews").append(r);gotxreviews=true;if(parseInt($(q+".wrap").width())==1260){$(".xreviewsmainBlock").css("width","33%")}else{$(".xreviewsmainBlock").css("width","50%")}})}else{if(e!=1){$(".reviews").html("")}}if(q==".pornstarvideos"){if($(".pornstarvideos ul").find("li").size()==0){$.post("/relatedpornstarvideos.php",{data:JSON.stringify({start:$(".pornstarvideos li.normal_li").size(),vid:$(".fav").attr("id")})},function(r){$(".pornstarvideos ul").html(r.tpl);b(q)})}}resizeBlock(q+".wrap");return false})};jQuery.fn.favoriteBtn=function(){$(this).click(function(){var b=new Date();b.setTime(b.getTime()+(20*60*1000));var a=$(this).attr("id");if($(this).hasClass("remove")){$.ajax({url:"/aplay.php",data:"fav=remove&vid="+a,type:"GET",dataType:"text",success:function(c){var d=$(".fav");if(c=="0"){$.cookie(a,"fav",{domain:".hardsextube.com",expires:1});d.removeClass("add").addClass("remove").attr("title",_("Remove from favorites"));$(".fav DIV").removeClass("addfavorite_btn").addClass("remfavorite_btn");$(".fav SPAN").html(_("Remove from<br/>favorites"));$(".fav").data("track-label","UnderVideoBtn_RemoveFavorite");GravityApi.event.favorite(d);d.data("eventType","remove")}if(c=="1"){$.cookie(a,null,{domain:".hardsextube.com"});d.removeClass("remove").addClass("add").attr("title",_("Add to favorites"));$(".fav DIV").removeClass("remfavorite_btn").addClass("addfavorite_btn");$(".fav SPAN").html(_("Add to<br/>favorites"));$(".fav").data("track-label","UnderVideoBtn_AddFavorite");GravityApi.event.favorite(d);d.data("eventType","add")}if(c=="2"){openLoginModal({source:"add_to_favorites_video"});setGaTrackSourceToJoinBtn("add_to_favorites_video");pushGaLoginRegTrack("add_to_favorites_video")}}})}if($(this).hasClass("add")){$.ajax({url:"/aplay.php",data:"fav=add&vid="+a,type:"GET",dataType:"text",success:function(c){var d=$(".fav");if(c=="0"){$.cookie(a,"fav",{domain:".hardsextube.com",expires:1});d.removeClass("add").addClass("remove").attr("title",_("Remove from favorites"));$(".fav DIV").addClass("remfavorite_btn");$(".fav SPAN").html(_("Remove from<br/>favorites"));GravityApi.event.favorite(d);d.data("eventType","remove");$(".fav").data("track-label","UnderVideoBtn_RemoveFavorite")}if(c=="1"){$.cookie(a,null,{domain:".hardsextube.com"});d.removeClass("remove").addClass("add").attr("title",_("Add to favorites"));$(".fav DIV").addClass("addfavorite_btn");$(".fav SPAN").html(_("Add to<br/>favorites"));$(".fav").data("track-label","UnderVideoBtn_AddFavorite");GravityApi.event.favorite(d);d.data("eventType","add")}if(c=="2"){openLoginModal({source:"add_to_favorites_video"});setGaTrackSourceToJoinBtn("add_to_favorites_video");pushGaLoginRegTrack("add_to_favorites_video")}}})}})};function addToFavorites(a){var b=new Date();b.setTime(b.getTime()+(20*60*1000));$.ajax({url:"/aplay.php",data:"fav=add&vid="+a,type:"GET",dataType:"text",success:function(c){var d=$(".fav");if(c=="0"){$.cookie(a,"fav",{domain:".hardsextube.com",expires:1});d.removeClass("add").addClass("remove").attr("title",_("Remove from favorites"));$(".fav DIV").addClass("remfavorite_btn");$(".fav SPAN").html(_("Remove from<br/>favorites"));GravityApi.event.favorite(d);d.data("eventType","remove")}if(c=="1"){$.cookie(a,null,{domain:".hardsextube.com"});d.removeClass("remove").addClass("add").attr("title",_("Add to favorites"));$(".fav DIV").addClass("addfavorite_btn");$(".fav SPAN").html(_("Add to<br/>favorites"));GravityApi.event.favorite(d);d.data("eventType","add")}if(c=="2"){openLoginModal({source:"add_to_favorites_video"});setGaTrackSourceToJoinBtn("add_to_favorites_video");pushGaLoginRegTrack("add_to_favorites_video")}}})}function remToFavorites(a){var b=new Date();b.setTime(b.getTime()+(20*60*1000));$.ajax({url:"/aplay.php",data:"fav=remove&vid="+a,type:"GET",dataType:"text",success:function(c){var d=$(".fav");if(c=="0"){$.cookie(a,"fav",{domain:".hardsextube.com",expires:1});d.removeClass("add").addClass("remove").attr("title",_("Remove from favorites"));$(".fav DIV").removeClass("addfavorite_btn").addClass("remfavorite_btn");$(".fav SPAN").html(_("Remove from<br/>favorites"));GravityApi.event.favorite(d);d.data("eventType","remove")}if(c=="1"){$.cookie(a,null,{domain:".hardsextube.com"});d.removeClass("remove").addClass("add").attr("title",_("Add to favorites"));$(".fav DIV").removeClass("remfavorite_btn").addClass("addfavorite_btn");$(".fav SPAN").html(_("Add to<br/>favorites"));GravityApi.event.favorite(d);d.data("eventType","add")}if(c=="2"){openLoginModal({source:"add_to_favorites_video"});setGaTrackSourceToJoinBtn("add_to_favorites_video");pushGaLoginRegTrack("add_to_favorites_video")}}})}jQuery.fn.reportBtn=function(a){(this).click(function(){var b=$(a).find("[name='message']");if($.trim(b.val())===""){b.css("border","1px solid red");return false}b.css("border","0 none");var c=$(c).clientInfoGenrate();$("#reportForm").append(c);$.post(globalVars.www_subdomain+"/contact.php",$(a).serialize(),function(e){if(e=="needCaptcha"){$("#messagetext").hide();$("#msg p").hide();Recaptcha.create("6LdUUAYAAAAAAL2ZvfQIFUeSR9Z6xUoGPNpeysKk","recaptchaDiv",{theme:"blackglass",callback:Recaptcha.focus_response_field});setTimeout(function(){$("#recaptcha_response_field").keypress(function(g){var f;if(g.keyCode){f=g.keyCode}else{if(g.which){f=g.which}}if(f==13){return false}})},500);return false}if(e=="wrongCaptcha"){Recaptcha.reload();Recaptcha.focus_response_field();return false}$(a).hide();if(e=="1"){$(a).parent().append("<span class='msg'>"+_("Your message has sent. Thank you.")+"</span>")}else{$(a).parent().append("<span class='msg'>"+_("Fuck! Something wrong! Try it later!")+"</span>")}var d=setTimeout(function(){$("#recaptchaDiv").html("");$("#messagetext").show();$("#msg p").show();$(a).parent().find(".msg").hide();$(a).show()},4000)})})};function createCaptcha(b){var a=document.getElementById(b);if(a){a.innerHTML="";Recaptcha.create("6LdUUAYAAAAAAL2ZvfQIFUeSR9Z6xUoGPNpeysKk",b,{theme:"blackglass",callback:Recaptcha.focus_response_field});a.rel="created";return true}return false}$(document).ready(function(){if(location.hash.match("commentsBlock")!==null){$("a[name=commentsBlock]").mouseenter().click()}});$(document).on("click","#commentSendBlock button",function(d){d.preventDefault();if(!isLoggedIn()){$("#loginFormItems input[name=commentValueTmp]").val($("#commentSendBlock textarea[name=message]").val());openLoginModal({source:"send_comment_btn"});setGaTrackSourceToJoinBtn("send_comment_btn");pushGaLoginRegTrack("send_comment_btn");return false}var f=$("#commentSendBlock textarea").val();if($.trim(f).length>0){var a=$("#commentsBlock").attr("data-id");var e=($.isEmptyObject($(".comment .details span").first().attr("data-date")))?null:$(".comment .details span").first().attr("data-date");var c=($.isEmptyObject($("#recaptcha_response_field").val()))?null:$("#recaptcha_response_field").val();var b=($.isEmptyObject($("#recaptcha_challenge_field").val()))?null:$("#recaptcha_challenge_field").val();$.post(DOMAIN+"/api.php",{data:JSON.stringify({id:a,type:"addComment",commentType:"VIDEO",lastTime:e,message:$.trim(f),captchaResponse:c,captchaChallenge:b})},function(g){var g=$.parseJSON(g);if(g.initCaptcha===true){createCaptcha("reCaptcha")}else{$("#reCaptcha").hide()}if(g.failedCaptcha===true){$("#captchaError").show()}else{$("#captchaError").hide()}GravityApi.event.commentVideo(f,$("#commentsBlock"));if(g.comments.length<1){return false}if(g.isMore===true){$("#moreCommentsBtn").show()}else{$("#moreCommentsBtn").hide()}fetchTplAJAX(DOMAIN+"/static/js/tpls/videoComment.htpl",g,function(h){$("#commentSendBlock").after(h)});$("#commentSendBlock textarea").val("");$("#recaptcha_response_field").val("");$("#recaptcha_challenge_field").val("")},"json")}});$(document).on("click","#moreVideoComments",function(b){b.preventDefault();var a=$("#commentsBlock").attr("data-id");var c=($.isEmptyObject($(".comment .details span").last().attr("data-date")))?null:$(".comment .details span").last().attr("data-date");$.post(DOMAIN+"/api.php",{data:JSON.stringify({id:a,type:"getMoreComments",commentType:"VIDEO",lastTime:c})},function(d){var d=$.parseJSON(d);if(d.isMore===true){$("#moreVideoComments").show()}else{$("#moreVideoComments").hide()}fetchTplAJAX(DOMAIN+"/static/js/tpls/videoComment.htpl",d,function(e){$("#moreVideoComments").before(e)})},"json")});jQuery.fn.showPage=function(){var a=$(this).parent().parent().find(".active").attr("data-href");$(a).show();$(this).children().find("A").click(function(){a=$(this).parent().parent().find(".active").attr("data-href");$(this).parent().parent().find(".active").removeClass("active");var b=$(this).attr("data-href");$(this).addClass("active");$(a).hide();$(b).show()})};var TabbedContent={init:function(c,b){var a=$(".tab_item_movingbg").position()["left"];$(c).show();$(b).addClass("activetab");$(".tab_item_movingbg").css("left",$(b).position()["left"]);$(".tab_item A").mouseover(function(){$(".tab_item_movingbg").delay(300).animate({left:$(this).position()["left"]},{duration:300})}).click(function(){var d=$(this).attr("id");var e=$(this).attr("class");a=$(".tab_item_movingbg").position()["left"];$(this).parent().parent().find("A").removeClass("activetab");$(this).addClass("activetab");$(".hide.tabbed_content").hide();$(d).show();if($(this).hasClass("snapshots")){$(d+" SPAN").each(function(){var f=$(this).children("IMG");var g=f.attr("data-src");f.attr("src",g)})}}).mouseleave(function(){$(".tab_item_movingbg").stop(true,false)});$(".tabs_hover").mouseleave(function(){$(".tab_item_movingbg").animate({left:$(this).children().find(".activetab").position()["left"]},{duration:300})});$("#tab_share input").live("focus",function(){this.select()})}};var TabbedContent_tablet={init:function(b,a){$(b).show();$(a).addClass("activetab");$(".tab_item A").click(function(){var d=$(this),c=d.attr("id");d.parent().parent().find("A").removeClass("activetab");d.addClass("activetab");$(".hide.tabbed_content").hide();$(c).show();if(d.hasClass("snapshots")){$(c+" SPAN").each(function(){var e=$(this).children("IMG").data("src");$(this).children("IMG").attr("src",e)})}})}};jQuery.fn.slideButton=function(b,a,c){$(".tab_item").click(function(){var d;var f=$(this).attr("id");var e="gender";switch(f){case"filterStraight":d=0;e="gender";break;case"filterAll":d=90;e="gender";break;case"filterGay":d=180;e="gender";break;case"filterVp":d=0;e="preview";break;case"filterTb":d=57;e="preview";break;case"filterShort":d=0;e="duration";break;case"filterLong":d=57;e="duration";break}if(browserIsOldIE&&(f!="filterGay"&&f!="filterStraight"&&f!="filterAll")){d=d-27}if(browserIsOldIE&&(f=="filterGay"||f=="filterStraight"||f=="filterAll")){d=d-90}$(".moving_slide."+e).animate({left:d},{duration:100})})};function adhide(d,b){var a=$.cookie("hstadh");var c;if(typeof(a)=="undefined"||a==null){c={};c[d]=1}else{c=JSON.parse($.cookie("hstadh"));if(c[d]==null){c[d]=0}c[d]=1-c[d]}$.cookie("hstadh",JSON.stringify(c),{expires:7,path:"/",domain:".hardsextube.com"});if(c[d]!=1){location.reload()}else{$("."+d).slideUp("slow");$(b).html("&#8226; show banner &#8226;")}}$.fn.delaydelay=function(a,b){jQuery.fx.step.delay=function(){};return this.animate({delay:1},a,b)};function isLoggedIn(){if(!$.cookie("hstauth")){return false}return true}function exactPager(){var f=$("div.pager"),a=f.find("#pagesel span.npages a[href]"),b=f.find("form.exact_page"),e=null;if(typeof(exactGravityInit)!="undefined"&&exactGravityInit==false){if(b.size()>0){exactGravityInit=true}if(exactGravityInterval!==null&&exactGravityInit==true){clearInterval(exactGravityInterval);exactGravityInterval=null}else{return}}if(a.size()>1&&b.size()!=1){return}var d=(Math.floor(a.size()/2)),c=(typeof a[d]!="undefined"?$(a[d]):"");if(c==""){return}switch(true){case (c.attr("href").match(/page\=([0-9]+)/)!==null):e=true;break;default:case (c.attr("href").match(/\/([0-9])+$/)!==null):e=false;break}function g(j){if(j==undefined||j<=0){return""}var i=c.attr("href"),h="";if(e===false){h=i.split(new RegExp(/\b\/{1}/));h.pop();h=h.join("/")+"/"+j}else{h=i.replace(new RegExp(/([\?|\&]page\=)(\d)*/),"$1"+j)}return h}b.find("input").on("keyup",function(k){var j=$(this),h=0,i=parseInt(j.val());k.preventDefault();if(k.which==38){j.val(i+1)}if(k.which==40&&i>1){j.val(i-1)}if(k.keyCode){h=k.keyCode}else{if(k.which){h=k.which}}if(h==13&&i>0){location.href=g(i)}});b.find("button").on("click",function(j){var i=$(this),h=parseInt(i.prev("input[name=page]").val());if(h<1){return}location.href=g(h);j.preventDefault()})}$(document).ready(exactPager);function flvErrorLog(c,d,b,a){if(FlashDetect.installed){flashver=FlashDetect.major+"."+FlashDetect.minor}$.post(globalVars.www_subdomain+"/vidii_log.php",{data:JSON.stringify({vid:c,url:d,flashver:flashver,errorcode:b,loader:a,referer:window.location.href})},function(e){},"json");return true}function rightmenuClick(a){$("body").impressionLog("vidiiPlayer_rightclick_"+a)}function onPlayAdError(){$("body").impressionLog("adxVidii_xmlError")}function clicklog(a){$("body").impressionLog("vidii_"+a)}function floaterClick(a){$("body").impressionLog("adxVidii_openAd");$("body").impressionLog("adxVidii_openAd_"+a)}function floaterImpression(a){$("body").impressionLog("adxVidii_impression_inVidii");$("body").impressionLog("adxVidii_impression_inVidii_"+a)}function redditClick(){$("body").impressionLog("redditClick");window.open("http://reddit.com/submit?url="+encodeURIComponent(window.location),"_blank");return false}function twitterClick(){$("body").impressionLog("twitterClick");window.open("http://api.addthis.com/oexchange/0.8/forward/twitter/offer?url="+encodeURIComponent(window.location),"_blank");return false}function playIpadVideo(d){var c=getWhereIAm();var a=d.attr("data-href");var b=d.attr("data-img");if(!a){return false}$.post(c+"/getIpadVidiiUrl.php",{data:JSON.stringify({vid:a})},function(g){var e=_("We noticed you don't have Flash installed or rather your browser don't support HTML5 video player.");if($.browser.safari==true){e+="<br>"+_("Safari requires quicktime in order to play our videos.")}var f='<video class="player-html5" autobuffer controls poster="'+b+'"  id="videodiv" src="'+g.flv+'"';f+='width="640" height="480" onended="showPostrollAd()"  stíle="display: inline;" ';f+='tabindex="0" ><source src="'+g.flv+'"><div class="player_error"><p>'+e+"</p></div></video>";d.append(f);$("#videodiv").attr("src",g.flv);$("#videodiv")[0].load();GravityApi.event.startVideoPlayerCallback(a)},"json");return true}function showPostrollAd(){if(!onTablet){return false}var b=encodeURI($("#title").html());var a;$.get("http://www.adultmoda.com/ads/multi_fetch.php?tz=10567&bz=10569&nb=1&nt=1&k=MyTitle&l=en-US&v=11&format=json&callback=?",{},function(e){a=e;for(var d=0;d<e.length;d++){ad=e[d];if(ad.imageUrl==""||typeof(ad.imageUrl)==="undefined"){var c=$("<a></a>",{href:ad.targetLink,target:"_blank",rel:"external"}).append(ad.adText);$("#adultmoda_postroll_ad .ad_text")[0].innerHTML="";$("#adultmoda_postroll_ad .ad_text").append(c);$("#adultmoda_postroll_ad .ad_text").show()}else{var c=$("<a></a>",{href:ad.targetLink,target:"_blank",rel:"external"}).append($("<img/>",{src:ad.imageUrl}));$("#adultmoda_postroll_ad .banner")[0].innerHTML="";$("#adultmoda_postroll_ad .banner").append(c);$("#adultmoda_postroll_ad .banner").show()}}$("#adultmoda_postroll_ad .banner").find("IMG").error(function(){$("#adultmoda_postroll_ad .banner").hide();$("#adultmoda_postroll_ad .control_button").css("margin-top","60px");$("#adultmoda_postroll_ad .ad_text.noIpad").css("margin-top","90px")});$(".player-html5").hide();$("#adultmoda_postroll_ad").show()},"json")}$(document).on("click",".remove-adverts-btn",function(a){a.preventDefault();if(isVIP!==true){return}$.cookie("adsRemoved",1,{expires:1});location.reload()});$(document).on("click",".show-adverts-btn",function(a){a.preventDefault();if($(this).hasClass("be-vip")){return}$.cookie("adsRemoved",1,{expires:-1});location.reload()});$(document).on("webkitAnimationEnd","ul.subnav",function(){var a=$("#flvAnyad");a.css({position:"relative","z-index":(!a.css("z-index")||a.css("z-index")==0?1:0)})});if(!Modernizr.generatedcontent){$(window).on("load resize",function(){var b=$(".hasExistsPermission");if(b.length<1){return}var d=b.not("> .permOverlay");if(d.length>0){var a="<div class='permOverlay' />";d.append(a)}var c=b.find("> .permOverlay");c.each(function(){var e=$(this).parent(".hasExistsPermission");$(this).css({width:e.width(),height:e.height()})})})}$(document).on("click","#video-download-button",function(a){var b=$(this);if(b.hasClass("needlogin")){return}GravityApi.event.downloadVideo(b)});function getFlashMovie(b){var a=navigator.appName.indexOf("Microsoft")!=-1;return(a)?window[b]:document[b]};