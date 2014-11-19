(function(jq_module) {

    // ----------- DATA COLLECTION DEFINITION -----------
    var config = require('./config');
    var util = require('./util');
    var cookie = require('./cookie');
    if(!jq_module) {
        jq_module = require('./jquery');
    }

    var sessionid = cookie.get("SESSIONID");
    var userid = cookie.get("USERID");

    // We don't track logged in users.
    if(userid !== "0" || !sessionid) {
        return;
    }

    if (config.base.sessionMod && util.hash(sessionid) % config.base.sessionMod !== 0) {
        return;
    }

    var Message = require('./message');

    // Attach events
    for (var i = 0; i < config.events.length; i++) {
        var msgID = config.events[i].msgID
        var collected_attrs = config.attribute_collection[msgID].attributes;
        var attribute_config = {};
        for (var k = 0; k < collected_attrs.length; k++) {
            attribute_config[collected_attrs[k]] = config.attribute_description[collected_attrs[k]]
        }
        var cev = config.events[i];
        var data = {
            'base': config.base,
            'sid': sessionid,
            'msgID': msgID,
            'attribute_config': attribute_config,
            'urlparams': config.attribute_collection[msgID].urlparams,
            'send': cev.send
        };
        var tags = cev.tags ? cev.tags : null;
        jq_module(cev.source).on(
            cev.event,
            tags,
            data,
            function(event) {
                if (jq_module(event.target).is(this)) {
                    var msg = new Message(event, jq_module(this), jq_module);
                    msg.build();
                    if (event.data.send === 1) {
                        msg.send();
                    }
                }
            }
        );
    }
})($);
