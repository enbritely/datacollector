// Utility functions
var util = (function(){
    return {
        hasKey: function(dict, key){
            return dict.hasOwnProperty(key);
        },
        isDefined: function(value){
            return typeof value === "undefined";
        },
        elementPath: function (elem) {
            if (elem.length != 1) {
                return "!";
            };
            var path, node = elem;
            while (node.length) {
                var realNode = node[0], name = realNode.localName;
                if (!name) break;
                name = name.toLowerCase();
                if (realNode.id) {
                 return name + '#' + realNode.id + (path ? '>' + path : '');
             } else if (realNode.className) {
                 var rncn = $.trim(realNode.className);
                 name += '.' + rncn.split(/\s+/).join('.');
             }
             var parent = node.parent(), siblings = parent.children(name);
             if (siblings.length > 1) name += ':eq(' + siblings.index(node) + ')';
             path = name + (path ? '>' + path : '');
             node = parent;
         }
         return path;
     }
 }
})();

// Data functions
var fns = (function(){
    var n_ord = 0;
    return {
        dump:		function(event, node){ return console.log(event);},
        ord:		function(event, node){ return n_ord++; },
        eid:		function(event, node){ return util.elementPath(node); },
        ts0:		function(event, node){ return new Date().getTime(); },
        type:		function(event, node){ return event.type; },
        py:			function(event, node){ return event.pageY; },
        px:			function(event, node){ return event.pageX; },
        w:			function(event, node){ return node.width(); },
        h:			function(event, node){ return node.height(); },
        ow:			function(event, node){ return node.outerWidth(); },
        oh:			function(event, node){ return node.outerHeight(); },
        iw:			function(event, node){ return node.innerWidth(); },
        ih:			function(event, node){ return node.innerHeight(); },
        tn:			function(event, node){ return node.nodeName; },
        id:			function(event, node){ return node.attr("id"); },
        src:		function(event, node){ return node.attr("src"); },
        href:		function(event, node){ return node.attr("href"); },
        title:		function(event, node){ return node.attr("title"); },
        acn: 		function(event, node){ return navigator.appCodeName; },
        an: 		function(event, node){ return navigator.appName; },
        av: 		function(event, node){ return navigator.appVersion; },
        vend: 		function(event, node){ return navigator.vendor; },
        psub: 		function(event, node){ return navigator.productSub; },
        prod: 		function(event, node){ return navigator.product; },
        ua: 		function(event, node){ return navigator.userAgent; },
        lang: 		function(event, node){ return navigator.language; },
        ce: 		function(event, node){ return navigator.cookieEnabled; },
        plat: 		function(event, node){ return navigator.platform; },
        domain: 	function(event, node){ return window.location.host; },
        base_uri: 	function(event, node){ return window.location.pathname; },
        tzo: 		function(event, node){ return new Date().getTimezoneOffset(); },
        cd: 		function(event, node){ return screen.colorDepth; },
        sh:			function(event, node){ return screen.height; },
        sw:			function(event, node){ return screen.width; },
        avh:		function(event, node){ return screen.availHeight; },
        avw:		function(event, node){ return screen.availWidth; },
        st:			function(event, node){
            if(util.isDefined(pageYOffset)){
			//most browsers except IE before #9
			return pageYOffset;
		}
		else{
			var B = document.body; //IE 'quirks'
			var D = document.documentElement; //IE with doctype
			D = (D.clientHeight)? D: B;
			return D.scrollTop;
		}
	},
   sl:			function(event, node){
       if(util.isDefined(pageXOffset)){
			//most browsers except IE before #9
			return pageXOffset;
		}
		else{
			var B = document.body; //IE 'quirks'
			var D = document.documentElement; //IE with doctype
			D = (D.clientWidth)? D: B;
			return D.scrollLeft;
		}
	},
   h:			function(event, node){ return $(document).height(); },
   w:			function(event, node){ return $(document).width(); }
}
})();

// Messaging
var Message = function(event, node) {
    var dict = {};
    var message_config = event.data;
    var ev = event;
    var no = node;
    return {
        getDict: function(){
            return dict;
        },
// builds the message from the attribute configuration
build: function(){
    for (k in message_config.attribute_config){
        this.addAttribute(message_config.attribute_config[k]);
    }
    return this;
},
// add a generic attribute with an attribute configuration
addAttribute: function(attr_config){
    if (attr_config.type == 'int') {
        this.addInteger(
	attr_config['func'], 				// function name
	fns[attr_config['func']](ev, no), 	// value
	attr_config['default']				// default
 )
    }
    if (attr_config.type == 'float') {
        this.addFloat(attr_config['func'], fns[attr_config['func']](ev, no), attr_config['default'], attr_config['default'])
    }
    if (attr_config.type == 'string') {
        this.addString(attr_config['func'], fns[attr_config['func']](ev, no), attr_config['default'], attr_config['r'], attr_config['validate']['max'])
    }
    if (attr_config.type == 'ts') {
        this.addTimestamp(attr_config['func'], fns[attr_config['func']](ev, no), attr_config['default']);
    }
},
addInteger: function(key, value, def){
    dict[key] = util.isDefined(value) ? def : Math.round(value);
},
addFloat:   function(key, value, r, def){
    dict[key] = util.isDefined(value) ? def : Math.round(value * Math.pow(10, r)) / Math.pow(10, r);
},
addString:  function(key, value, def, trunc){
    dict[key] = util.isDefined(value) ? def : value.substr(0,trunc);
},
addTimestamp: function(key, value, def) {
    if (!util.isDefined(value)) {
        dict[key] = def;
    }
    else if (value instanceof Date){
        console.log('TODO');
    }
    else if (typeof(value) == "string"){
        console.log('TODO');
    }
},
send: function(){
    var JSON_str = JSON.stringify(dict);
    console.log(JSON_str);
}
}
};


for (var i=0; i<config.events.length; i++) {
    var msgID = config.events[i]['msgID']
    console.log("Attaching:", msgID);
// filter attributes collected in the event
var collected_attrs = config.attribute_collection[msgID];
var attribute_config = {};
for (var k=0; k<collected_attrs.length; k++){
    attribute_config[collected_attrs[k]] = config.attribute_description[collected_attrs[k]]
}
if (config.events[i]['tags'] != "") {
    $(config.events[i]['source']).on(
config.events[i]['event'],  // event to listen
config.events[i]['tags'],   // tags to listen events on
{							// add attribute config and base config params
    'base':config.base,
    'attribute_config':attribute_config
},
function(event){
    if ($(event.target).is(this)) {
     var msg = new Message(event, $(this));
     msg.build().send();
 }
}
);
}
else {
    $(config.events[i]['source']).on(
config.events[i]['event'],  // event to listen
{							// add attribute config and base config params
    'base':config.base,
    'attribute_config':attribute_config
},
function(event){
    var msg = new Message(event, this);
    msg.build().send();
}
);
}
}

// include fingerprint.js
// include elemenetpath.js

// TODO mouseover átrakás
var prev_pageX = -1;
var prev_pageY = -1;
var prev_timestamp = -1;
var v_current = 0.0;
var ds_current = 0.0;
var dt_current = 0.0;

var max_scrollTop = 0.0;
var sum_ds = 0.0;
var sum_dt = 0.0;

var ord = 0;

$(document).mousemove(function(e){
    var event_time = new Date();
    var event_timestamp = event_time.getTime();
    if (prev_pageX != -1 && prev_pageY != -1 && prev_timestamp != -1) {
        ds = Math.sqrt(Math.pow(e.pageX-prev_pageX,2)+Math.pow(e.pageY-prev_pageY,2));
        dt = event_timestamp - prev_timestamp;
        v_current = ds/dt;
        ds_current = ds;
        dt_current = dt;
        sum_ds += ds;
        sum_dt += dt;
        prev_pageX = e.pageX;
        prev_pageY = e.pageY;
        prev_timestamp = event_timestamp;
    }
    if (prev_pageX == -1) {
        prev_pageX = e.pageX;
    }
    if (prev_pageY == -1) {
        prev_pageY = e.pageY;
    }
    if (prev_timestamp == -1) {
        prev_timestamp = event_timestamp;
    }
});