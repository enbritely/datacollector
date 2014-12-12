function LinkGenerator() {}
LinkGenerator.update_banner_handler = function() {
	return '/ajax/update_banner_handler.php';
};
LinkGenerator.member_fav_sets = function() {
	return '/ajax/member_fav_sets.php';
};
LinkGenerator.member_fav_models = function() {
	return '/ajax/member_fav_models.php';
};
LinkGenerator.model_comments = function() {
	return '/ajax/gel_all_model_comments.php';
};
LinkGenerator.search_model_content = function() {
	return '/ajax/searchBy.php';
};
LinkGenerator.advanced_search_cont = function() {
	return '/ajax/searchByAdvanced.php'; 
};
LinkGenerator.get_render_tpl = function(tpl) {
	return '/tpl/'+tpl+'.php';
};
LinkGenerator.get_jsview_tpl = function(tpl) {
	return '/tpl/'+tpl;
};
/* ------------------------------------------------------------------------------- JSVIEW HANDLER */
function JSViewHandler() {
	var tpl_cache = {};

	if (arguments.callee.instance) {
		return arguments.callee.instance;
	}
	arguments.callee.instance = this;

	this.get = function(prm) {
		for (var i in prm.data.templates) {
			if (typeof tpl_cache[prm.data.templates[i]] !== 'undefined') {
				delete prm.data.templates[i];
			}
		}
		$.ajax({
			'dataType': 'json',
			'url'     : prm.url,
			'method'  : 'post',
			'data'    : prm.data
		}).done(function(response) {
			for (var i in response.templates) {
				if (typeof tpl_cache.i === 'undefined') {
					var json = {};
					json[i] = response.templates[i];
					$.extend(tpl_cache, json);
				}
			}
			prm.callback(response, tpl_cache);
		});
	};
};
JSViewHandler.getInstance = function() {
	return new JSViewHandler();
};

var History = window.History;
function loadSearchResult(mod,page,type) {
        var result_new = $('div#search_result_new');
        var updates_title = $('.updates-title');
        var jsvh = JSViewHandler.getInstance();
        var templates = '';
        if (type == 'model') {
            templates = 'search_model';
        } else if(type == 'scene') {
            templates = 'search_scene';
        } else {
            templates = 'search_free_word';
            /*result_new = $('div#content');
            $( "#sidebar-w273" ).remove();*/
        }
        jsvh.get({
                'url' : LinkGenerator.search_model_content(),
                'data': {
                        'templates': [templates],
                        'type': type,
                        'mod': mod,
                        'page': page
                },
                'callback': function(rsp, templates) {
                        var htmlOutput = '';
                        if (type == 'model') {
                            htmlOutput = $.templates(templates.search_model).render(rsp);
                        } else if (type == 'scene'){
                            htmlOutput = $.templates(templates.search_scene).render(rsp);
                        } else {
                            htmlOutput = $.templates(templates.search_free_word).render(rsp);
                        }
                        result_new.html(htmlOutput);
                        //updates_title.html('rsp.searchByText');
                        updates_title.html(rsp.searchByText);
                        
                        /*pagination*/
                        $('.search_model_a1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        
                        $('.search_sets_a1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                }
        });
};

function pagination(this_, type) {
        //History = window.History;
        var State = History.getState();
        if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
        if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
        if (typeof State.data.websites === 'undefined') State.data.websites = "all";
        if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
        if (typeof State.data.sb === 'undefined') State.data.sb = "general";
        if (typeof State.data.tf === 'undefined') State.data.tf = "all";
        if (typeof State.data.mf === 'undefined') State.data.mf = "all"; 
        if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
        
        var page = $(this_).attr('title');
        if (typeof State.data.pagination === 'undefined') State.data.pagination = page;
        
        if (type == 'model') {
            var mod = {sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:State.data.sf};
            History.pushState({sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "",
                "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
        } else {
            var mod = {searchby:State.data.searchby,
                       datefilter:State.data.datefilter,
                       websites:State.data.websites,
                       tagfilter:State.data.tagfilter};
           History.pushState({searchby:State.data.searchby,
                            datefilter:State.data.datefilter,
                            websites:State.data.websites,
                            tagfilter:State.data.tagfilter,
                            pagination:page},
                        "",
              "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
        }
		
		$('html, body').animate({
			scrollTop: $(".title-buttons").offset().top
		}, 500);
}

function show_matching_tags(word) {
        var result = $('div.free_word_result_container');
        
        //result.fadeIn();
        
        var jsvh = JSViewHandler.getInstance();
        var template = 'tag_results';
        
        jsvh.get({
			'url' : LinkGenerator.search_model_content(),
            'data': {
	            'templates': [template],
                    'word': word,
                    'type': 'search_tags'
                    },
                    'callback': function(rsp) {
                    var htmlOutput = $.templates(rsp.tpl).render(rsp.data);
                            result.html(htmlOutput);
                    }
             });
}

function getAdvancedSearchContent(part,state_data_tagfilter) {
        var jsvh = JSViewHandler.getInstance();
        
		if (part == 'scenepart') {
			var type = 'advancedSearchScene';
			var template = 'advanced_search';
		} else {
			var type = 'advancedSearchModel';
			var template = 'advanced_search_model';
		}
		
        jsvh.get({
            'url' : LinkGenerator.advanced_search_cont(),
            //'url' : '/ajax/searchByAdvanced.php',
            'data': {
                    'templates': [template],
					'tagfilter': state_data_tagfilter,
                    'type': type
             },
			'callback': function(rsp,templates) {
					var htmlOutput = $.templates(templates[template]).render(rsp);
					
					$.fancybox2.open({
						   fitToView  : false,
						   width      : '960px',
						   height     : '700px',
						   padding    : 10,
						   autoSize   : false,
						   closeClick : false,
						   openEffect : 'none',
						   closeEffect: 'none',
						   content    : htmlOutput
					 });
             }
         });
}

function search_keyword(word, tag) {
	// removed - not in use ...
	return false;
	
	$('div.free_word_result_container').fadeOut();
	$('.free_word_search_input').val(tag);
	
	
	
	var html = '<span class="tags_active_text">'+tag+'</span>';	
	$('#search_tag_active').append(html);
	
	var State = History.getState();
	if (typeof State.data.searchby == 'undefined') State.data.searchby = "general";
	if (typeof State.data.datefilter == 'undefined') State.data.datefilter = "all";
	if (typeof State.data.websites == 'undefined') State.data.websites = "all";
        if (typeof State.data.tagfilter == 'undefined') State.data.tagfilter = word;
        if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
	
	var eachTextBoxContent = word;

	var state_url = "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+State.data.pagination+""

	window.location = '/tour-search-scene.php'+state_url;

        var state_data_pagination = State.data.pagination;
    var mod = { searchby : State.data.searchby, datefilter : State.data.datefilter,
                        websites : State.data.websites, tagfilter : eachTextBoxContent}
	History.pushState(mod, "", state_url);
	loadSearchResult(mod,state_data_pagination,'scene');	
}


/*History Js*/
//$(function(){

jQuery(document).ready(function() {
    History = window.History;
    $(".keyword-list").hide();
    $("#scenes-tag-filter").hide();
    
    if (History.enabled) {
        // Log Initial State
        var State = History.getState();
        var type = ""; // model or scene
        var mod = '';
        //History.pushState({urlPath: window.location.pathname}, $("title").text(), State.urlPath);
        //History.log('initial:', State.data, State.title, State.url);

        History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
            var State = History.getState();
            if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
            if (typeof State.data.sb !== 'undefined' &&
                typeof State.data.tf !== 'undefined' &&
                typeof State.data.mf !== 'undefined' &&
                typeof State.data.sf !== 'undefined') {
                    var page = State.data.pagination;
                    mod = {sb:State.data.sb,
                           tf:State.data.tf,
                           mf:State.data.mf,
                           sf:State.data.sf};
                    type = "model";
                    loadSearchResult(mod,page,type);
                }
                else 
                if (typeof State.data.searchby !== 'undefined' &&
                    typeof State.data.datefilter !== 'undefined' &&
                    typeof State.data.websites !== 'undefined' &&
                    typeof State.data.tagfilter !== 'undefined') {
                        var page = State.data.pagination;
                        mod = {searchby:State.data.searchby,
                               datefilter:State.data.datefilter,
                               websites:State.data.websites,
                               tagfilter:State.data.tagfilter};
                        type = "scene";
                        loadSearchResult(mod,page,type);
                }
            //History.log('statechange:', State.data, State.title, State.url); 
        });

        History.Adapter.onDomLoad(function(){
            var State = History.getState();
            //MODEL PART:
            if (typeof State.data.sb === 'undefined' &&
                typeof State.data.tf === 'undefined' &&
                typeof State.data.mf === 'undefined' &&
                typeof State.data.sf === 'undefined') {
                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                //History.pushState({sb:'recent',tf:'all',mf:'all',sf:'girls'}, "", "?/sb=recent/tf=all/mf=all/sf=girls");
                    //SCENE PART:
                    if (typeof State.data.searchby === 'undefined' &&
                    typeof State.data.datefilter === 'undefined' &&
                    typeof State.data.websites === 'undefined' &&
                    typeof State.data.tagfilter === 'undefined') {
                        //something went wrong in this part
                    } else {
                        if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                        var page = State.data.pagination;
                        //var page = 1;
                        mod = {searchby:State.data.searchby,
                               datefilter:State.data.datefilter,
                               websites:State.data.websites,
                               tagfilter:State.data.tagfilter};
                        type = "scene";
                        
                        var state_data_tagfilter = State.data.tagfilter;
                        
                        /*
                        if (state_data_tagfilter != "all") {
                            var dataTagFilter = State.data.tagfilter;
                            var dataTagFilterArray=dataTagFilter.split("-");
                            var dataTagFilterArrayLength = dataTagFilterArray.length-1;
                            for (var i = 0; i < dataTagFilterArrayLength; i++) {
                                dataTagFilterArray[i]=dataTagFilterArray[i].replace(" ","_");
                                var pushContent = '<span class="search_tag_active_text">'+dataTagFilterArray[i]+'</span>';
                                $("#tags-filter .search_tag_active").append(pushContent);
                            }
                        }*/
                        
                        /*
                        var state_data_websites = State.data.websites;
                        if (state_data_websites != "all") {
                            var dataWebsites = State.data.websites;
                            var dataWebsitesArray=dataWebsites.split("-");
                            var dataWebsitesArrayLength = dataWebsitesArray.length-1;
                            for (var i = 0; i < dataWebsitesArrayLength; i++) {
                                dataWebsitesArray[i]=dataWebsitesArray[i].replace(" ","_");
                                var pushContent = '<span class="websites_active_text">'+dataWebsitesArray[i]+'</span>';
                                $("#websites-filter .search_tag_active").append(pushContent);
                            }
                        }*/
                        
                        $(".search_tag_active_text").click(function(event) {
                                event.stopPropagation();
                                var State = History.getState();
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".search_tag_active_text" ).each(function() {
                                    eachTextBoxContent += $(this).text()+'-';
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({searchby:State.data.searchby,
                                                   datefilter:State.data.datefilter,
                                                   websites:State.data.websites,
                                                   tagfilter:eachTextBoxContent,
                                                   pagination:State.data.pagination},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+page+"");
                        });
                        loadSearchResult(mod,page,type);
                    }
            }
            else {
                var State = History.getState();
                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                var page = State.data.pagination;
                //var page = 1;
                mod = {sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:State.data.sf};
                type = "model";
                var state_data_tf = State.data.tf;
                
                /*
                if (state_data_tf != "all") {
                    var dataTagFilter = State.data.tf;
                    var dataTagFilterArray=dataTagFilter.split("-");
                    var dataTagFilterArrayLength = dataTagFilterArray.length-1;
                    for (var i = 0; i < dataTagFilterArrayLength; i++) {
                        dataTagFilterArray[i]=dataTagFilterArray[i].replace(" ","_");
                        var pushContent = '<span class="search_tag_active_text">'+dataTagFilterArray[i]+'</span>';
                        $(".search_tag_active").append(pushContent);
                    }
                }*/
                
                var dataModelFilter = State.data.mf;
                if (dataModelFilter != "all") {
                    var dataModelFilterArray=dataModelFilter.split("-");
                    if (dataModelFilterArray[0] == 'mf') {
                        $('#model_name').val(dataModelFilterArray[1]);
                    }
                }

                $(".search_tag_active_text").click(function(event) {
                    event.stopPropagation();
                    $(this).remove();
                    var eachTextBoxContent = "";
                    $( ".search_tag_active_text" ).each(function() {
                        eachTextBoxContent += $(this).text()+'-';
                        eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                        eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                    });
                    eachTextBoxContent=eachTextBoxContent.toLowerCase();
                    if (eachTextBoxContent == "") eachTextBoxContent = "all";
                    var State = History.getState();
                    History.pushState({sb:State.data.sb,tf:eachTextBoxContent,mf:State.data.mf,sf:State.data.sf,pagination:State.data.pagination}, "", 
                                    "?/sb="+State.data.sb+"/tf="+eachTextBoxContent+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                });
                loadSearchResult(mod,page,type);
            }
            //console.log('default state loaded');
            //var State = History.getState();

            //START of MODEL part
            
            //END of MODEL part
            
            //START of MODEL part
            $('a.nav-button').click(function(event) {
                event.stopPropagation();
				event.preventDefault();
                var State = History.getState();
                if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                if (typeof State.data.mf === 'undefined') State.data.mf = "all"; 
                if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                
                if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                
                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                //var page = State.data.pagination;
                var page = 1;
                
                var thisText = $(this).attr('data-name');
                thisText = $.trim(thisText);
                var switchModifierText = '';
                switch(thisText) {
                    case "rated":
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'general';
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'rated';
                      }
                      History.pushState({searchby:switchModifierText,
                                         datefilter:State.data.datefilter,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page}, 
                                     "",
                                     "?/searchby="+switchModifierText+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      break;
                    case "viewed":
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'general';
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'viewed';
                      }
                      History.pushState({searchby:switchModifierText,
                                         datefilter:State.data.datefilter,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page}, 
                                     "",
                                     "?/searchby="+switchModifierText+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      
                      break;
                    case "randomizer":
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'general';
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'randomizer';
                      }
                      History.pushState({searchby:switchModifierText,
                                         datefilter:State.data.datefilter,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page}, 
                                     "",
                                     "?/searchby="+switchModifierText+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      break;
                    case "recent_scene":
                      //$('#gender-filter a.nav-button.active').removeClass('active');
                      //$(this).addClass('active');
                      $(".years li a.active").removeClass('active');
                      $(".months li a.active").removeClass('active');
                      
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'all';
                      } else {
                          $('#gender-filter a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'recent';
                      }
                      History.pushState({searchby:State.data.searchby,
                                         datefilter:switchModifierText,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page},
                                     "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+switchModifierText+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      break;
                    case "month":
                      //$('#gender-filter a.nav-button.active').removeClass('active');
                      //$(this).addClass('active');
                      $(".years li a.active").removeClass('active');
                      $(".months li a.active").removeClass('active');
                      
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'all';
                      } else {
                          $('#gender-filter a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'month';
                      }
                      History.pushState({searchby:State.data.searchby,
                                         datefilter:switchModifierText,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page},
                                     "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+switchModifierText+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      break;
                    case "year":
                      //$('#gender-filter a.nav-button.active').removeClass('active');
                      //$(this).addClass('active');
                      $(".years li a.active").removeClass('active');
                      $(".months li a.active").removeClass('active');
                      
                      if ( $(this).hasClass("active") ) {
                          $(this).removeClass('active');
                          switchModifierText = 'all';
                      } else {
                          $('#gender-filter a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          switchModifierText = 'year';
                      }
                      History.pushState({searchby:State.data.searchby,
                                         datefilter:switchModifierText,
                                         websites:State.data.websites,
                                         tagfilter:State.data.tagfilter,
                                         pagination:page},
                                     "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+switchModifierText+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                      break;
                    case "recent_model":
                      if ($(this).hasClass("active")) {
                          $(this).removeClass('active');
                          History.pushState({sb:'general',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=general/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          History.pushState({sb:'recent',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=recent/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      }
                      break;
                    case "popularity":
                      if ($(this).hasClass("active")) {
                          $(this).removeClass('active');
                          History.pushState({sb:'general',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=general/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          History.pushState({sb:'popularity',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=popularity/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      }
                      break;
                    case "scenes":
                      if ($(this).hasClass("active")) {
                          $(this).removeClass('active');
                          History.pushState({sb:'general',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=general/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      } else {
                          $('#options a.nav-button.active').removeClass('active');
                          $(this).addClass('active');
                          History.pushState({sb:'scenes',tf:State.data.tf,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb=scenes/tf="+State.data.tf+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                      }
                      break;
                    case "girls":
                      $('#gender-filter a.nav-button.active').removeClass('active');
                      $(this).addClass('active');
                      History.pushState({sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:'girls',pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf="+State.data.mf+"/sf=girls/"+page+"");
                      break;
                    case "guys":
                      $('#gender-filter a.nav-button.active').removeClass('active');
                      $(this).addClass('active');
                      History.pushState({sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:'guys',pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf="+State.data.mf+"/sf=guys/"+page+"");
                      break;
                    case "girlsandguys":
                      $('#gender-filter a.nav-button.active').removeClass('active');
                      $(this).addClass('active');
                      History.pushState({sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:'girlsandguys',pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf="+State.data.mf+"/sf=girlsandguys/"+page+"");
                      break;
                    default:
                      var State = History.getState();
                      var mod = {sb:State.data.sb,tf:State.data.tf,mf:State.data.mf,sf:State.data.sf};
                }
            });
            
            $('a.nav-letter').click(function(event) {
                event.stopPropagation();
				event.preventDefault();
                var State = History.getState();
                if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                if (typeof State.data.mf === 'undefined') State.data.mf = "all";
                if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                var page = 1;
                
                $('#model_name').val('');
                var thisText = $(this).text();
                thisText = $.trim(thisText);
                switch(thisText) {
                    case "All":
                      $('a.nav-letter.active').removeClass('active');
                      $(this).addClass('active');
                      History.pushState({sb:State.data.sb,tf:State.data.tf,mf:'all',sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf=all/sf="+State.data.sf+"/"+page+"");
                      break;
                    default:
                      if ($(this).hasClass("active")) {
                          $(this).removeClass('active');
                          $('a.nav-letter').each(function (){
                              if ($(this).text() == 'All') {
                                  $(this).addClass('active');
                              }
                          });
                          History.pushState({sb:State.data.sb,tf:State.data.tf,mf:'all',sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf=all/sf="+State.data.sf+"/"+page+"");
                      } else {
                          $('a.nav-letter.active').removeClass('active');
                          $(this).addClass('active');
                          var text = $(this).text().toLowerCase();
                          History.pushState({sb:State.data.sb,tf:State.data.tf,mf:'white-'+text,sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf=white-"+text+"/sf="+State.data.sf+"/"+page+"");
                      }
                }
            });
            
            function advanced_btn(event, part) {
                event.stopPropagation();
				event.preventDefault();
                 var State = History.getState();
                 if (part == 'scenepart') {
                    if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                    if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                    if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                    if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                    var state_data_tagfilter = State.data.tagfilter;
                 } else {
                    if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                    if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                    if (typeof State.data.mf === 'undefined') State.data.mf = "all";
                    if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                    var state_data_tagfilter = State.data.tf;
                 }
                 var page = 1;
                
                 /*
                 $('.keywordsWithParent_group input:checked').each(function() {
                    $(this).attr("checked", false);
                 });
                 
                 if (state_data_tagfilter != "all") {
                    var state_data_tagfilter_split = state_data_tagfilter.split("-");
                    var matchedValues = '';
                    for (var i = 0; i < state_data_tagfilter_split.length; i++) {
                        $('.keywordsWithParent_group input').each(function() {
                            var inputValue = $(this).val().toLowerCase();
                            var tagfilterValue = state_data_tagfilter_split[i].replace("_"," ");
                            if (tagfilterValue === inputValue) {
                                matchedValues += inputValue+'-';
                                $(this).attr('checked', true);
                            }
                        });
                    }
                 }*/
                 
                 //var content = $(".keywordsWithParent").html();
                 var content = getAdvancedSearchContent(part,state_data_tagfilter);
                 //$(".keywordsWithParent").html(content);*/

            }
            
            function advanced_btn_applyFilters(event, part) {
                event.stopPropagation();
                var State = History.getState();
                
                if (part == 'scenepart') {
                    if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                    if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                    if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                    if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                } else {
                    if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                    if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                    if (typeof State.data.mf === 'undefined') State.data.mf = "all";
                    if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                }
                var page = 1;
                
                var mapValues = '';
                mapValues = $('.keywordsWithParent_group input:checked').map(function() {
                    return this.value;
                }).get().join('-');
                
                var pushContentArray=mapValues.split("-");
                for (var i = 0; i < pushContentArray.length; i++) {
                    var first = pushContentArray.indexOf(pushContentArray[i]);
                    var last  = pushContentArray.lastIndexOf(pushContentArray[i]);
                    if (first != -1 && first != last) {
                         pushContentArray.splice(last, 1);
                    }
                }
                
                //console.log('pushContentArray: '+pushContentArray);
                
                $('.keywordsWithParent_group input:checked').each(function() {
                    $(this).attr("checked", false);
                });
                $.fancybox2.close();
                
                var pushContent = '';
                mapValues = '';
                if(pushContentArray.length > 0){
                    for (var i = 0; i < pushContentArray.length; i++) {
                        if (pushContentArray[i] != "" && pushContentArray[i] != "-") {
                            if (part == 'scenepart') {
                                pushContent += '<span class="tags_active_text">'+pushContentArray[i]+'</span>';
                            }  else {
                                pushContent += '<span class="search_tag_active_text">'+pushContentArray[i]+'</span>';
                            }
                        }
                        mapValues += pushContentArray[i]+'-';
                    }
                }
                
                for (var i = 0; i < pushContentArray.length; i++) {
                    mapValues=mapValues.split(' ').join('_');
                }
	
                $('#tags-filter .tags_active_text').each(function() {
                    $(this).remove();
                });
                
                $("#tags-filter .search_tag_active").text('');
                $("#tags-filter .search_tag_active").html(pushContent);
                
                mapValues=mapValues.toLowerCase();
                if (mapValues == "" || mapValues == "-") mapValues = "all";
                if (part == 'scenepart') {
                    History.pushState({searchby:State.data.searchby,
                                   datefilter:State.data.datefilter,
                                   websites:State.data.websites,
                                   tagfilter:mapValues,
                                   pagination:State.data.pagination},
                               "",
                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+mapValues+"/"+page+"");
                } else {
                    History.pushState({sb:State.data.sb,tf:mapValues,mf:State.data.mf,sf:State.data.sf,pagination:page}, "",
                     "?/sb="+State.data.sb+"/tf="+mapValues+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                }
                
                tags_active_text_remove(part);
            }
            
            function tags_active_text_remove(part) {
                if (part == 'scenepart') {
                    $(".tags_active_text").click(function(event) {
                       event.stopPropagation();
                       var State = History.getState();
                       $(this).remove();
                       var eachTextBoxContent = "";
                       $( ".tags_active_text" ).each(function() {
                           eachTextBoxContent += $(this).text()+'-';
                           eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                           eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                       });
                       eachTextBoxContent=eachTextBoxContent.toLowerCase();
                       if (eachTextBoxContent == "") eachTextBoxContent = "all";
                       History.pushState({searchby:State.data.searchby,
                                          datefilter:State.data.datefilter,
                                          websites:State.data.websites,
                                          tagfilter:eachTextBoxContent,
                                          pagination:page},
                                      "",
                            "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+page+"");
                    });
                } else {
                    $(".search_tag_active_text").click(function(event) {
                        var State = History.getState();
                        event.stopPropagation();
                        $(this).remove();
                        var eachTextBoxContent = "";
                        $( ".search_tag_active_text" ).each(function() {
                            eachTextBoxContent += $(this).text()+'-';
                            eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                            eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                        });
                        eachTextBoxContent=eachTextBoxContent.toLowerCase();
                        if (eachTextBoxContent == "") eachTextBoxContent = "all";
                        History.pushState({sb:State.data.sb,tf:eachTextBoxContent,mf:State.data.mf,sf:State.data.sf,pagination:page}, "",
                                        "?/sb="+State.data.sb+"/tf="+eachTextBoxContent+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                    });
                }
            }
            
            advanced_search_content();
            
            function advanced_search_content() {
                $(document).on('click', '#advanced_btn_applyFilters', function(event) {
                     advanced_btn_applyFilters(event, 'scenepart');
                });
                
                $(document).on('click', '#advanced_btn_applyFilters_modelpart', function(event) {
                     advanced_btn_applyFilters(event, 'modelpart');
                });

                $(document).on('click', '.advanced_btn', function(event) {
                     /*
                     $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                     });
                     $('.keywordsWithParent_group .keywordsWithParent_keyword.model').show();
                     $('.keywordsWithParent_group .clear').show();*/
                     $('.keywordsWithParent_group #advanced_btn_model').addClass('btn-success');
                     advanced_btn(event, 'scenepart');
                });
                
                $(document).on('click', '.advanced_btn_model', function(event) {
					event.preventDefault();
					/*
                     $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                     });
                     $('.keywordsWithParent_group .keywordsWithParent_keyword.modelpart').show();
                     $('.keywordsWithParent_group .clear').show();*/
                     $('.keywordsWithParent_group #advanced_btn_model').addClass('btn-success');
                     advanced_btn(event, 'modelpart');
                });

                $(document).on('click', '#advanced_btn_clear_all_filters', function(event) {
                    $('.keywordsWithParent_group input:checked').each(function() {
                        $(this).prop("checked", false);
                    });
                });

                $(document).on('click', '#advanced_btn_location', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.location').show();
                });

                $(document).on('click', '#advanced_btn_model', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.model').show();
                });

                $(document).on('click', '#advanced_btn_action', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.action').show();
                });
                
                $(document).on('click', '#advanced_btn_clothing', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.clothing').show();
                });
                
                $(document).on('click', '#advanced_btn_niche___style', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.niche___style').show();
                });
                
                $(document).on('click', '#advanced_btn_toys', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.toys').show();
                });
                
                $(document).on('click', '#advanced_btn_quality', function(event) {
                    $('.keywordsWithParent_group button').each(function() {
                        $(this).removeClass('btn-success');
                    });
                    $(this).addClass('btn-success');
                    $('.keywordsWithParent_group div').each(function() {
                        $(this).hide();
                    });
                    $('.keywordsWithParent_group .clear').show();
                    $('.keywordsWithParent_group .keywordsWithParent_keyword.quality').show();
                });
            }
            
            $('#model_name').keyup(function(e) {
                var State = History.getState();
                if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                if (typeof State.data.mf === 'undefined') State.data.mf = "all";
                if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                var page = 1;
                
                var keycode =  e.keyCode ? e.keyCode : e.which;
                var search = $(this).val();
                if(search.length >= 2) {
                    $('a.nav-letter.active').removeClass('active');
                    var text = $(this).val();
                    text=text.replace(" ","_");
                    text=text.toLowerCase();
                    History.pushState({sb:State.data.sb,tf:State.data.tf,mf:'mf-'+text,sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf=mf-"+text+"/sf="+State.data.sf+"/"+page+"");
                } else {
                    $('a.nav-letter.active').removeClass('active');
                    $('a.nav-letter').each(function (){
                        if ($(this).text() == 'All') {
                            $(this).addClass('active');
                        }
                    });
                    if(keycode == 8 || keycode == 46 || keycode == 32){
                        $('#model_name').val('');
                    }
                    History.pushState({sb:State.data.sb,tf:State.data.tf,mf:'all',sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf="+State.data.tf+"/mf=all/sf="+State.data.sf+"/"+page+"");
                }
            });

            $("#tags-filter input").click(function(event){
                    $(document).unbind("click");
                    //Model:
                    $(".keyword-list").show();
                    //Scene:
                    $("#tags-filter .item-list").show();
                    $("#tags-filter").bind('mouseout',function(){
                        $(document).bind("click",function(){
                            if (event.target.id != "tags-filter" || 
                                event.target.id != "tag-filter-input-visible") {
                                    $(".keyword-list").fadeOut();
                                    $("#tags-filter .item-list").fadeOut();
                                    advanced_search_content();
                                }
                        });
                    });
             });
             
             //only scene
             $("#website-filter input").click(function(event){
                    $(document).unbind("click");
                    $("#website-filter .item-list").show();
                    $("#website-filter").bind('mouseout',function(){
                        $(document).bind("click",function(){
                            if (event.target.id != "website-filter") {
                                    $("#website-filter .item-list").fadeOut();
                                    advanced_search_content();
                                }
                        });
                    });
             });
             
             $('#tag-filter-input-visible').keyup(function() {
                            var filter = $(this).val();
                            $(".keyword-list li").each(function() {
                                var match = $(this).text().search(new RegExp(filter, 'i'));
                                 if (match >= 0) {
                                    $(this).show();
                                 }
                                 else{
                                    $(this).hide();
                                 }
                            });
                            if(filter.length == 0) {
                                $(".keyword-list li").each(function() {
                                    $(this).show();
                                });
                            }
             });
             
             $('#tag-filter-input-visible-scene').keyup(function() {
                            var filter = $(this).val();
                            $("#tags-filter .item-list li").each(function() {
                                var match = $(this).text().search(new RegExp(filter, 'i'));
                                 if (match >= 0) {
                                    $(this).show();
                                 }
                                 else{
                                    $(this).hide();
                                 }
                            });
                            if(filter.length == 0) {
                                $("#tags-filter .item-list li").each(function() {
                                    $(this).show();
                                });
                            }
             });
             
             $('#website-input-visible-scene').keyup(function() {
                            var filter = $(this).val();
                            $("#website-filter .item-list li").each(function() {
                                var match = $(this).text().search(new RegExp(filter, 'i'));
                                 if (match >= 0) {
                                    $(this).show();
                                 }
                                 else{
                                    $(this).hide();
                                 }
                            });
                            if(filter.length == 0) {
                                $("#website-filter .item-list li").each(function() {
                                    $(this).show();
                                });
                            }
             });
             
             $(".clear_btn_tf").click(function(event) {
                 event.stopPropagation();
				 event.preventDefault();
                 $(".search_tag_active_text").each(function() {
                     $(this).remove();
                 });
                 var State = History.getState();
                 History.pushState({sb:State.data.sb,tf:'all',mf:State.data.mf,sf:State.data.sf,pagination:page}, "", "?/sb="+State.data.sb+"/tf=all/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
             });
             
             $(".clear_btn_website").click(function(event) {
                 event.stopPropagation();
				 event.preventDefault();
                 $("#website-filter .search_tag_active .websites_active_text").each(function() {
                     $(this).remove();
                 });
                 var State = History.getState();
                 History.pushState({searchby:State.data.searchby,
                                    datefilter:State.data.datefilter,
                                    websites:'all',
                                    tagfilter:State.data.tagfilter,
                                    pagination:page}, 
                                    "",
                                    "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites=all/tagfilter="+State.data.tagfilter+"/"+page+"");
             });
             
             $(".clear_btn_tags").click(function(event) {
                 event.stopPropagation();
				 event.preventDefault();
                 $("#tags-filter .search_tag_active .tags_active_text").each(function() {
                     $(this).remove();
                 });
                 var State = History.getState();
                 History.pushState({searchby:State.data.searchby,
                                    datefilter:State.data.datefilter,
                                    websites:State.data.websites,
                                    tagfilter:'all',
                                    pagination:page}, 
                                    "",
                                    "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter=all/"+page+"");
             });
             
             
             
             $(".keyword-list li").click(function() {
                            var State = History.getState();
                            if (typeof State.data.sb === 'undefined') State.data.sb = "general";
                            if (typeof State.data.tf === 'undefined') State.data.tf = "all";
                            if (typeof State.data.mf === 'undefined') State.data.mf = "all";
                            if (typeof State.data.sf === 'undefined') State.data.sf = "girls";
                            if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                            var page = 1;
                            
                            var insertedText = $(this).text();
                            $('#tag-filter-input-visible').val('');
                            $(".keyword-list li").each(function() {
                                    $(this).show();
                            });
                            var pushContent = '<span class="search_tag_active_text">'+insertedText+'</span>';
                            insertedText = $.trim(insertedText).toLowerCase();
                            if ($(".search_tag_active_text").text() == '') {
                                $(".search_tag_active").append(pushContent);
                            } else {
                                var isExistThatContent = '';
                                $(".search_tag_active_text").each(function() {
                                    var eachText = $(this).text();
                                    eachText = $.trim(eachText).toLowerCase();
                                    if (insertedText == eachText) {
                                        isExistThatContent += 'equal';
                                    }
                                });
                                if (isExistThatContent == '') $(".search_tag_active").append(pushContent);
                            }
                            $(".keyword-list").fadeOut();
                            var eachTextBoxContent = "";
                            $( ".search_tag_active_text" ).each(function() {
                                eachTextBoxContent += $(this).text()+'-';
                                eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                            });
                            eachTextBoxContent=eachTextBoxContent.toLowerCase();
                            History.pushState({sb:State.data.sb,tf:eachTextBoxContent,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", 
                                                "?/sb="+State.data.sb+"/tf="+eachTextBoxContent+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                            
                            $(".search_tag_active_text").click(function(event) {
                                var State = History.getState();
                                event.stopPropagation();
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".search_tag_active_text" ).each(function() {
                                    eachTextBoxContent += $(this).text()+'-';
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({sb:State.data.sb,tf:eachTextBoxContent,mf:State.data.mf,sf:State.data.sf,pagination:page}, "", 
                                                "?/sb="+State.data.sb+"/tf="+eachTextBoxContent+"/mf="+State.data.mf+"/sf="+State.data.sf+"/"+page+"");
                            });
                            
                            advanced_search_content();
             });

             $("#website-filter .item-list li").click(function() {
                            var State = History.getState();
                            if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                            if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                            if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                            if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                            if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                            var page = 1;
                 
                            var insertedText = $.trim($(this).text());
                            $('#website-input-visible-scene').val('');
                            $("#website-filter .item-list li").each(function() {
                                    $(this).show();
                            });
                            var pushContent = '<span value="'+$(this).attr("data-name")+'" class="websites_active_text">'
                                                +insertedText+'</span>';
                            
                            if ($(".websites_active_text").text() == '') {
                                $("#website-filter .search_tag_active").append(pushContent);
                            } else {
                                var isExistThatContent = '';
                                $(".websites_active_text").each(function() {
                                    var eachText = $(this).text();  
                                    eachText = $.trim(eachText);
                                    if (insertedText == eachText) {
                                        isExistThatContent += 'equal';
                                    }
                                });
                                if (isExistThatContent == '') $("#website-filter .search_tag_active").append(pushContent);
                            }
                            
                            $("#website-filter .item-list").fadeOut();
                            var eachTextBoxContent = "";
                            $( ".websites_active_text" ).each(function() {
                                eachTextBoxContent += $(this).attr("value")+'-';
                            });
                            eachTextBoxContent=eachTextBoxContent.toLowerCase();
                            History.pushState({searchby:State.data.searchby,
                                               datefilter:State.data.datefilter,
                                               websites:eachTextBoxContent,
                                               tagfilter:State.data.tagfilter,
                                               pagination:page}, 
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+eachTextBoxContent+"/tagfilter="+State.data.tagfilter+"/"+page+"");

                            $(".websites_active_text").click(function(event) {
                                var State = History.getState();
                                event.stopPropagation();
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".websites_active_text" ).each(function() {
                                    eachTextBoxContent += $(this).attr("value")+'-';
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({searchby:State.data.searchby,
                                                   datefilter:State.data.datefilter,
                                                   websites:eachTextBoxContent,
                                                   tagfilter:State.data.tagfilter,
                                                   pagination:page},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+eachTextBoxContent+"/tagfilter="+State.data.tagfilter+"/"+page+"");
                            });
                            
                            advanced_search_content();
             });
             
             $(".websites_active_text").click(function(event) {
                            event.stopPropagation();
                            var State = History.getState();
                            if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                            if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                            if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                            if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                            if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                            var page = 1;
                            
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".websites_active_text" ).each(function() {
                                    eachTextBoxContent += $(this).attr("value")+'-';
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({searchby:State.data.searchby,
                                                   datefilter:State.data.datefilter,
                                                   websites:eachTextBoxContent,
                                                   tagfilter:State.data.tagfilter,
                                                   pagination:page},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+eachTextBoxContent+"/tagfilter="+State.data.tagfilter+"/"+page+"");
             });
             
             $("#tags-filter .item-list li").click(function() {
                            var State = History.getState();                            
                            if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                            if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                            if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                            if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                            if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                            var page = 1;
                            
                            var insertedText = $.trim($(this).text());
                            $('#tag-filter-input-visible-scene').val('');
                            $("#tags-filter .item-list li").each(function() {
                                    $(this).show();
                            });
                            var pushContent = '<span class="tags_active_text">'+insertedText+'</span>';
                            
                            if ($(".tags_active_text").text() == '') {
                                $("#tags-filter .search_tag_active").append(pushContent);
                            } else {
                                var isExistThatContent = '';
                                $(".tags_active_text").each(function() {
                                    var eachText = $(this).text();  
                                    eachText = $.trim(eachText);
                                    if (insertedText == eachText) {
                                        isExistThatContent += 'equal';
                                    }
                                });
                                if (isExistThatContent == '') $("#tags-filter .search_tag_active").append(pushContent);
                            }
                            
                            $("#tags-filter .item-list").fadeOut();
                            var eachTextBoxContent = "";
                            $( ".tags_active_text" ).each(function() {
                                eachTextBoxContent += $(this).text()+'-';
                                eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                            });
                            eachTextBoxContent=eachTextBoxContent.toLowerCase();
                            History.pushState({searchby:State.data.searchby,
                                               datefilter:State.data.datefilter,
                                               websites:State.data.websites,
                                               tagfilter:eachTextBoxContent,
                                               pagination:page},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+page+"");

                            $(".tags_active_text").click(function(event) {
                                event.stopPropagation();
                                var State = History.getState();
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".tags_active_text" ).each(function() {
                                    eachTextBoxContent += $(this).text()+'-';
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({searchby:State.data.searchby,
                                                   datefilter:State.data.datefilter,
                                                   websites:State.data.websites,
                                                   tagfilter:eachTextBoxContent,
                                                   pagination:page},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+page+"");
                            });
                            
                           advanced_search_content();
             });
             
             $(".tags_active_text").click(function(event) {
                                event.stopPropagation();
                                var State = History.getState();
                                if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                                if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                                if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                                if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                                if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                                var page = 1;
                                
                                $(this).remove();
                                var eachTextBoxContent = "";
                                $( ".tags_active_text" ).each(function() {
                                    var thisText = $(this).text();
                                    thisText = $.trim(thisText);
                                    eachTextBoxContent += thisText+'-';
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                    eachTextBoxContent=eachTextBoxContent.replace(" ","_");
                                });
                                eachTextBoxContent=eachTextBoxContent.toLowerCase();
                                if (eachTextBoxContent == "") eachTextBoxContent = "all";
                                History.pushState({searchby:State.data.searchby,
                                                   datefilter:State.data.datefilter,
                                                   websites:State.data.websites,
                                                   tagfilter:eachTextBoxContent,
                                                   pagination:page},
                                               "",
                                     "?/searchby="+State.data.searchby+"/datefilter="+State.data.datefilter+"/websites="+State.data.websites+"/tagfilter="+eachTextBoxContent+"/"+page+"");
             });

             $("#scenes-tag-filter-visible").click(function(event){
                    $(document).unbind("click");
                    $("#scenes-tag-filter").show();
                    $("#scenes-tag-filter").bind('mouseout',function(){
                        $(document).bind("click",function(){
                            if (event.target.id != "scenes-tag-filter" || 
                                event.target.id != "scenes-tag-filter-input" ||
                                event.target.id != "scenes-tag-filter-text" ||
                                event.target.id != "scenes-tag-filter-text-smaller" ||
                                event.target.id != "scenes-tag-filter-grey-track") {
                                    $("#scenes-tag-filter").fadeOut();
                                }
                        });
                    });
             });
             
             $(".years li").click(function(event){
					event.preventDefault();
                    var State = History.getState();                            
                    if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                    if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                    if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                    if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                    var page = 1;
                    
                    $(".months li a.active").removeClass('active');
                    
                    var year = $(this).text();
                    var insertedText = year+'-all';
                    
                    if ($(this).find('a').hasClass('active')) {
                        $(".years li a.active").removeClass('active');
                        insertedText = 'all';
                        //$('div#gender-filter li:first-child a:first-child').addClass('active');
                    } else {
                        $(".years li a.active").removeClass('active');
                        $('div#gender-filter li a.nav-button').removeClass('active');
                        $(this).find('a').addClass('active');
                    }
                    
                    History.pushState({searchby:State.data.searchby,
                                datefilter:insertedText,
                                websites:State.data.websites,
                                tagfilter:State.data.tagfilter,
                                pagination:page},
                            "",
                           "?/searchby="+State.data.searchby+"/datefilter="+insertedText+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
             });
             
             $(".months li").click(function(event){
					event.preventDefault();
                    var State = History.getState();
                    if (typeof State.data.searchby === 'undefined') State.data.searchby = "general";
                    if (typeof State.data.datefilter === 'undefined') State.data.datefilter = "all";
                    if (typeof State.data.websites === 'undefined') State.data.websites = "all";
                    if (typeof State.data.tagfilter === 'undefined') State.data.tagfilter = "all";
                    if (typeof State.data.pagination === 'undefined') State.data.pagination = 1;
                    var page = 1;
                    
                    $('div#gender-filter li a.nav-button').removeClass('active');
                    
                    var year = '';
                    var month = $(this).text();
                    month = $.trim(month).toLowerCase();
                    
                    if ($(this).find('a').hasClass('active')) {
                        $(this).find('a').removeClass('active');
                        month = 'all';
                    } else {
                        $(".months li a.active").removeClass('active');
                        $(this).find('a').addClass('active');
                    }
                    
                    if ($('.years li a').hasClass('active')) {}
                    else {
                        $('.years').find('div:first-child li:first-child a').addClass('active');
                    }
                    
                    var state_data_datefilter = State.data.datefilter;
                    if (state_data_datefilter == 'undefined' || 
                        state_data_datefilter == 'all' || 
                        state_data_datefilter == 'recent' ||
                        state_data_datefilter == 'month' ||
                        state_data_datefilter == 'year') {
                        year = 2013;
                    } else {
                        var state_data_datefilter_split = state_data_datefilter.split("-");
                        year = state_data_datefilter_split[0];
                    }
                    
                    History.pushState({searchby:State.data.searchby,
                                datefilter:year+'-'+month,
                                websites:State.data.websites,
                                tagfilter:State.data.tagfilter,
                                pagination:page},
                            "",
                           "?/searchby="+State.data.searchby+"/datefilter="+year+'-'+month+"/websites="+State.data.websites+"/tagfilter="+State.data.tagfilter+"/"+page+"");
             });
            //END of MODEL part
            
            $('.free_word_search_input').keyup(function(e) {
                    var keycode =  e.keyCode ? e.keyCode : e.which;
                    var free_word = $(this).val();
                    var result = $('div.free_word_result_container');
                    
                    var submitted = false;
                    $("#free_word_search").submit(function(event) {
                        if (submitted == true) {
                            return;
                        }
                        event.preventDefault();
                        var input_value = $('.free_word_search_input').val();
                        input_value = input_value.toLowerCase();
                        var action = $(this).attr('action');
                        
                        if (action.length > 26) {
                            action = action.slice(0, action.lastIndexOf("?"));
                        }
                        
                        var action_url = action+'?freeword='+input_value;
                        
                        $(this).attr('action', action_url);
                        action = $(this).attr('action');
                        
                        submitted = true;
                        $(this).submit();
                    });

                    if(free_word.length >= 2) {
                        show_matching_tags(free_word);
                        result.fadeIn();
                    } else {
                        if(keycode == 8 || keycode == 46 || keycode == 32){
                            $('.free_word_search_input').val('');
                            result.fadeOut();
                            History.pushState({searchby:'general',
                                                   datefilter:'all',
                                                   websites:'all',
                                                   tagfilter:'all',
                                                   pagination:1},
                                               "",
                                     "?/searchby=general/datefilter=all/websites=all/tagfilter=all/1");
                        }
                    }
            });
            
            $('#free_word_search_image').click(function(e) {
                    var submitted = false;
                    $("#free_word_search").submit(function(event) {
                        if (submitted == true) {
                            return;
                        }
                        event.preventDefault();
                        var input_value = $('.free_word_search_input').val();
                        input_value = input_value.toLowerCase();
                        var action = $(this).attr('action');
                        
                        if (action.length > 26) {
                            action = action.slice(0, action.lastIndexOf("?"));
                        }
                        
                        var action_url = action+'?freeword='+input_value;
                        
                        $(this).attr('action', action_url);
                        action = $(this).attr('action');
                        
                        submitted = true;
                        $(this).submit();
                    });
            });
            
            $(".free_word_search_input").click(function(event){
                    var result = $('div.free_word_result_container');
                    $(document).unbind("click");
                    var free_word = $(this).val();
                    if(free_word.length >= 2) {
                        result.show();
                    }
                    $(this).bind('mouseout',function(){
                        $(document).bind("click",function(){
                            if (event.target.id != "free_word_results") {
                                    result.fadeOut();
                                    advanced_search_content();
                                }
                        });
                    });
             });
             
             /*pagination*/
                        $('.search_model_a1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_a4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                        $('.search_model_s4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'model');
                        });
                    
                    
                    
                    
                    
                    
                    
                    
                        $('.search_sets_a1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_a4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s1').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s2').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s3').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        $('.search_sets_s4').click(function(e) {
							e.preventDefault();
                            pagination(this, 'scene');
                        });
                        
                        
                        
              /*pagination*/
             
             //advanced search popup
             
             
         });
    }
    else {
        return false;
    }
});
/*History Js*/