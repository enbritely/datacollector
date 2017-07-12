/*jshint -W030 */
/*jshint -W061 */

(function (undefined) {
    var lastCalledTime;
    var counter = 0;
    var fpsArray = [];
    var fpsIframe = 0;
    // fps lopp calculator
    var fpsLoop = function () {
        if (!lastCalledTime) {
            lastCalledTime = new Date().getTime();
            fps = 0;
        }
        var delta = (new Date().getTime() - lastCalledTime) / 1000;
        lastCalledTime = new Date().getTime();
        fpsIframe = Math.ceil((1 / delta));
        if (counter >= 60) {
            var sum = fpsArray.reduce(function (a, b) {
                return a + b;
            });
            // var average = Math.ceil(sum / fpsArray.length);
            // Prepare data to send
            counter = 0;
        } else {
            if (fpsIframe !== Infinity) {
                fpsArray.push(fpsIframe);
            }
            counter++;
        }
        window.requestAnimationFrame(fpsLoop);
    };
    // Request framerate from window
    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (f) {
                window.setTimeout(f, 1e3 / 60);
            };
    }();
    window.requestAnimationFrame(fpsLoop);

    // Object.assign polyfill
    if (typeof Object.assign != 'function') {
      Object.assign = function(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      };
    }

    try {
        var ce = new window.CustomEvent('test');
        ce.preventDefault();
        if (ce.defaultPrevented !== true) {
            // IE has problems with .preventDefault() on custom events
            // http://stackoverflow.com/questions/23349191
            throw new Error('Could not prevent default');
        }
    } catch(e) {
        var CustomEvent = function(event, params) {
            var evt, origPrevent;
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };

            evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            origPrevent = evt.preventDefault;
            evt.preventDefault = function () {
                origPrevent.call(this);
                try {
                    Object.defineProperty(this, 'defaultPrevented', {
                        get: function () {
                            return true;
                        }
                    });
                } catch(e) {
                    this.defaultPrevented = true;
                }
            };
            return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent; // expose definition to window
    }

    // Base64 encoding
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64;
                } else if (isNaN(i)) {
                    a = 64;
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
            }
            return t;
        },
        _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, "\n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128);
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128);
                }
            }
            return t;
        },
    };

    // JSON encoding support for IE6 and IE7

    "object" != typeof JSON && (JSON = {}),
            function () {
                "use strict";

                function f(t) {
                    return 10 > t ? "0" + t : t;
                }

                function quote(t) {
                    return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
                        var e = meta[t];
                        return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
                    }) + '"' : '"' + t + '"';
                }

                function str(t, e) {
                    var r, n, o, f, u, p = gap,
                            a = e[t];
                    switch (a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
                        case "string":
                            return quote(a);
                        case "number":
                            return isFinite(a) ? a + "" : "null";
                        case "boolean":
                        case "null":
                            return a + "";
                        case "object":
                            if (!a)
                                return "null";
                            if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                                for (f = a.length, r = 0; f > r; r += 1)
                                    u[r] = str(r, a) || "null";
                                return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + p + "]" : "[" + u.join(",") + "]", gap = p, o;
                            }
                            if (rep && "object" == typeof rep)
                                for (f = rep.length, r = 0; f > r; r += 1)
                                    "string" == typeof rep[r] && (n = rep[r], o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
                            else
                                for (n in a)
                                    Object.prototype.hasOwnProperty.call(a, n) && (o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
                            return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + p + "}" : "{" + u.join(",") + "}", gap = p, o;
                    }
                }
                "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                });
                var cx, escapable, gap, indent, meta, rep;
                "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
                    "\b": "\\b",
                    "    ": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                }, JSON.stringify = function (t, e, r) {
                    var n;
                    if (gap = "", indent = "", "number" == typeof r)
                        for (n = 0; r > n; n += 1)
                            indent += " ";
                    else
                        "string" == typeof r && (indent = r);
                    if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length))
                        throw Error("JSON.stringify");
                    return str("", {
                        "": t
                    });
                }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) {
                    function walk(t, e) {
                        var r, n, o = t[e];
                        if (o && "object" == typeof o)
                            for (r in o)
                                Object.prototype.hasOwnProperty.call(o, r) && (n = walk(o, r), void 0 !== n ? o[r] = n : delete o[r]);
                        return reviver.call(t, e, o);
                    }
                    var j;
                    if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                        return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                        return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                            "": j
                        }, "") : j;
                    throw new SyntaxError("JSON.parse");
                });

            }();

    /* jshint ignore:end */

    var util = {
        getCurrentScript: function(script_name) {
            var scripts = document.getElementsByTagName("SCRIPT");
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.indexOf(script_name) > -1) {
                    if (scripts[i].id === ""){
                        scripts[i].id = 'gerbil-' + i;
                        return scripts[i];
                    }
                }
            }
        },
        getURLSid: function () {
            var paramName = "enby_sid";
            var query = document.location.search.split("?");
            if (query.length < 2) {
                return undefined;
            }
            var paramPart = query[1];
            if (paramPart.indexOf("?") === 0) {
                paramPart = paramPart.substr(1);
            }
            var params = paramPart.split("&");
            for (var i = 0; i < params.length; i++) {
                var kv = params[i].split("=");
                if (kv.length < 2 || kv[0].toLowerCase() !== paramName) {
                    continue;
                } else {
                    return kv[1];
                }
            }
        },
        fetchLinks: function () {
            var result = {};
            var tags = ['script', 'img', 'a', 'iframe'];
            for (var tag in tags) {
                var l = [];
                var tag_elements = document.getElementsByTagName(tags[tag]);
                console.log(tags[tag] + ": " + tag_elements.length);
                for (var e in tag_elements) {
                    var cur = tag_elements[e];
                    var v = cur.src || cur.href;
                    if (v !== null) {
                        l.push(v);
                    }
                }
                result[tags[tag]] = l;
            }
            return result;
        },
        fetchIfIframe: function () {
            if (util.inIframe()) {
                return util.fetchLinks();
            } else {
                return undefined;
            }
        },
        // IE version detection
        detectIEVersion: function (ua) {
            var msie = ua.indexOf('msie ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
            var trident = ua.indexOf('trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            var edge = ua.indexOf('edge/');
            if (edge > 0) {
                // IE 12 => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            // other browser
            return 0;
        },
        // Returns UTC timestamp in milliseconds
        now: function () {
            return new Date().getTime();
        },
        // Returns an object from query string of the gerbil.js
        getQueryParams: function (script_url) {
            // Find all script tags for our collector if any
            var scripts = document.getElementsByTagName("script");
            // Look through them trying to find ourselves
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.indexOf(script_url) > -1) {
                    // Get an array of key=value strings of params
                    var pa = scripts[i].src.split("?").pop().split("&");
                    // Split each key=value into array, the construct js object
                    var p = {};
                    for (var j = 0; j < pa.length; j++) {
                        var kv = pa[j].split("=");
                        p[kv[0]] = kv[1];
                    }
                    return p;
                }
            }
            // No scripts match
            return {};
        },
        // Returns 1 if window is in an iframe and 0 if not
        inIframe: function () {
            try {
                return +(window.self !== window.top);
            } catch (e) {
                return 1;
            }
        },
        // Segments the page by wxw pixel squares and returns the segments coordinate as a string
        // Top left corner = 0:0
        segment: function (x, y, w) {
            return  Math.floor(x / w) + ':' + Math.floor(y / w);
        },
        // Generate document dimension object based on various width metrics
        documentDimensions: function () {
            var documentElement = document.documentElement;
            var body = document.getElementsByTagName('body')[0];
            return {
                'width': Math.max(
                        body.scrollWidth,
                        body.offsetWidth,
                        documentElement.scrollWidth,
                        documentElement.offsetWidth,
                        documentElement.clientWidth
                        ),
                'height': Math.max(
                        body.scrollHeight,
                        body.offsetHeight,
                        documentElement.scrollHeight,
                        documentElement.offsetHeight,
                        documentElement.clientHeight
                        )
            };
        },
        // Returns a random string of length len
        randomString: function (len) {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var text = '';
            for (var i = 0; i < len; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        urlDecode: function(s) {
            do {
              s = decodeURIComponent(s);
            } while (
              s != decodeURIComponent(s)
            );
            return s
        }
    };

    // Initialize constants
    var SCRIPT_VERSION = "@@PACKAGEVERSION";
    var PAGELOAD_TIMESTAMP = util.now();
    var SEGMENTW = 10;
    var GERBIL_NAME = "gerbil";
    var PING_INDEX = 0;

    var CURRENT_SCRIPT = util.getCurrentScript(GERBIL_NAME);
    var CURRENT_SCRIPT_SRC = CURRENT_SCRIPT.src;

    console.log("gerbil v-" + SCRIPT_VERSION);
    console.log("current script src:" + CURRENT_SCRIPT_SRC);
    console.log("current script:" + CURRENT_SCRIPT);

    console.log(util.fetchLinks());

    // Try extracting parameters from the URL
    var params = util.getQueryParams(GERBIL_NAME);

    var default_iid, default_sid;

    console.log(params);

    default_sid = util.randomString(16);
    default_iid = default_sid;

    console.log("Default sid: ", default_sid);
    console.log("Default iid: ", default_iid);

    // Initialize enviroment
    // TODO: environment building
    var enviroment = window._enbrtly_ || {};
    enviroment.wsid = enviroment.wsid || params.wsid;

    if (enviroment.wsid === undefined) {
        throw('No WSID. Aborting.');
    }

    var default_collector = "https://dc-" + enviroment.wsid + ".enbrite.ly";
    console.log("Default collector:", default_collector);

    // TODO: add params collector support in request URL
    // var params_collector = params.collector && decodeURIComponent(params.collector);

    var LOGGER_URL = enviroment.collector || default_collector;
    var urlSid = util.getURLSid(location);

    // TODO: try-catch connection error, and abort if host is not reachable

    enviroment.sid = urlSid || enviroment.sid || params.n || params.sid || default_sid;
    enviroment.iid = enviroment.iid || params.n || params.iid || default_iid;
    enviroment.pid = enviroment.pid || params.esid || params.pid || 'NAN';
    enviroment.purl = enviroment.purl || params.s || params.purl || 'NAN';
    enviroment.aid = enviroment.aid || params.eiad || params.aid || 'NAN';
    enviroment.adid = enviroment.adid || params.eadv || params.adid || 'NAN';
    enviroment.zid = enviroment.zid || params.epid || params.zid || 'NAN';
    enviroment.cid = enviroment.cid || params.ebuy || params.cid || 'NAN';
    enviroment.curl = enviroment.curl || params.eenv || params.curl || 'NAN';

    var dims = util.documentDimensions();
    enviroment.banh = enviroment.banh || params.banh || dims.height;
    enviroment.banw = enviroment.banw || params.banw || dims.width;

    enviroment.seq = 1;
    enviroment.tzoHours = (new Date()).getTimezoneOffset() / 60;

    var body = document.getElementsByTagName('body')[0];

    var docdim = util.documentDimensions();
    var x = {
        ts0: PAGELOAD_TIMESTAMP, // pageload timestamp (int)
        gvr: SCRIPT_VERSION, // gerbil.js script version (int)
        ref: document.referrer, // document.referrer (str) - Returns the URI of the page that linked to this page.
        domain: document.domain, // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
        url: document.URL, // document.URL (str)
        base_uri: window.location.pathname, // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
        ua: navigator.userAgent, // User agent string (str)
        plat: navigator.platform, // platform of the browser (str)
        iev: util.detectIEVersion(navigator.userAgent.toLowerCase()), // internet explorer version, 0="not ie" (int)
        inif: util.inIframe(), // 1 if page is in iframe else 0
        cid: util.urlDecode(enviroment.cid), // client id (str)
        curl: util.urlDecode(enviroment.curl), // client url (str)
        zid: util.urlDecode(enviroment.zid), // zone id (str)
        pid: util.urlDecode(enviroment.pid), // partner id (str)
        purl: util.urlDecode(enviroment.purl), // partner url (str)
        aid: util.urlDecode(enviroment.aid), // advertiser id (str) - ez baromsag hogy forditva van :)
        adid: util.urlDecode(enviroment.adid), // ad id (str)
        banw: enviroment.banw, // banner width (int)
        banh: enviroment.banh, // banner height (int)
        lang: navigator.language,
        tzo: enviroment.tzoHours,
        dw: docdim.width,
        dh: docdim.height,
        eh: document.documentElement.clientHeight, // Read-only property: the root element's height (int)
        ew: document.documentElement.clientWidth, // Read-only property from the root element's width (int)
        bh: body.clientHeight, // Read-only property from the body element's height (int)
        bw: body.clientWidth, // Read-only property from the body element's width   (int)
        iw: window.innerWidth || document.documentElement.clientWidth, // Most unrelieable writeable width property  (int)
        ih: window.innerHeight || document.documentElement.clientWidth, // Most unrelieable writeable height property (int)
        avw: screen.availWidth, // Available screen width in pixels (int)
        avh: screen.availHeight, // Available screen height in pixels (int)
        sh: screen.height, // Height of screen in pixels (int)
        sw: screen.width, // Width of screen in pixels (int)
        segw: SEGMENTW,
        gsrc: CURRENT_SCRIPT_SRC,
        type: 'ready'
    };

    // Add custom macros
    for (var key in params) {
        if (key[0] == '_') {
            x[key] = util.urlDecode(params[key]);
        }
    }

    // Makes a CORS AJAX request to logging server from an object
    var req = function (obj) {

        var ts = util.now();

        // Attributes that should be included in all messages
        obj.ts = ts; // timestamp of the event (int)đ
        obj.wsid = enviroment.wsid; // webshop id (str)
        obj.sid = enviroment.sid; // session id (str)
        obj.iid = enviroment.iid; // impression id (str)
        obj.seq = enviroment.seq;

        var url = LOGGER_URL + '/a.gif?wsid=' + obj.wsid + '&data=' + Base64.encode(JSON.stringify(obj)) + '&ts=' + ts;

        if (obj.type != 'ping') {
            PING_INDEX = 0;
        }

        console.log(obj);

        var ie_version = util.detectIEVersion(navigator.userAgent.toLowerCase());
        // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
        // https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Browser_compatibility
        if (ie_version < 6 && ie_version > 0) {
            // for ie < 6 we don't send fucknot
            return false;
        }
        var r;
        if (ie_version > 9) {
            // ie 10+ has standards compliant XMLHttpRequest, yaaay!
            r = new XMLHttpRequest();
        }
        if (ie_version === 8 || ie_version === 9) {
            // ie 8, 9 has microsoft specific XDomainRequest, booo!
            r = new XDomainRequest();
        }
        if (ie_version === 6 || ie_version === 7) {
            // ie 6, 7 has ActiveXObjects!
            r = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        if (ie_version === 0) {
            // if it is not ie, it just works
            r = new XMLHttpRequest();
        }

        r.open('GET', url, true);
        r.send();
        r = null;

        enviroment.seq++;

        return false;
    };

    // Mouse event logging
    var co = []; // Segment coordinate Array
    var ps = '';
    var pageX, pageY; // pageXY coordinates
    var viewed = false; // Viewed flag
    var handleMouseEvents = function (evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        pageX = evt.pageX; // pageX is evt.pageX if defined
        pageY = evt.pageY;
        if (pageX === undefined) {
            pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if (evt.type == 'mousemove') {
            var s = util.segment(pageX, pageY, SEGMENTW);
            if (s != ps)
                co.push(s);
            ps = s;
        } else {
            req({
                px: pageX,
                py: pageY,
                type: evt.type
            });
        }
    };

    // Mobile events
    var touchSegments = [];
    var lastTouchSegment = '';
    var handleTouchEvents = function (evt) {
        // TODO: Multiple touch events
        var touches = evt.changedTouches;
        var px = touches[0].pageX;
        var py = touches[0].pageY;
        var sg = util.segment(px, py, SEGMENTW);
        if (lastTouchSegment != sg)
            touchSegments.push(sg);
        lastTouchSegment = sg;
        if (evt.type == 'touchmove') {
            var s = util.segment(pageX, pageY, SEGMENTW);
            if (s != ps)
                co.push(s);
            ps = s;
        } else {
            req({
                px: px,
                py: py,
                type: evt.type
            });
        }
    };

    // Handle window events
    var handleWindowEvents = function (evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        req({
            type: evt.type
        });
    };

    var handleScrollEvent = function (evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        req({
            st: document.body.scrollTop,
            sl: document.body.scrollLeft,
            type: evt.type
        });
    };

    var handleResizeEvent = function (evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        req({
            dw: docdim.width,
            dh: docdim.height,
            eh: document.documentElement.clientHeight, // Read-only property: the root element's height (int)
            ew: document.documentElement.clientWidth, // Read-only property from the root element's width (int)
            bh: body.clientHeight, // Read-only property from the body element's height (int)
            bw: body.clientWidth, // Read-only property from the body element's width   (int)
            iw: window.innerWidth || document.documentElement.clientWidth, // Most unrelieable writeable width property  (int)
            ih: window.innerHeight || document.documentElement.clientWidth, // Most unrelieable writeable height property (int)
            avw: screen.availWidth, // Available screen width in pixels (int)
            avh: screen.availHeight, // Available screen height in pixels (int)
            sh: screen.height, // Height of screen in pixels (int)
            sw: screen.width, // Width of screen in pixels (int)
            type: evt.type
        });
    };

    // Add Event listener
    var ael = function (el, en, h) {
        if (el.addEventListener) {
            // As the standard
            el.addEventListener(en, h);
        } else {
            // IE
            el.attachEvent('on' + en, function () {
                h.call(el);
            });
        }
    };

    // https://remysharp.com/2010/07/21/throttling-function-calls
    var debounce = function (fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    };

    // Add event listeners
    ael(document, 'mousemove', handleMouseEvents);
    ael(document, 'mouseover', handleMouseEvents);
    ael(document, 'mousedown', handleMouseEvents);
    ael(document, 'mouseup', handleMouseEvents);
    ael(document, 'click', handleMouseEvents);

    ael(window, 'touchstart', handleTouchEvents);
    ael(window, 'touchend', handleTouchEvents);
    ael(window, 'touchmove', handleTouchEvents);

    ael(window, 'focus', handleWindowEvents);
    ael(window, 'blur', handleWindowEvents);
    ael(window, 'beforeunload', handleWindowEvents);
    ael(window, 'load', handleWindowEvents);
    ael(window, 'unload', handleWindowEvents);
    ael(window, 'resize', debounce(handleResizeEvent, 200));
    ael(window, 'scroll', debounce(handleScrollEvent, 200));

    // http://snipplr.com/view/69951/
    var setExactTimeout = function (callback, duration, resolution) {
        var start = (new Date()).getTime();
        var timeout = setInterval(function () {
            if ((new Date()).getTime() - start > duration) {
                callback();
                clearInterval(timeout);
            }
        }, resolution);
        return timeout;
    };

    // Periodically send segment Arrays, if segment Array length is > 0
    setInterval(function () {
        if (co.length > 0) {
            req({
                co: co.join('|'),
                type: 'heartbeat'
            });
            co = [];
        }
        if (touchSegments.length > 0) {
            req({
                co: touchSegments.join('|'),
                type: 'theartbeat'
            });
            touchSegments = [];
        }
        if (((++PING_INDEX % 60) === 0) & ((util.now() - PAGELOAD_TIMESTAMP) < 5 * 60 * 1000)) {
            console.log(util.now() - PAGELOAD_TIMESTAMP, (util.now() - PAGELOAD_TIMESTAMP) < 10000);
            req({
                type: 'ping'
            });
        }
    }, 500);

    // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
    setTimeout(function () {
        req(x);
    }, 5);

    // Send links
    setTimeout(function () {
        req({
            links: util.fetchIfIframe(),
            type: 'links'
        });
    }, 100);

    var Performance = (function() {
        // Init performance if exists in browser
        var _wp = window.performance || {},
            _p = _wp.timing || {},
            _m = _wp.memory || {},
            _n = _wp.navigation || {},
            p = {};

        p.type = 'performance';
        p.jsHeapSizeLimit = _m.jsHeapSizeLimit || -1;
        p.totalJSHeapSize = _m.totalJSHeapSize || -1;
        p.usedJSHeapSize = _m.usedJSHeapSize || -1;

        p.redirectCount = _n.redirectCount || -1;

        p.connectEnd = _p.connectEnd || -1;
        p.connectStart = _p.connectStart || -1;
        p.domComplete = _p.domComplete || -1;
        p.domContentLoadedEventEnd = _p.domContentLoadedEventEnd || -1;
        p.domContentLoadedEventStart = _p.domContentLoadedEventStart || -1;
        p.domInteractive = _p.domInteractive || -1;
        p.domLoading = _p.domLoading || -1;
        p.domainLookupEnd = _p.domainLookupEnd || -1;
        p.domainLookupStart = _p.domainLookupStart || -1;
        p.fetchStart = _p.fetchStart || -1;
        p.loadEventEnd = _p.loadEventEnd || -1;
        p.loadEventStart = _p.loadEventStart || -1;
        p.navigationStart = _p.navigationStart || -1;
        p.redirectEnd = _p.redirectEnd || -1;
        p.redirectStart = _p.redirectStart || -1;
        p.requestStart = _p.requestStart || -1;
        p.responseEnd = _p.responseEnd || -1;
        p.responseStart = _p.responseStart || -1;
        p.secureConnectionStart = _p.secureConnectionStart || -1;
        p.unloadEventEnd = _p.unloadEventEnd || -1;
        p.unloadEventStart = _p.unloadEventStart || -1;

        return {
            get: function() {return p;}
        };

    })();

    setTimeout(function(){
        req(Performance.get());
    }, 500);


    // Send viewed message after 1 sec delay
    setExactTimeout(function () {
        if (!viewed) {
            req({
                type: 'viewed'
            });
            viewed = true;
        }
    }, 1000, 100);

    /**
     * EnViewability Library
     * @param {DOMElement|DOMElementID|NULL} selector
     * @param {function|NULL} callback
     * @returns {EnViewability}
     */
    var EnViewability = function (selector, callback) {
        // The callback holder if it's set
        this.callback = callback;
        try {
            // Configuration
            this.configuration = {
                pixelTimer: 250, // the fps loop timer (500)
                eventTimer: 1000, // the after event timer (1000)
                reportStepBegin: 1000, // the timer for the first report
                reportStepSwitch: 5, // the break point between the first X and the reports after it
                reportStep: 10000, // the timer for the after X reports
                iframeSrcUrl: "@@HELPER_IFRAME_URL",
                iframesCount: 9,
            };
            // Iframe Pixel States
            this.pixels = {
                tl: {
                    x: 0,
                    y: 0,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                tc: {
                    x: window.innerWidth / 2 - 3,
                    y: 0,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                tr: {
                    x: window.innerWidth - 6,
                    y: 0,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                ml: {
                    x: 0,
                    y: window.innerHeight / 2 - 3,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                mc: {
                    x: window.innerWidth / 2 - 3,
                    y: window.innerHeight / 2 - 3,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                mr: {
                    x: window.innerWidth - 6,
                    y: window.innerHeight / 2 - 3,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                bl: {
                    x: 0,
                    y: window.innerHeight - 6,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                bc: {
                    x: window.innerWidth / 2 - 3,
                    y: window.innerHeight - 6,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
                br: {
                    x: window.innerWidth - 6,
                    y: window.innerHeight - 6,
                    lastReportTs: 0,
                    lastReportFPS: 0,
                    averageFPS: 0,
                },
            };
            // END of Configuration
            // HELPERS
            // iFrame Pixel Creator
            this.createiFrame = function (id, x, y) {
                x = x > 0 ? x + "px" : x;
                y = y > 0 ? y + "px" : y;
                var iframe = document.createElement('iframe');
                iframe.setAttribute("id", id);
                iframe.setAttribute("src", this.configuration.iframeSrcUrl + "#" + id);
                iframe.setAttribute("style", "z-index: -10000;display: block;border:0;width: 1px;height: 1px;position: fixed;top:" + y + ";left:" + x + "; background:transparent;");
                iframe.setAttribute("allowtransparency", "true");
                document.body.appendChild(iframe);
                return iframe;
            };
            this.receiveIframeMessage = function (event) {
              if (
                typeof(that.pixels[event.data.hash]) !== 'undefined' &&
                typeof(that.pixels[event.data.hash].lastReportTs) !== 'undefined' &&
                typeof(event.data.ts) !== 'undefined' &&
                typeof(that.pixels[event.data.hash].lastReportFPS) !== 'undefined' &&
                typeof(event.data.fps) !== 'undefined' &&
                typeof(that.pixels[event.data.hash].averageFPS) !== 'undefined' &&
                typeof(event.data.average) !== 'undefined'
              ) {

                if (
                  ( that.pixels[event.data.hash].lastReportTs < event.data.ts - 1000 ) ||
                  ( that.pixels[event.data.hash].lastReportFPS < event.data.fps )
                ) {
                  that.trigerEvent("iframepixelshow");
                }

                that.pixels[event.data.hash].lastReportTs = event.data.ts;
                that.pixels[event.data.hash].lastReportFPS = event.data.fps;
                that.pixels[event.data.hash].averageFPS = event.data.average;

              }
            };
            // Configuration setter/getter
            this.config = function (configuration) {
                if ((typeof configuration === "object") && (configuration !== null)) {
                    this.configuration = Object.assign({}, this.configuration, configuration);
                } else {
                    return this.configuration;
                }

            };
            // Check if an element is inside of an element or it's equal (position and size)
            this.elementInOrEqual = function (curElement, comparedElement) {
                var curState = that.getVisible(curElement);
                var comparedState = that.getVisible(comparedElement);
                var topLeftIn = (curState.location.left <= comparedState.location.left && curState.location.top <= comparedState.location.top);
                var bottomRightIn = (curState.location.right >= comparedState.location.right && curState.location.bottom >= comparedState.location.bottom);
                if (topLeftIn && bottomRightIn) {
                    return true;
                }
                return false;
            };
            // Checks is an element is child to another
            this.isDescendant = function (parent, child) {
                var node = child.parentNode;
                while (node !== null) {
                    if (node === parent) {
                        return true;
                    }
                    node = node.parentNode;
                }
                return false;
            };
            // Trigers a custom event
            this.trigerEvent = function (e) {
                var event = new CustomEvent(e, {"detail": e});
                document.dispatchEvent(event);
            };
            // Checks if is in iframe or not
            this.inIframe = function () {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            };
            // Checks if is dom element and if it's not an master element
            this.isElement = function (obj) {
                var ignore = ["HTML", "BODY"];
                try {
                    if (ignore.indexOf(obj.tagName)) {
                        return (obj.constructor.__proto_this.prototype.constructor.name) ? true : false;
                    }
                    return false;
                } catch (e) {
                    return false;
                }
            };
            // To use this inside internal functions
            var that = this;
            // Gets unique path of an element
            this.getUniquePath = function (node) {
                var path = node.tagName.toLowerCase();
                if (node.id !== null && node.id !== "") {
                    path = path + "#" + node.id;
                }
                if (node.className !== null && node.className !== "") {
                    path = path + "." + node.className;
                }
                if (typeof node.parentNode !== "undefined" && that.isElement(node.parentNode) && node.parentNode.tagName !== "") {
                    var parent_path = that.getUniquePath(node.parentNode);
                    if (parent_path !== null) {
                        path = parent_path + ">" + path;
                    }
                }
                return path;
            };

            // Locates the ad element in the dom

            this.locateElement = function () {

              // Detect adform and return with ad element on match

              var parentChildrens = CURRENT_SCRIPT.parentElement.children,
                  parentChildren,
                  previousDiv;

              for (
                var i = 0,
                    j = parentChildrens.length;
                i < j;
                ++i
              ) {

                parentChildren = parentChildrens[i];

                if (
                  parentChildren.tagName === 'DIV' &&
                  /adform.*adbox/mi.test(parentChildren.id)
                ) {
                  previousDiv = parentChildren;
                } else if (
                  parentChildren.tagName === 'SCRIPT' &&
                  parentChildren.src === CURRENT_SCRIPT.src &&
                  typeof(previousDiv) === 'object'
                ) {
                  return(previousDiv);
                }

              }

              // Detect adsense and return with body element on match

              if (
                window.self !== window.top &&
                (
                  (
                    typeof(window.location.origin) !== 'undefined' &&
                    /(google\.com|doubleclick\.net|invitemedia\.com|admeld\.com|googlesyndication\.com|googleadservices\.com)$/mi.test(window.location.origin)
                  ) || (
                    typeof(window.name) !== 'undefined' &&
                    /google\_ads\_i?frame/mi.test(window.name)
                  ) || (
                    typeof(window.frameElement) !== 'undefined' &&
                    typeof(window.frameElement.id) !== 'undefined' &&
                    /google\_ads\_i?frame/mi.test(window.frameElement.id)
                  )
                ) &&
                document.getElementsByTagName('body').length > 0
              ) {
                return(document.getElementsByTagName('body')[0]);
              }

              // Detect flashtalking and return with body element on match

              if (
                window.self !== window.top &&
                (
                  (
                    typeof(window.location.origin) !== 'undefined' &&
                    /(flashtalking\.net)$/mi.test(window.location.origin)
                  ) || (
                    typeof(window.frameElement) !== 'undefined' &&
                    typeof(window.frameElement.id) !== 'undefined' &&
                    /ftframe[0-9]+/mi.test(window.frameElement.id)
                  )
                ) &&
                document.getElementsByTagName('body').length > 0
              ) {
                return(document.getElementsByTagName('body')[0]);
              }

              // Return with an empty object

              return({});

            };

            // States and constants that run the entire business
            // The reports counter, which is reset after every event
            // It sets the reporting timer
            this.reportsCounter = 0;
            // The time of the last report
            this.lastReportTime = 0;
            // The reporting timer based ot the above counter
            this.reportTimer = function () {
                var timer = this.configuration.reportStepBegin;
                if (this.reportsCounter >= this.configuration.reportStepSwitch) {
                    timer = this.configuration.reportStep;
                }
                this.reportsCounter++;
                return timer;
            };
            // Reset of the timer where it's needed
            this.resetReportTimer = function () {
                this.lastReportTime = 0;
                this.reportsCounter = 0;
            };
            // The element holder
            // Check if it's added as element id, DOM object. Otherwise trys to find it.
            if ((typeof selector === "object") && (selector !== null)) {
                this.element = selector;
            } else if ((selector !== null) && (selector !== "")) {
                this.element = document.getElementById(selector);
            } else {
                this.element = this.locateElement();
            }
            // Events that are used only to reset timers and counters
            this.out_events = ["beforeunload", "iframeblur", "blur", "focusout"];
            // The orifginal state of an element
            this.state_original = {
                view: false,
                full: false,
                iframe: this.inIframe(),
                element: {
                    id: this.element.id,
                    path: this.getUniquePath(this.element),
                },
                event: {
                    type: "load",
                    ts: 0,
                    prev_ts: 0,
                    diff: 0
                },
                size: {
                    width: 0,
                    height: 0,
                    area: 0,
                },
                location: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                },
                visible: {
                    area: 0,
                    width: 0,
                    height: 0,
                    horizontal: 0,
                    vertical: 0,
                    total: 0,
                },
                part: {
                    overlapped: 0,
                    vertical: "none",
                    horizontal: "none",
                },
                viewable: {
                    10: 0,
                    20: 0,
                    30: 0,
                    40: 0,
                    50: 0,
                    60: 0,
                    70: 0,
                    80: 0,
                    90: 0,
                    100: 0,
                    current: 0,
                }
            };
            // To use this inside internal functions
            var that = this;
            // If the ad is in iframe, the fps loop is initialised
            if (this.state_original.iframe) {
                for (var index in this.pixels) {
                    this.createiFrame(index, this.pixels[index].x, this.pixels[index].y);
                }
                // Start pixel visibility checker
                this.iframeTimer = setTimeout(function () {
                    that.iframeViewable();
                }, that.configuration.pixelTimer);
            }
            // The iframe checker
            this.lastIframState = "iframehidden";
            this.iframeViewable = function () {
                var now = Math.floor(Date.now());
                for (var index in this.pixels) {
                    if (this.pixels[index].lastReportTs < (now - 1000)) {
                        this.pixels[index].lastReportFPS = 0;
                        this.pixels[index].lastReportTs = now;
                    }
                }
                var max = Math.max(
                        parseInt(this.pixels.tl.lastReportFPS),
                        parseInt(this.pixels.tc.lastReportFPS),
                        parseInt(this.pixels.tr.lastReportFPS),
                        parseInt(this.pixels.ml.lastReportFPS),
                        parseInt(this.pixels.mc.lastReportFPS),
                        parseInt(this.pixels.mr.lastReportFPS),
                        parseInt(this.pixels.bl.lastReportFPS),
                        parseInt(this.pixels.bc.lastReportFPS),
                        parseInt(this.pixels.br.lastReportFPS)
                        );
                if (max > 0) {
                    var sum = parseInt(this.pixels.tl.lastReportFPS) +
                            parseInt(this.pixels.tc.lastReportFPS) +
                            parseInt(this.pixels.tr.lastReportFPS) +
                            parseInt(this.pixels.ml.lastReportFPS) +
                            parseInt(this.pixels.mc.lastReportFPS) +
                            parseInt(this.pixels.mr.lastReportFPS) +
                            parseInt(this.pixels.bl.lastReportFPS) +
                            parseInt(this.pixels.bc.lastReportFPS) +
                            parseInt(this.pixels.br.lastReportFPS);
                    var visibility = 100 * sum / (fpsIframe * 9);
                    that.state.view = true;
                    that.state.full = visibility === 100 ? true : false;
                    that.state.visible.horizontal = visibility;
                    that.state.visible.vertical = visibility;
                    that.state.visible.total = visibility;
                    that.state.part.overlapped = 0;
                    that.state.part.vertical = "full";
                    that.state.part.horizontal = "full";
                } else if (this.state.visible.total !== 0) {
                    that.state.view = false;
                    that.state.full = false;
                    that.state.visible.area = 0;
                    that.state.visible.width = 0;
                    that.state.visible.height = 0;
                    that.state.visible.horizontal = 0;
                    that.state.visible.vertical = 0;
                    that.state.visible.total = 0;
                    that.state.part.overlapped = 0;
                    that.state.part.vertical = "none";
                    that.state.part.horizontal = "none";
                }
                this.iframeTimer = setTimeout(function () {
                    that.iframeViewable();
                }, that.configuration.pixelTimer);
            };
            // Holds the old state for reference
            this.old_state = this.state_original;
            // Holds the current state
            this.state = this.state_original;
            // Gets the one dimension of the object's geometrical visibility
            this.getVisiblePart = function (elemStart, elemEnd, elemTotal, compareTo) {
                var visible = {
                    lenght: elemTotal,
                    percent: 100,
                    part: "full"
                };
                if ((elemStart < 0) || (elemEnd > compareTo)) {
                    if ((elemStart < 0) && (elemEnd > compareTo)) {
                        visible.lenght = compareTo;
                        visible.part = "middle";
                    } else if (elemStart < 0) {
                        visible.lenght = elemTotal + elemStart;
                        visible.part = "end";
                    } else if (elemEnd > compareTo) {
                        var diff = elemEnd - compareTo;
                        visible.lenght = elemTotal - diff;
                        visible.part = "beginning";
                    }
                    visible.percent = Math.round(visible.lenght * 100 / elemTotal);
                    if (visible.percent < 0) {
                        visible.percent = 0;
                        visible.part = "none";
                    }
                }
                return visible;
            };
            // Gets the 2d geometrical visibility of the object
            this.getVisible = function (element) {
                var state = {
                    size: {
                        width: 0,
                        height: 0,
                        area: 0,
                    },
                    location: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    visible: {
                        area: 0,
                        width: 0,
                        height: 0,
                        horizontal: 0,
                        vertical: 0,
                        total: 0,
                    },
                    part: {
                        vertical: "none",
                        horizontal: "none",
                    },
                };
                state.size.width = element.getBoundingClientRect().width;
                state.size.height = element.getBoundingClientRect().height;
                state.size.area = state.size.width * state.size.height;
                state.location.left = element.getBoundingClientRect().left;
                state.location.right = element.getBoundingClientRect().right;
                state.location.top = element.getBoundingClientRect().top;
                state.location.bottom = element.getBoundingClientRect().bottom;
                state.view = (state.location.top >= 0) && (state.location.bottom <= window.innerHeight) && (state.location.left >= 0) && (state.location.right <= window.innerWidth);
                if (state.view) {
                    state.visible.width = state.size.width;
                    state.visible.height = state.size.height;
                    state.visible.area = state.size.area;
                    state.visible.horizontal = 100;
                    state.visible.vertical = 100;
                    state.visible.total = 100;
                    state.full = true;
                    state.part.vertical = "full";
                    state.part.horizontal = "full";
                } else {
                    var h = that.getVisiblePart(state.location.left, state.location.right, state.size.width, window.innerWidth);
                    state.visible.horizontal = h.percent;
                    state.visible.width = h.lenght;
                    var v = that.getVisiblePart(state.location.top, state.location.bottom, state.size.height, window.innerHeight);
                    state.visible.vertical = v.percent;
                    state.visible.height = v.lenght;
                    if ((state.visible.horizontal === 0) || (state.visible.vertical === 0)) {
                        state.visible.width = 0;
                        state.visible.height = 0;
                        state.visible.horizontal = 0;
                        state.visible.vertical = 0;
                    } else {
                        state.visible.total = Math.round(state.visible.horizontal * state.visible.vertical / 100);
                        state.view = true;
                        switch (v.part) {
                            case "beginning":
                                state.part.vertical = "top";
                                break;
                            case "end":
                                state.part.vertical = "bottom";
                                break;
                            case "full":
                                /* falls through */
                            case "none":
                                /* falls through */
                            case "middle":
                                /* falls through */
                            default:
                                state.part.vertical = v.part;
                                break;
                        }
                        switch (h.part) {
                            case "beginning":
                                state.part.horizontal = "left";
                                break;
                            case "end":
                                state.part.horizontal = "right";
                                break;
                            case "full":
                                /* falls through */
                            case "none":
                                /* falls through */
                            case "middle":
                                /* falls through */
                            default:
                                state.part.horizontal = h.part;
                                break;
                        }
                    }
                    state.visible.area = state.visible.width * state.visible.height;
                }
                return state;
            };
            // Checks the overall visibility (iframe, geometrical, overlaying) of an object
            this.isViewable = function (event) {
                that.old_state = that.state;
                if (that.out_events.indexOf(event) >= 0) {
                    that.state = that.state_original;
                } else {
                    var state = that.getVisible(that.element);
                    that.state = Object.assign({}, that.state, state);
                }
                that.state.event.type = event;
                if (that.old_state.event.ts > 0) {
                    that.state.event.prev_ts = that.old_state.event.ts;
                    that.state.event.ts = Math.floor(Date.now() / 1000);
                    that.state.event.diff = that.state.event.ts - that.state.event.prev_ts;
                } else {
                    that.state.event.ts = Math.floor(Date.now() / 1000);
                }
                if (that.state.iframe) {
                    if (event === "iframeshow") {
                        that.state.visible.horizontal = 100;
                        that.state.visible.vertical = 100;
                        that.state.visible.total = 100;
                        that.state.part.overlapped = 0;
                        that.state.part.vertical = "full";
                        that.state.part.horizontal = "full";
                    } else {
                        that.state.view = false;
                        that.state.full = false;
                        that.state.visible.area = 0;
                        that.state.visible.width = 0;
                        that.state.visible.height = 0;
                        that.state.visible.horizontal = 0;
                        that.state.visible.vertical = 0;
                        that.state.visible.total = 0;
                        that.state.part.overlapped = 0;
                        that.state.part.vertical = "none";
                        that.state.part.horizontal = "none";
                    }
                } else if (that.state.view) {
                    var overlappingElements = {};
                    for (var x = that.state.location.top; x < that.state.location.right; x = x + 50) {
                        for (var y = that.state.location.top; y < that.state.location.bottom; y = y + 50) {
                            var element = document.elementFromPoint(x, y);
                            if (typeof element === 'object' && element !== null && element.id !== that.element.id && !that.isDescendant(that.element, element) && that.isElement(element)) {
                                overlappingElements[that.getUniquePath(element)] = element;
                            }
                        }
                    }
                    if (Object.keys(overlappingElements).length > 1) {
                        for (var index in overlappingElements) {
                            var curElement = overlappingElements[index];
                            for (var cIndex in overlappingElements) {
                                if (cIndex != index) {
                                    var comparedElement = overlappingElements[index];
                                    if (that.elementInOrEqual(curElement, comparedElement)) {
                                        delete overlappingElements[cIndex];
                                    } else {
                                        delete overlappingElements[index];
                                    }
                                }
                            }
                        }
                    }
                    for (var index in overlappingElements) {
                        // Add logic to handle multiple overlapping elements.
                        var overlappingElementState = that.getVisible(overlappingElements[index]);
                        that.state.visible.total = (that.state.visible.area - overlappingElementState.visible.area) * 100 / (that.state.size.area);
                    }
                }
            };
            // Returns how many seconds to add to the visibility state
            this.secondsToAdd = function () {
                if (that.lastReportTime === 0) {
                    return 1;
                } else {
                    return Math.round((new Date().getTime() - that.lastReportTime) / 1000);
                }
            };
            // Calculates & reports the ad state
            this.report = function () {
                if (this.state.visible.total > 0) {
                    var secondsToAdd = that.secondsToAdd();
                    for (var index in that.state.viewable) {
                        if (that.state.view && that.state.visible.total >= index) {
                            that.state.viewable[index] = that.state.viewable[index] + secondsToAdd;
                        }
                    }
                    that.state.viewable.current = this.state.visible.total;
                    this.lastReportTime = new Date().getTime();
                    if (typeof this.callback === "function") {
                        var o = {};
                        var vidxs = [10,20,30,40,50,60,70,80,90,100];
                        for (var i in vidxs){
                            var vidx = vidxs[i];
                            o['v_' + vidx] = that.state.viewable[vidx];
                        }
                        o.v_current = that.state.viewable.current;
                        o.type = 'viewability';
                        this.callback(o, that.element);
                    } else {
                        var json_data = JSON.stringify(that.state);
                        console.debug(json_data);
                    }
                }
                this.enReportTimer = setTimeout(function () {
                    that.report();
                }, this.reportTimer());
            };
            // Timers activation
            // The initial activation of the event timer
            this.enEventTimer = setTimeout(function () {
                that.isViewable("load");
            }, that.configuration.eventTimer);
            // The initial activation of the report timer
            this.enReportTimer = setTimeout(function () {
                that.report();
            }, this.reportTimer());
            // END of Timers activation
            // Event Managers
            // Event Go Manager - manages events that indicates that the ad cloud be visible or not
            this.eventGoManager = function (event) {
                clearInterval(that.enTimer);
                that.resetReportTimer();
                that.enEventTimer = setTimeout(function () {
                    that.isViewable(event.type);
                }, that.configuration.eventTimer);
            };
            // Event Out Manager - manages events that indicates that the ad cloud be not visible at all
            this.eventOutManager = function (event) {
                clearInterval(that.enEventTimer);
                that.isViewable(event.type);
            };

            // END of Event Managers
            // Event listeners
            // After every event, resets the timers and executes the ad visibility detection
            if (window.attachEvent) {
                // Go events
                window.attachEvent('onresize', function (e) {
                    that.eventGoManager(e);
                });
                window.attachEvent('focus', function (e) {
                    that.eventGoManager(e);
                });
                window.attachEvent('iframeshow', function (e) {
                    that.eventGoManager(e);
                });
                // Continious Events
                window.attachEvent('scroll', function (e) {
                    that.eventGoManager(e);
                });
                // Out Events
                window.attachEvent('focusout', function (e) {
                    that.eventOutManager(e);
                });
                window.attachEvent('blur', function (e) {
                    that.eventOutManager(e);
                });
                window.attachEvent('iframeblur', function (e) {
                    that.eventOutManager(e);
                });
                window.attachEvent('message', this.receiveIframeMessage);
            } else if (window.addEventListener) {
                // Go events
                window.addEventListener('resize', function (e) {
                    that.eventGoManager(e);
                }, true);
                window.addEventListener('focus', function (e) {
                    that.eventGoManager(e);
                }, true);
                window.addEventListener('scroll', function (e) {
                    that.eventGoManager(e);
                }, true);
                window.addEventListener('iframeshow', function (e) {
                    that.eventGoManager(e);
                }, true);
                // Out Events
                window.addEventListener('focusout', function (e) {
                    that.eventOutManager(e);
                }, true);
                window.addEventListener('blur', function (e) {
                    that.eventOutManager(e);
                }, true);
                window.addEventListener('iframeblur', function (e) {
                    that.eventOutManager(e);
                }, true);
                // Iframe Message Catcher
                window.addEventListener('message', this.receiveIframeMessage, true);
            }
        // END of event listeners
        } catch (err) {
            if (typeof this.callback === "function") {
                var o = {};
                o.name = err.name;
                o.message = err.message;
                o.type = 'error_msg';
                this.callback(o, that.element);
            } else {
                var json_data = JSON.stringify(that.state);
                console.debug('Error', json_data);
            }
        }
    };

    // Wait up to 60 seconds for compete readystate

    var banner,
        checkLoadedMaxIterations = 1200,
        checkLoadedDelay = 50;

    var checkLoaded = setInterval(function () {
      if (
        --checkLoadedMaxIterations < 1
      ) {
        clearInterval(checkLoaded);
      } else if (
        /loaded|complete/i.test(document.readyState)
      ) {
        banner = new EnViewability(null, req);
        clearInterval(checkLoaded);
      };
    }, checkLoadedDelay);

}(null));
