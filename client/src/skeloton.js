(function(providedJquery) {

    // ----------- DATA COLLECTION DEFINITION -----------
    var config = require('./config');
    var util = require('./util');
    var cookie = require('./cookie');
    var jq_module = require("./jquery");

    if(!jq_module) {
        jq_module = providedJquery;
    }

    var sessionid = cookie.get("SESSIONID");
    var userid = cookie.get("USERID");

    if(!sessionid) {
        sessionid = "na";
    }

    if (config.base.sessionMod && util.hash(sessionid) % config.base.sessionMod !== 0) {
        return;
    }

    var Message = require('./message');
    var handleEvent = function(event, node) {
        var msg = new Message(event, jq_module(node), jq_module);
        msg.build();
        if (event.data.send === 1) {
            msg.send();
        }
    }

    // Attach events
    for (var i = 0; i < config.events.length; i++) {
        var msgid = config.events[i].msgID
            var collected_attrs = config.attribute_collection[msgid].attributes;
        var attribute_config = {};
        for (var k = 0; k < collected_attrs.length; k++) {
            attribute_config[collected_attrs[k]] = config.attribute_description[collected_attrs[k]]
        }
        var cev = config.events[i];
        var data = {
            'base': config.base,
            'sid': sessionid,
            'msgid': msgid,
            'attribute_config': attribute_config,
            'urlparams': config.attribute_collection[msgid].urlparams,
            'send': cev.send
        };
        var tags = cev.tags ? cev.tags : null;
        jq_module(cev.source).on(
                cev.event,
                tags,
                data,
                function(event) {
                    if (jq_module(event.target).is(this)) {
                        handleEvent(event, this);
                    }
                }
                );
    }

    attribute_config = {};
    collected_attrs = config.attribute_collection.pageview.attributes;
    for (k = 0; k < collected_attrs.length; k++) {
        attribute_config[collected_attrs[k]] = config.attribute_description[collected_attrs[k]]
    }
    data = {
        'base': config.base,
        'sid': sessionid,
        'msgid': "pageview",
        'attribute_config': attribute_config,
        'urlparams': config.attribute_collection.pageview.urlparams,
        'send': 1
    };
    handleEvent({data: data, type: "ready"}, document);
})(jQuery);
