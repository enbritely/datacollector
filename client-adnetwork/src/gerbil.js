(function(w) {
    // Base64 encoding
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
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
        decode: function(e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r);
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i);
                }
            }
            t = Base64._utf8_decode(t);
            return t;
        },
        _utf8_encode: function(e) {
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
        _utf8_decode: function(e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++;
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2;
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3;
                }
            }
            return t;
        }
    };
    // JSON encoding support for IE6 and IE7
    "object" != typeof JSON && (JSON = {}),
        function() {
            "use strict";

            function f(t) {
                return 10 > t ? "0" + t : t
            }

            function quote(t) {
                return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
                    var e = meta[t];
                    return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + t + '"'
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
                        if (!a) return "null";
                        if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                            for (f = a.length, r = 0; f > r; r += 1) u[r] = str(r, a) || "null";
                            return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + p + "]" : "[" + u.join(",") + "]", gap = p, o
                        }
                        if (rep && "object" == typeof rep)
                            for (f = rep.length, r = 0; f > r; r += 1) "string" == typeof rep[r] && (n = rep[r], o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
                        else
                            for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
                        return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + p + "}" : "{" + u.join(",") + "}", gap = p, o
                }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                return this.valueOf()
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
            }, JSON.stringify = function(t, e, r) {
                var n;
                if (gap = "", indent = "", "number" == typeof r)
                    for (n = 0; r > n; n += 1) indent += " ";
                else "string" == typeof r && (indent = r);
                if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw Error("JSON.stringify");
                return str("", {
                    "": t
                })
            }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
                function walk(t, e) {
                    var r, n, o = t[e];
                    if (o && "object" == typeof o)
                        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (n = walk(o, r), void 0 !== n ? o[r] = n : delete o[r]);
                    return reviver.call(t, e, o)
                }
                var j;
                if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
                        return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }();

    var util = {
        // IE version detection
        detectIEVersion: function(ua) {
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
        now: function() {
            return new Date().getTime();
        },
        // Returns an object from query string of the gerbil.js
        getQueryParams: function(script_url) {
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
        inIframe: function() {
            try { return +(window.self !== window.top); } catch (e) { return 1; }
        },
        // Segments the page by wxw pixel squares and returns the segments coordinate as a string
        // Top left corner = 0:0
        segment: function(x, y, w) {
            return  Math.floor(x / w) + ':' +  Math.floor(y / w);
        },
        // Generate document dimension object based on various width metrics
        documentDimensions: function() {
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
            }
        },
        // Browser sniffing function
        browser: function() {
            var n = navigator.userAgent.toLowerCase();
            var b = {
                webkit:  +(/webkit/.test(n)),
                mozilla: +((/mozilla/.test(n)) && (!/(compatible|webkit)/.test(n))),
                chrome:  +((/chrome/.test(n) || /crios/.test(n))),
                msie:    +((/msie/.test(n)) && (!/opera/.test(n))),
                firefox: +(/firefox/.test(n)),
                safari:  +((/safari/.test(n) && !(/chrome/.test(n)) && !(/crios/.test(n)))),
                opera:   +(/opera/.test(n)),
                mobile:  +((/android|webos|iphone|ipad|ipod|blackberry|iemobile|mobi|opera mini/i.test(n)))
            };
            b.version     = (b.safari) ? (n.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n.match(/.+(?:ox|me|ra|rv|ie|crios)[\/: ]([\d.]+)/) || [])[1];
            b.mainVersion = parseInt(b.version);
            return b;
        },
        // Cookie handling functionality
        cookie: {
          prefix: '__nbrtl-',
          set: function(name, value, days) {
              if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  var expires = "; expires=" + date.toGMTString();
              } else var expires = "";
              document.cookie = this.prefix + name + "=" + value + expires + "; path=/";
              return value;
          },
          get: function (name) {
              var nameEQ = this.prefix + name + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
          }
        },
        // Returns a random string of length len
        randomString: function(len) {
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var text = '';
            for (var i = 0; i < len; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        elementDimensionsByID: function(id){
            var obj = document.getElementById(id);
            var dim = obj.getBoundingClientRect();
            var width = dim.right - dim.left;
            var height = dim.bottom - dim.top;
            var curleft = curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return {
                'top': curtop,
                'right': curleft + width,
                'bottom': curtop + height,
                'left': curleft,
                'height': height,
                'width': width
            }
        }
    }

    // Initialize constants
    var SCRIPT_VERSION = 200;
    var PAGELOAD_TIMESTAMP = util.now();
    var SEGMENTW = 10;
    var GERBIL_NAME = "gerbil.js";


    // Set default impression and session identifiers
    var default_sid = util.cookie.get('sid') || util.cookie.set('sid', util.randomString(16), 1);
    var default_iid = util.randomString(16);

    // Try extracting parameters from the URL
    var params = util.getQueryParams(GERBIL_NAME);

    // Initialize enviroment
    // TODO: environment building
    var enviroment = window._enbrtly_ || {};
    enviroment.wsid = enviroment.wsid || params.wsid;

    if (enviroment.wsid === undefined) {
        throw('No WSID. Aborting.');
        return false;
    }

    console.log(location.protocol);

    var default_collector = (location.protocol === "https:") ? "https://dc-"+enviroment.wsid+".enbrite.ly" : "http://dc-"+enviroment.wsid+".enbrite.ly";

    // TODO: add params collector support in request URL
    // var params_collector = params.collector && decodeURIComponent(params.collector);

    var LOGGER_URL = enviroment.collector || default_collector;

    // TODO: try-catch connection error, and abort if host is not reachable

    enviroment.sid  = enviroment.sid    || params.n    || params.sid         || default_sid;
    enviroment.iid  = enviroment.iid    || params.n    || params.iid         || default_iid;
    enviroment.pid  = enviroment.pid    || params.esid || params.pid         || 'NAN';
    enviroment.purl = enviroment.purl   || params.s    || params.purl        || 'NAN';
    enviroment.aid  = enviroment.aid    || params.eiad || params.aid         || 'NAN';
    enviroment.adid = enviroment.adid   || params.eadv || params.adid        || 'NAN';
    enviroment.zid  = enviroment.zid    || params.epid || params.zid         || 'NAN';
    enviroment.cid  = enviroment.cid    || params.ebuy || params.cid         || 'NAN';
    enviroment.curl = enviroment.curl   || params.eenv || params.curl        || 'NAN';

    var dims = util.documentDimensions();
    // TODO:
    enviroment.banh = enviroment.banh   || params.banh || dims.height;
    enviroment.banw = enviroment.banw   || params.banw || dims.width;

    // TODO: browser function check for ie_versions
    var b = util.browser();
    // console.log(b);

    // console.log("Default sid", enviroment.sid);
    // console.log("Default iid", enviroment.iid);

    var body = document.getElementsByTagName('body')[0];
    var e = document.documentElement; // The Element that is the root element of the document (for example, the <html> element for HTML documents). - Read-only
    var n = navigator;
    var s = screen;
    var ie_version = util.detectIEVersion(navigator.userAgent.toLowerCase());

    var x = {
        ref: document.referrer, // document.referrer (str) - Returns the URI of the page that linked to this page.
        domain: document.domain, // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
        url: document.URL, // document.URL (str)
        base_uri: w.location.pathname, // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
        ua: navigator.userAgent, // User agent string (str)
        plat: navigator.platform, // platform of the browser (str)
        // bchrome: b.chrome, // browser specific stuff
        // bfirefox: b.firefox,
        // bmobile: b.mobile,
        // bmozilla: b.mozilla,
        // bmsie: b.msie,
        // bopera: b.opera,
        // bsafari: b.safari,
        // bversion: b.version,
        // bmainver: b.mainVersion,
        // bwebkit: b.webkit,
        iev: ie_version, // ineternet explorer version, 0="not ie" (int)
        inif: util.inIframe(), // 1 if page is in iframe else 0
        cid: enviroment.cid, // client id (str)
        curl: enviroment.curl, // client url (str)
        zid: enviroment.zid, // zone id (str)
        pid: enviroment.pid, // partner id (str)
        purl: enviroment.purl, // partner url (str)
        aid: enviroment.aid, // advertiser id (str) - ez baromsag hogy forditva van :)
        adid: enviroment.adid, // ad id (str)
        banw: enviroment.banw, // banner width (int)
        banh: enviroment.banh, // banner height (int)
        type: 'ready'
    };

    // var outQueue = [];
    // var executingQueue = false;

    // Makes a CORS AJAX request to logging server
    var req = function(url) {
        // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
        // https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Browser_compatibility
        if (ie_version < 6 && ie_version > 0) {
            // for ie < 6 we don't send fucknot
            return false;
        }
        if (ie_version > 9) {
            // ie 10+ has standards compliant XMLHttpRequest, yaaay!
            request = new XMLHttpRequest();
        }
        if (ie_version === 8 || ie_version === 9) {
            // ie 8, 9 has microsoft specific XDomainRequest, booo!
            request = new XDomainRequest();
        }
        if (ie_version === 6 || ie_version === 7) {
            // ie 6, 7 has ActiveXObjects!
            request = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        if (ie_version === 0) {
            // if it is not ie, it just works
            request = new XMLHttpRequest();
        }
        request.open('GET', url, true);
        request.send();
        request = null;
        return false;
          // var req = request();
		// outQueue.push(url);
		// if (!executingQueue && (outQueue.length >= 1)) {
		// 	executeQueue();
		// }
    };

    // function executeQueue () {

    //   console.log(outQueue.length);
    //   // Failsafe in case there is some way for a bad value like "null" to end up in the outQueue
    //   while (outQueue.length && typeof outQueue[0] !== 'string' && typeof outQueue[0] !== 'object') {
    //     outQueue.shift();
    //   }

    //   if (outQueue.length < 1) {
    //     executingQueue = false;
    //     return;
    //   }

    //   executingQueue = true;

    //   var nextRequest = outQueue[0];
    //   var img = new Image(1,1);
    //   // img.addEvent('load', function(e) { alert('Image is done loading!'); });
    //   // var img = document.createElement("img");
    //   console.log(img.complete);
    //   console.log(img.readyState);
    //   console.log(img.load);
    //   console.log(img.onload);

    //   img.onload = function () {
    //     console.log("asdfasfd");
    //     outQueue.shift();
    //     executeQueue();
    //   };


    //   img.onerror = function() {
    //     console.log("error");
    //     console.log(executingQueue);
    //     executingQueue = false;
    //   };

    //   img.src = nextRequest;

    // }

    // var i = 0;
    // function request(){
    //   var r = (Math.random() * 10000) % 10000;
    //   var x = 'http://enbritely-public.s3-website-us-east-1.amazonaws.com/a.gif?ts='+i+'&q='+r;
    //   ++i;
    //   outQueue.push(x);
    // }

    /*
     * Queue an image beacon for submission to the collector.
     * If we're not processing the queue, we'll start.
     */
    // function enqueueRequest(req) {

    // }

    // Builds a query URL from event object
    var xurl = function(obj) {
        ts = util.now();
        docdim = util.documentDimensions();
        // Attributes that should be included in all messages
        obj.ts0 = PAGELOAD_TIMESTAMP; // pageload timestamp (int)
        obj.ts  = ts; // timestamp of the event (int)đ
        obj.gvr = SCRIPT_VERSION; // gerbil.js script version (int)
        obj.wsid = enviroment.wsid; // webshop id (str)
        obj.sid = enviroment.sid; // session id (str)
        obj.iid = enviroment.iid; // impression id (str)
        obj.dw = docdim.width;
        obj.dh = docdim.height;
        obj.eh = document.documentElement.clientHeight; // Read-only property = the root element's height (int)
        obj.ew = document.documentElement.clientWidth;  // Read-only property from the root element's width (int)
        obj.bh = body.clientHeight; // Read-only property from the body element's height (int)
        obj.bw = body.clientWidth; // Read-only property from the body element's width   (int)
        obj.avw = screen.availWidth; // Available screen width in pixels (int)
        obj.avh = screen.availHeight; // Available screen height in pixels (int)
        obj.sh = screen.height; // Height of screen in pixels (int)
        obj.sw = screen.width; // Width of screen in pixels (int)
        obj.iw = w.innerWidth || document.documentElement.clientWidth; // Most unrelieable writeable width property  (int)
        obj.ih = w.innerHeight || document.documentElement.clientWidth; // Most unrelieable writeable height property (int)
        // obj.iw = -1;
        // obj.ih = -1;
        var qurl = LOGGER_URL + '?wsid=' + obj.wsid + '&data=' + Base64.encode(JSON.stringify(obj))+'&ts=' + ts;
        console.log(qurl);
        return qurl;
    };

    // Attach custom_event function to _enbrtly_ window object to call externally and send custom objects
    if (w._enbrtly_) {
        w._enbrtly_.custom_event = function(obj) {
            obj.type = 'custom';
            req(xurl(obj));
        };
    }

    // Mouse event logging
    var co = []; // Segment coordinate Array
    var ps = '';
    var pageX, pageY; // pageXY coordinates
    var viewed = false; // Viewed flag
    var handleMouseEvents = function(evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        pageX = evt.pageX; // pageX is evt.pageX if defined
        pageY = evt.pageY;
        if (pageX === undefined) {
            pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if (evt.type == 'mousemove') {
            s = util.segment(pageX, pageY, SEGMENTW);
            if (s != ps) co.push(s);
            ps = s;
        } else {
            req(xurl({
                px: pageX,
                py: pageY,
                type: evt.type
            }));
        }
    };

    // Add Event listener
    var ael = function(el, en, h) {
        if (el.addEventListener) {
            // As the standard
            el.addEventListener(en, h);
        } else {
            // IE
            el.attachEvent('on' + en, function() {
                h.call(el);
            });
        }
    }

    ael(document, 'mousemove', handleMouseEvents);
    ael(document, 'mouseover', handleMouseEvents);
    ael(document, 'mousedown', handleMouseEvents);
    ael(document, 'mouseup', handleMouseEvents);
    ael(document, 'click', handleMouseEvents);

    // Mobile events
    var touchSegments = [];
    var lastTouchSegment = '';
    var handleTouchEvents = function(evt) {
        // TODO: Multiple touch events
        var touches = evt.changedTouches;
        var px = touches[0].pageX;
        var py = touches[0].pageY;
        var sg = util.segment(px, py, SEGMENTW);
        if (lastTouchSegment != sg) touchSegments.push(sg);
        lastTouchSegment = sg;
        if (evt.type == 'touchmove') {
            s = util.segment(pageX, pageY, SEGMENTW);
            if (s != ps) co.push(s);
            ps = s;
        } else {
            req(xurl({
                px: px,
                py: py,
                type: evt.type
            }));
        }
    }
    ael(window, 'touchstart', handleTouchEvents);
    ael(window, 'touchend', handleTouchEvents);
    ael(window, 'touchmove', handleTouchEvents);

    // Scroll event handling
    // ael(window, 'scroll', handleWindowEvents);
    // ael(window, 'resize', handleWindowEvents);

    // Handle window events
    var handleWindowEvents = function(evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        req(xurl({
            type: evt.type
        }));
    };
    ael(window, 'focus', handleWindowEvents);
    ael(window, 'blur', handleWindowEvents);
    ael(window, 'beforeunload', handleWindowEvents);
    ael(window, 'unload', handleWindowEvents);

    // http://snipplr.com/view/69951/
    var setExactTimeout = function(callback, duration, resolution) {
        var start = (new Date()).getTime();
        var timeout = setInterval(function(){
            if ((new Date()).getTime() - start > duration) {
                callback();
                clearInterval(timeout);
            }
        }, resolution);
        return timeout;
    };

    // Periodically send segment Arrays, if segment Array length is > 0
    setInterval(function() {
        if (co.length > 0) {
            req(xurl({
                co: co.join('|'),
                type: 'heartbeat'
            }));
            co = [];
        }
        if (touchSegments.length > 0) {
            req(xurl({
                co: touchSegments.join('|'),
                type: 'theartbeat'
            }));
            touchSegments = [];
        }
    }, 500);

    // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
    setTimeout(function() {
        req(xurl(x));
    }, 5);

    // Send viewed message after 1 sec delay
    setExactTimeout(function() {
        if (!viewed) {
            req(xurl({
                type: 'viewed'
            }));
            viewed = true;
        }
    }, 1000, 100);

}(window));
