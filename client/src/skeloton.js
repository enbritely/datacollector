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
    var config = {
        "base": {
            "wsid": "ddf1",
            "verbose": 0,
            "test": 0,
            "baseUri": "localhost:8089",
            "path": "/api/ddf1/add",
            "scriptVersion": 1,
            "sessionMod": 1
        },
        "events": [
        {
            "event": "copy",
            "source": window,
            "tags": "",
            "msgID": "timeinstant",
            "send": 1
        },
        {
            "event": "blur",
            "source": window,
            "tags": "",
            "msgID": "timeinstant",
            "send": 1
        },
        {
            "event": "focus",
            "source": window,
            "tags": "",
            "msgID": "timeinstant",
            "send": 1
        },
        {
            "event": "resize",
            "source": window,
            "tags": "",
            "msgID": "resize",
            "send": 1
        },
        {
            "event": "mouseover",
            "source": document,
            "tags": "a,img",
            "msgID": "event",
            "send": 1
        },
        {
            "event": "click",
            "source": document,
            "tags": "a,body,img",
            "msgID": "event",
            "send": 1
        },
        {
            "event": "ready",
            "source": document,
            "tags": "",
            "msgID": "pageview",
            "send": 1
        },
        {
            "event": "scroll",
            "source": window,
            "tags": "",
            "msgID": "scroll",
            "send": 1
        },
        {
            "event": "unload",
            "source": window,
            "tags": "",
            "msgID": "timeinstant",
            "send": 1
        },
        {
            "event": "mousemove",
            "source": document,
            "tags": "",
            "msgID": "mousemove",
            "send": 0
        }
        ],
        "attribute_collection": {
            "error":        ["ord","t0","ts0","type","dump"],
            "timeinstant":    ["ord","t0","ts0","type"],
            "resize":        ["ord","t0","ts0","type", "h", "w"],
            "pageview":     ["ord","t0","ts0","type", "ua", "fp", "bpin"],
            "event":         ["ord","t0","ts0","type", "eid", "tn", "px", "py", "mov", "mosumds"],
            "scroll":         ["ord","t0","ts0","type", "st", "sl"],
            "mousemove":     ["move"]

        },
        "attribute_description": {
            "fp": {
                "func": "fp",
                "default": null,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "bpin": {
                "func": "bpin",
                "default": null,
                "type": "string",
                "validate": {
                    "max": 1024
                }
            },
            "mov": {
                "func": "mov",
                "default": null,
                "type": "float",
                "zero": 4,
                "validate": {
                    "max": 1024
                }
            },
            "move": {
                "func": "move",
                "default": null,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "mosumds": {
                "func": "mosumds",
                "default": null,
                "type": "float",
                "zero": 4,
                "validate": {
                    "max": 1024
                }
            },
            "ua": {
                "func": "ua",
                "default": null,
                "type": "string",
                "validate": {
                    "max": 1024
                }
            },
            "ts0": {
                "func": "ts0",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "t0": {
                "func": "t0",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "h": {
                "func": "h",
                "default": -1,
                "type": "int",
                "validate": {
                    "max": 50000
                }
            },
            "dump": {
                "func": "dump",
                "default": "NA",
                "type": "string",
                "validate": {
                    "max": 50000
                }
            },
            "w": {
                "func": "w",
                "default": -1,
                "type": "int",
                "validate": {
                    "max": 50000
                }
            },
            "type": {
                "func": "type",
                "default": "NA",
                "type": "string",
                "validate": {
                    "max": 1024
                }
            },
            "tn": {
                "func": "tn",
                "default": 0,
                "type": "string",
                "validate": {
                    "max": 1024
                }
            },
            "eid": {
                "func": "eid",
                "default": 0,
                "type": "string",
                "validate": {
                    "max": 1024
                }
            },
            "px": {
                "func": "px",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "py": {
                "func": "py",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "ord": {
                "func": "ord",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "st": {
                "func": "st",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            },
            "sl": {
                "func": "sl",
                "default": 0,
                "type": "int",
                "validate": {
                    "max": 1024
                }
            }
        }
    }

    /*
    * fingerprintJS 0.5.3 - Fast browser fingerprint library
    * https://github.com/Valve/fingerprintjs
    * Copyright (c) 2013 Valentin Vasilyev (valentin.vasilyev@outlook.com)
    * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
    */

    ;(function (name, context, definition) {
      if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
      else if (typeof define === 'function' && define.amd) { define(definition); }
      else { context[name] = definition(); }
  })('Fingerprint', this, function () {
      'use strict';

      var Fingerprint = function (options) {
        var nativeForEach, nativeMap;
        nativeForEach = Array.prototype.forEach;
        nativeMap = Array.prototype.map;

        this.each = function (obj, iterator, context) {
          if (obj === null) {
            return;
        }
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === {}) {
                    return;
                }
          }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === {}) {
                return;
            }
        }
    }
}
};

this.map = function(obj, iterator, context) {
    var results = [];
      // Not using strict equality so that this acts as a
      // shortcut to checking for `null` and `undefined`.
      if (obj === null) {
        return results;
    }
    if (nativeMap && obj.map === nativeMap) {
        return obj.map(iterator, context);
    }
    this.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
};

if (typeof options === 'object'){
  this.hasher = options.hasher;
  this.screen_resolution = options.screen_resolution;
  this.canvas = options.canvas;
  this.ie_activex = options.ie_activex;
} else if(typeof options === 'function'){
  this.hasher = options;
}
};

Fingerprint.prototype = {
    get: function(){
      var keys = [];
      keys.push(navigator.userAgent);
      keys.push(navigator.language);
      keys.push(screen.colorDepth);
      if (this.screen_resolution) {
        var resolution = this.getScreenResolution();
            if (typeof resolution !== 'undefined'){ // headless browsers, such as phantomjs
              keys.push(this.getScreenResolution().join('x'));
          }
      }
      keys.push(new Date().getTimezoneOffset());
      keys.push(this.hasSessionStorage());
      keys.push(this.hasLocalStorage());
      keys.push(!!window.indexedDB);
          //body might not be defined at this point or removed programmatically
          if(document.body){
            keys.push(typeof(document.body.addBehavior));
        } else {
            keys.push(typeof undefined);
        }
        keys.push(typeof(window.openDatabase));
        keys.push(navigator.cpuClass);
        keys.push(navigator.platform);
        keys.push(navigator.doNotTrack);
        keys.push(this.getPluginsString());
        if(this.canvas && this.isCanvasSupported()){
            keys.push(this.getCanvasFingerprint());
        }
        if(this.hasher){
            return this.hasher(keys.join('###'), 31);
        } else {
            return this.murmurhash3_32_gc(keys.join('###'), 31);
        }
    },

        /**
         * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
         *
         * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
         * @see http://github.com/garycourt/murmurhash-js
         * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
         * @see http://sites.google.com/site/murmurhash/
         *
         * @param {string} key ASCII only
         * @param {number} seed Positive integer only
         * @return {number} 32-bit positive integer hash
         */

         murmurhash3_32_gc: function(key, seed) {
          var remainder, bytes, h1, h1b, c1, c2, k1, i;

          remainder = key.length & 3; // key.length % 4
          bytes = key.length - remainder;
          h1 = seed;
          c1 = 0xcc9e2d51;
          c2 = 0x1b873593;
          i = 0;

          while (i < bytes) {
              k1 =
              ((key.charCodeAt(i) & 0xff)) |
              ((key.charCodeAt(++i) & 0xff) << 8) |
              ((key.charCodeAt(++i) & 0xff) << 16) |
              ((key.charCodeAt(++i) & 0xff) << 24);
              ++i;

              k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
              k1 = (k1 << 15) | (k1 >>> 17);
              k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

              h1 ^= k1;
              h1 = (h1 << 13) | (h1 >>> 19);
              h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
              h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
          }

          k1 = 0;

          switch (remainder) {
            case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
            case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
            case 1: k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
    },

        // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
        hasLocalStorage: function () {
          try{
            return !!window.localStorage;
        } catch(e) {
            return true; // SecurityError when referencing it means it exists
        }
    },

    hasSessionStorage: function () {
      try{
        return !!window.sessionStorage;
    } catch(e) {
            return true; // SecurityError when referencing it means it exists
        }
    },

    isCanvasSupported: function () {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
  },

  isIE: function () {
      if(navigator.appName === 'Microsoft Internet Explorer') {
        return true;
          } else if(navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)){// IE 11
            return true;
        }
        return false;
    },

    getPluginsString: function () {
      if(this.isIE() && this.ie_activex){
        return this.getIEPluginsString();
    } else {
        return this.getRegularPluginsString();
    }
},

getRegularPluginsString: function () {
  return this.map(navigator.plugins, function (p) {
    var mimeTypes = this.map(p, function(mt){
      return [mt.type, mt.suffixes].join('~');
  }).join(',');
    return [p.name, p.description, mimeTypes].join('::');
}, this).join(';');
},

getIEPluginsString: function () {
  if(window.ActiveXObject){
            var names = ['ShockwaveFlash.ShockwaveFlash',//flash plugin
              'AcroPDF.PDF', // Adobe PDF reader 7+
              'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
              'QuickTime.QuickTime', // QuickTime
              // 5 versions of real players
              'rmocx.RealPlayer G2 Control',
              'rmocx.RealPlayer G2 Control.1',
              'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
              'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
              'RealPlayer',
              'SWCtl.SWCtl', // ShockWave player
              'WMPlayer.OCX', // Windows media player
              'AgControl.AgControl', // Silverlight
              'Skype.Detection'];

            // starting to detect plugins in IE
            return this.map(names, function(name){
              try{
                new ActiveXObject(name);
                return name;
            } catch(e){
                return null;
            }
        }).join(';');
        } else {
            return ""; // behavior prior version 0.5.0, not breaking backwards compat.
        }
    },

    getScreenResolution: function () {
      return [screen.height, screen.width];
  },

  getCanvasFingerprint: function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
          // https://www.browserleaks.com/canvas#how-does-it-work
          var txt = 'http://valve.github.io';
          ctx.textBaseline = "top";
          ctx.font = "14px 'Arial'";
          ctx.textBaseline = "alphabetic";
          ctx.fillStyle = "#f60";
          ctx.fillRect(125,1,62,20);
          ctx.fillStyle = "#069";
          ctx.fillText(txt, 2, 15);
          ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
          ctx.fillText(txt, 4, 17);
          return canvas.toDataURL();
      }
  };


  return Fingerprint;

});

    // Utility functions
    var util = (function(){
        return {
            hasKey: function(dict, key){
                return dict.hasOwnProperty(key);
            },
            isUndefined: function(value){
                return typeof value === "undefined";
            },
            elementPath: function (elem) {
                if (elem.length !== 1) {
                    return "!";
                }
                var path, node = elem;
                while (node.length) {
                    var realNode = node[0], name = realNode.localName;
                    if (!name) {
                        break
                    }
                    name = name.toLowerCase();
                    if (realNode.id) {
                        return name + '#' + realNode.id + (path ? '>' + path : '');
                    } else if (realNode.className) {
                        var rncn = $.trim(realNode.className);
                        name += '.' + rncn.split(/\s+/).join('.');
                    }
                    var parent = node.parent(), siblings = parent.children(name);
                    if (siblings.length > 1) {
                        name += ':eq(' + siblings.index(node) + ')';
                    }
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
        var t0 = new Date().getTime();
        var bfp = new Fingerprint();

        // Mousemove helpers
        var prev_pageX, prev_pageY, prev_timestamp;
        var v_current = 0.0;
        var ds_current = 0.0;
        var dt_current = 0.0;
        var sum_ds = 0.0;
        var sum_dt = 0.0;
        var n_mousemove = 0;
        var max_scrollTop = 0.0;
        var v_sum = 0.0;

        return {
            move:        function(event, node){
                var event_time = new Date();
                var event_timestamp = event_time.getTime();
                if (!util.isUndefined(prev_pageX) && !util.isUndefined(prev_pageY) && !util.isUndefined(prev_timestamp)) {
                    var ds = Math.sqrt(Math.pow(event.pageX-prev_pageX,2)+Math.pow(event.pageY-prev_pageY,2));
                    var dt = event_timestamp - prev_timestamp;
                    v_current  = ds / dt;
                    ds_current = ds;
                    dt_current = dt;
                    sum_ds += ds;
                    sum_dt += dt;
                    v_sum  += v_current;
                }
                n_mousemove++;
                prev_pageX = event.pageX;
                prev_pageY = event.pageY;
                prev_timestamp = event_timestamp;
                return 0;
            },
            mov:        function(event, node){ return v_current; },
            mods:        function(event, node){ return ds_current; },
            modt:        function(event, node){ return dt_current; },
            mosumds:    function(event, node){ return sum_ds; },
            mosumdt:    function(event, node){ return sum_dt; },
            moavgv:        function(event, node){ return v_sum / n_mousemove; },
            moavgdt:    function(event, node){ return sum_dt / n_mousemove; },
            moavgds:    function(event, node){ return sum_ds / n_mousemove; },
            dump:        function(event, node){ return console.log(event);},
            ord:        function(event, node){ return n_ord++; },
            t0:            function(event, node){ return t0; },
            fp:            function(event, node){ return bfp.get();},
            bpin:        function(event, node){ return bfp.getPluginsString(); },
            eid:        function(event, node){ return util.elementPath(node); },
            ts0:        function(event, node){ return new Date().getTime(); },
            type:        function(event, node){ return event.type; },
            py:            function(event, node){ return event.pageY; },
            px:            function(event, node){ return event.pageX; },
            nw:            function(event, node){ return node.width(); },
            nh:            function(event, node){ return node.height(); },
            ow:            function(event, node){ return node.outerWidth(); },
            oh:            function(event, node){ return node.outerHeight(); },
            iw:            function(event, node){ return node.innerWidth(); },
            ih:            function(event, node){ return node.innerHeight(); },
            tn:            function(event, node){ return node.nodeName; },
            id:            function(event, node){ return node.attr("id"); },
            src:        function(event, node){ return node.attr("src"); },
            href:        function(event, node){ return node.attr("href"); },
            title:        function(event, node){ return node.attr("title"); },
            acn:         function(event, node){ return navigator.appCodeName; },
            an:         function(event, node){ return navigator.appName; },
            av:         function(event, node){ return navigator.appVersion; },
            vend:         function(event, node){ return navigator.vendor; },
            psub:         function(event, node){ return navigator.productSub; },
            prod:         function(event, node){ return navigator.product; },
            ua:         function(event, node){ return navigator.userAgent; },
            lang:         function(event, node){ return navigator.language; },
            ce:         function(event, node){ return navigator.cookieEnabled; },
            plat:         function(event, node){ return navigator.platform; },
            domain:     function(event, node){ return window.location.host; },
            base_uri:     function(event, node){ return window.location.pathname; },
            tzo:         function(event, node){ return new Date().getTimezoneOffset(); },
            cd:         function(event, node){ return screen.colorDepth; },
            sh:            function(event, node){ return screen.height; },
            sw:            function(event, node){ return screen.width; },
            avh:        function(event, node){ return screen.availHeight; },
            avw:        function(event, node){ return screen.availWidth; },
            st:            function(event, node){
                            if(util.isUndefined(pageYOffset)){
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
            sl:            function(event, node){
                            if(util.isUndefined(pageXOffset)){
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
            h:            function(event, node){ return $(document).height(); },
            w:            function(event, node){ return $(document).width(); }
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
                dict[key] = util.isUndefined(value) ? def : value.substr(0,trunc);
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
                console.log(JSON_str);
            }
        }
    };

    // Attach events
    for (var i=0; i<config.events.length; i++) {
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