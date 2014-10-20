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

var _geo;
if (typeof(GEO) !== 'undefined') {
    _geo = GEO;
}
else {
    _geo = "na_geo";
}

var _device;
if (typeof(DEVICE) !== 'undefined') {
    _device = DEVICE;
}
else {
    _device = "na_device";
}

var _trafficType;
if (typeof(trafficType) !== 'undefined') {
    _trafficType = trafficType;
}
else {
    _trafficType = "na_traffictype";
}

(function(SESSIONID, meta, jq_module) {

    // ----------- DATA COLLECTION DEFINITION -----------
    var config = require('./config');
    var util = require('./util');
    var cookie = require('./cookie');
    if (config.base.sessionMod && util.hash(SESSIONID) % config.base.sessionMod !== 0) {
        return;
    }

    var initVisit = function() {
        cookie.set(
            "vid",
            util.generateVisitID(),
            "/",
            10800
        );
    }

    if (!cookie.get("vid")) {
        initVisit();
    } else {
        cookie.update("vid", "/", 10800);
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
            'sid': SESSIONID,
            'meta': meta,
            'tt': _trafficType,
            'dvc': _device,
            'hgeo': _geo,
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
})(_SESSIONID, _meta, $);
