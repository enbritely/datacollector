// Messaging
var Message = function(event, node) {
    var util = require('./util');
    var fns = require('./fns');
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
            for (var k in message_config.attribute_config){
                this.addAttribute(message_config.attribute_config[k]);
            }
            return this;
        },
        // add a generic attribute with an attribute configuration
        addAttribute: function(attr_config){
            if (attr_config.type === 'int') {
                this.addInteger(
                    attr_config.func,                 // function name
                    fns[attr_config.func](ev, no),     // value
                    attr_config['default']                // default
                    )
            }
            if (attr_config.type === 'float') {
                this.addFloat(attr_config.func, fns[attr_config.func](ev, no), attr_config.zero, attr_config['default'])
            }
            if (attr_config.type === 'string') {
                this.addString(attr_config.func, fns[attr_config.func](ev, no), attr_config['default'], attr_config.r, attr_config.validate.max)
            }
            if (attr_config.type === 'ts') {
                this.addTimestamp(attr_config.func, fns[attr_config.func](ev, no), attr_config['default']);
            }
        },
        addInteger: function(key, value, def){
            dict[key] = util.isUndefined(value) ? def : Math.round(value);
        },
        addFloat:   function(key, value, r, def){
            dict[key] = util.isUndefined(value) ? def : Math.round(value * Math.pow(10, r)) / Math.pow(10, r);
        },
        addString:  function(key, value, def, trunc){
            dict[key] = util.isUndefined(value) ? def : value.substr(0, trunc);
        },
        addTimestamp: function(key, value, def) {
            if (!util.isUndefined(value)) {
                dict[key] = def;
            }
            else if (value instanceof Date){
                console.log('TODO');
            }
            else if (typeof(value) === "string"){
                console.log('TODO');
            }
        },
        send: function(){
            var JSON_str = JSON.stringify(dict);
            if(message_config.base.test) {
                console.log(JSON_str);
            } else {				
				var event_timestamp = dict.ts0;
				if (message_config.base.baseUri !== "") {
					var post_url = message_config.base.baseUri + message_config.base.path;
					post_url = post_url + '?wsid='+message_config.base.wsid+'&ts='+event_timestamp;
					if (message_config.base.verbose === 1) {		
						post_url = post_url + '&verbose=true';
						console.log(post_url);
					}					
					$.support.cors = true;				
					$.ajax({
						url: post_url,
						data: {payload: JSON_str},
						type: 'POST',
						dataType: 'json'
					}).done(function(data){});				
				}				
            }
        }
    }
};

module.exports = Message;