/* dmPop client-dc v5.0*/

var _SESSIONID;
var SESSIONID;
if (typeof(SESSIONID) === 'undefined') {
    _SESSIONID = 'na_SESSIONID';
} else {
 _SESSIONID = SESSIONID;
}

var _meta;
var meta;
if (typeof(meta) === 'undefined') {
    _meta = 'na_SESSIONID';
} else {
    _meta = meta;
}

(function(SESSIONID, meta) {

    // include jQuery
    // include xdr.js
    // include JSON.js

    // ----------- DATA COLLECTION DEFINITION -----------
    var config = require('./config');
    var Message  = require('./message')

    // Attach events
    for (var i = 0; i < config.events.length; i++) {
        var msgID = config.events[i].msgID
        console.log("Listen to:", msgID);
        var collected_attrs = config.attribute_collection[msgID];
        var attribute_config = {};
        for (var k=0; k<collected_attrs.length; k++){
            attribute_config[collected_attrs[k]] = config.attribute_description[collected_attrs[k]]
        }
        var cev = config.events[i];
        if (cev.tags !== "") {
            $(cev.source).on(
                cev.event,  // event to listen
                cev.tags,   // tags to listen events on
                {               // add attribute config and base config params
                    'base':config.base,
                    'attribute_config':attribute_config,
                    'send': cev.send
                },
                function(event){
                    if ($(event.target).is(this)) {
                        var msg = new Message(event, $(this));
                        msg.build();
                        if (event.data.send === 1) {
                            msg.send();
                        }
                    }
                }
                );
        }
        else {
            $(cev.source).on(
                cev.event,  // event to listen
                {                            // add attribute config and base config params
                    'base':config.base,
                    'attribute_config':attribute_config,
                    'send': cev.send
                },
                function(event){
                    var msg = new Message(event, this);
                    msg.build();
                    if (event.data.send === 1) {
                        msg.send();
                    }
                }
                );
        }
    }

    // include fingerprint.js
    // include elemenetpath.js
})(_SESSIONID,_meta);