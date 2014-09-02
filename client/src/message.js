// Messaging
var Message = function(event, node, jq_module) {
	
    var util = require('./util');
    var fns = require('./fns');
    var dict = {};
    var message_config = event.data;
    var ev = event;
    var no = node;

    var addInteger = function(attr_config, ev, no) {
        var value = fns[attr_config.func](ev, no);
        if (!util.isUndefined(value)) {
            value = Math.round(value);
        }
        return value;
    };
    var addFloat = function(attr_config, ev, no) {
        var value = fns[attr_config.func](ev, no);
        if (!util.isUndefined(value)) {
            var r = attr_config.zero;
            value = Math.round(value * Math.pow(10, r)) / Math.pow(10, r);
        }
        return value;
    };
    var addString = function(attr_config, ev, no) {
        var value = fns[attr_config.func](ev, no);
        if (!util.isUndefined(value)) {
            var trunc = attr_config.validate.max;
            value = value.substr(0, trunc);
            var urlencode = attr_config.urlencode;
            if (urlencode) {
                value = encodeURIComponent(value);
            }
        }
        return value;
    };
    var addAttribute = function(key, attr_config) {
        var value = typeMap[attr_config.type](attr_config, ev, no);
        if (util.isUndefined(value)) {
            value = attr_config["default"];
        }
        dict[key] = value;
    };
    var getDict = function() {
        return dict;
    };

    var typeMap = {
        "int": addInteger,
        "string": addString,
        "float": addFloat
    }
    return {

        // builds the message from the attribute configuration
        build: function() {
            for (var k in message_config.attribute_config) {
                addAttribute(k, message_config.attribute_config[k]);
            }
            var sid = event.data.sid;
            return this;
        },
        // Sends the message.
        send: function() {
            var JSON_str = JSON.stringify(dict);
            var encoded = util.Base64.encode(JSON_str)
            var urlparams = message_config.urlparams;
            urlparams.data = encoded
            var baseUri = message_config.base.baseUri;
            var path = message_config.base.path;
            var post_url = util.buildQuery(baseUri, path, urlparams);
            if (message_config.base.test) {
                // console.log(post_url);
				console.log(dict);
            } else {
                var event_timestamp = dict.ts0;
                if (baseUri !== "") {
                    jq_module.support.cors = true;
                    jq_module.ajax({
                        url: post_url,
                        type: 'GET'
                    }).done(function(data) {});
                }
            }
        }
    }
};

module.exports = Message;