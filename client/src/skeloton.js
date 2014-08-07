var _SESSIONID;
if (typeof(SESSIONID) === 'undefined') {
    _SESSIONID = 'na_SESSIONID';
} else {
    _SESSIONID = SESSIONID;
}

var _meta;
if (typeof(meta) === 'undefined') {
    _meta = 'na_meta';
} else {
    _meta = meta;
}


(function(SESSIONID, meta) {

    // ----------- DATA COLLECTION DEFINITION -----------
    var config = require('./config');
    var util = require('./util')
    var cookie = require('cookie-cutter');
    if (config.base.sessionMod && util.hash(SESSIONID) % config.base.sessionMod !== 0) {
        return;
    }


    var initVisit = function() {
        cookie.set(
            "vid",
            util.generateVisitID(),
            {
                expires: 1800,
                path: "/"
            }
        )
    }

    if (!cookie.get("vid")) {
        initVisit();
    }

    var jq_module = require('./jq');
    var Message = require('./message')

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
            'sid': SESSIONID,
            'meta': meta,
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
                    var msg = new Message(event, jq_module(this));
                    msg.build();
                    if (event.data.send === 1) {
                        msg.send();
                    }
                }
            }
        );
    }
})(_SESSIONID, _meta);