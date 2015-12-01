/*jshint -W030 */
/*jshint -W061 */
(function(w) {
    "use strict";
    // Base64 encoding ONLY
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
        }
    };

    // Minified JSON encoding support for IE6 and IE7
    // Copy pasted from here:
    // https://cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min.js
    "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?i+"":"null";case"boolean":case"null":return i+"";case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;u>r;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;u>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","   ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text+="",rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(); // jshint ignore:line

    var util = {
        getURLSid: function() {
            var paramName = "enby_sid";
            var query = document.location.search.split("?");
            if(query.length < 2) {
                return undefined;
            }
            var paramPart = query[1];
            if (paramPart.indexOf("?") === 0) {
                paramPart = paramPart.substr(1);
            }
            var params = paramPart.split("&");
            for (var i = 0; i < params.length; i++) {
                kv = params[i].split("=");
                if (kv.length < 2 || kv[0].toLowerCase() !== paramName) {
                    continue;
                } else {
                    return kv[1];
                }
            }
        },
        fetchLinks: function() {
            var result = {};
            var tags = ['script','img','a','iframe'];
            for (var tag in tags) {
                var l = [];
                var tag_elements = document.getElementsByTagName(tags[tag]);
                console.log(tags[tag] + ": " + tag_elements.length);
                for (var e in tag_elements) {
                    var cur = tag_elements[e];
                    var v = cur.src || cur.href;
                    if(v !== null) {
                        l.push(v);
                    }
                }
                result[tags[tag]] = l;
            }
            return result;
        },
        fetchIfIframe: function() {
            if (util.inIframe()) {
                return util.fetchLinks();
            } else {
                return undefined;
            }
        },
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
            };
        },
        // Cookie handling functionality
        cookie: {
          prefix: '__nbrtl-',
          set: function(name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else {
                    expires = "";
                }
              document.cookie = this.prefix + name + "=" + value + expires + "; path=/";
              return value;
          },
          get: function (name) {
              var nameEQ = this.prefix + name + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
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
        hasElementFromPoint: function() { return document.elementFromPoint !== undefined; },
        // http://jsfiddle.net/uthyZ/
        // http://math.stackexchange.com/questions/99565/simplest-way-to-calculate-the-intersect-area-of-two-rectangles
        checkoverlay: function(el,rt,rl,w,h) {
            var c = [
                [rl + w * 0.5, rt + h * 0.5],
                [rl + w * 0.25, rt + h * 0.25],[rl + w * 0.25, rt + h * 0.75],
                [rl + w * 0.75, rt + h * 0.25],[rl + w * 0.75, rt + h * 0.75]
            ];
            for (var k in c){
                if (c[k][0] >= 0 & c[k][1] >= 0) {
                    var gp = document.elementFromPoint(c[k][0], c[k][1]);
                    if (el !== gp & gp !== null) {
                        var frect = gp.getBoundingClientRect();
                        var x_overlap = Math.max(0, Math.min(frect.right,rect.right) - Math.max(frect.left,rect.left));
                        var y_overlap = Math.max(0, Math.min(frect.bottom,rect.bottom) - Math.max(frect.top,rect.top));
                        var overlapArea = x_overlap * y_overlap;
                        return overlapArea;
                    }
                }
            }
            return 0;
        },
        // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
        elementState: function (el) {
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();
            // TODO: fel van cserélve a magasság s a szélesség, de báncsuk, na
            var width  = rect.bottom - rect.top;
            var height = rect.right - rect.left;

            var offTop = (window.innerHeight || document.documentElement.clientHeight) - rect.bottom;
            var offTop2 = Math.min(rect.top, 0);
            var offLeft = (window.innerWidth || document.documentElement.clientWidth) - rect.right;
            var offLeft2 = Math.min(rect.left, 0);
            var viewablePortionVertical = Math.min(Math.max(0, width + offTop), Math.max(0, width + offTop2));
            var viewablePortionHorizontal = Math.min(Math.max(0, height + offLeft), Math.max(0, height + offLeft2));
            var pixelsViewable = viewablePortionVertical * viewablePortionHorizontal;
            var pixelsAd = width * height;
            var proportion = (pixelsViewable / pixelsAd) || 0.0;
            var corrected_proportion = proportion;
            var overlapArea = 0;

            if (proportion > 0.0 & util.hasElementFromPoint()) {
                overlapArea = util.checkoverlay(el, rect.top, rect.left, width, height);
                corrected_proportion = proportion * (pixelsAd - overlapArea) / pixelsAd;
            }

            return {
                eid: el.id,
                pview: proportion,
                cpview: corrected_proportion,
                overlap: overlapArea,
                pixview: pixelsViewable,
                pixad: pixelsAd,
                rt: rect.top,
                rb: rect.bottom,
                rr: rect.right,
                rl: rect.left,
            };

        },
    };

    // Initialize constants
    var SCRIPT_VERSION = "@@PACKAGEVERSION";
    var PAGELOAD_TIMESTAMP = util.now();
    var SEGMENTW = 10;
    var GERBIL_NAME = "ferret";
    var PING_INDEX = 0;

    console.log("GERBIL v-"+SCRIPT_VERSION);

    // Try extracting parameters from the URL
    var params = util.getQueryParams(GERBIL_NAME);

    var usecookie = false || params.usecookie;
    var default_iid, default_sid;

    // TODO: default adbox creation if not found
    var ADBOX_ID = params.adboxid || params.sid || null;
    var adboxFound = +(document.getElementById(ADBOX_ID) !== null);
    console.log(ADBOX_ID, "foundAdbox:", adboxFound);

    if (usecookie === "0") {
       default_sid = util.randomString(16);
       default_iid = default_sid;
    }
    else {
       default_sid = util.cookie.get('sid') || util.cookie.set('sid', util.randomString(16), 1);
       default_iid = util.randomString(16);
    }

    console.log("Default sid: ", default_sid);
    console.log("Default iid: ", default_iid);

    // Initialize enviroment
    // TODO: environment building
    var enviroment = window._enbrtly_ || {};
    enviroment.wsid = enviroment.wsid || params.wsid;

    if (enviroment.wsid === undefined) {
        throw('No WSID. Aborting.');
    }

    var default_collector = (location.protocol === "https:") ? "https://dc-"+enviroment.wsid+".enbrite.ly" : "http://dc-"+enviroment.wsid+".enbrite.ly";

    // TODO: add params collector support in request URL
    // var params_collector = params.collector && decodeURIComponent(params.collector);

    var LOGGER_URL = enviroment.collector || default_collector;
    var urlSid = util.getURLSid(location);

    // TODO: try-catch connection error, and abort if host is not reachable

    enviroment.sid  = urlSid || enviroment.sid || params.n || params.sid || default_sid;
    enviroment.iid  = enviroment.iid    || params.n    || params.iid         || default_iid;
    enviroment.pid  = enviroment.pid    || params.esid || params.pid         || 'NAN';
    enviroment.purl = enviroment.purl   || params.s    || params.purl        || 'NAN';
    enviroment.aid  = enviroment.aid    || params.eiad || params.aid         || 'NAN';
    enviroment.adid = enviroment.adid   || params.eadv || params.adid        || 'NAN';
    enviroment.zid  = enviroment.zid    || params.epid || params.zid         || 'NAN';
    enviroment.cid  = enviroment.cid    || params.ebuy || params.cid         || 'NAN';
    enviroment.curl = enviroment.curl   || params.eenv || params.curl        || 'NAN';

    // var dims = util.documentDimensions();
    enviroment.banh = enviroment.banh   || params.banh || -1;
    enviroment.banw = enviroment.banw   || params.banw || -1;

    var body = document.getElementsByTagName('body')[0];

    var docdim = util.documentDimensions();
    var x = {
        ts0: PAGELOAD_TIMESTAMP, // pageload timestamp (int)
        gvr: SCRIPT_VERSION, // gerbil.js script version (int)
        ref: document.referrer, // document.referrer (str) - Returns the URI of the page that linked to this page.
        domain: document.domain, // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
        url: document.URL, // document.URL (str)
        base_uri: w.location.pathname, // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
        ua: navigator.userAgent, // User agent string (str)
        plat: navigator.platform, // platform of the browser (str)
        iev: util.detectIEVersion(navigator.userAgent.toLowerCase()), // internet explorer version, 0="not ie" (int)
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
        adboxfound: adboxFound,
        lang: navigator.language,
        dw: docdim.width,
        dh: docdim.height,
        eh: document.documentElement.clientHeight, // Read-only property: the root element's height (int)
        ew: document.documentElement.clientWidth,  // Read-only property from the root element's width (int)
        bh: body.clientHeight, // Read-only property from the body element's height (int)
        bw: body.clientWidth, // Read-only property from the body element's width   (int)
        iw: w.innerWidth || document.documentElement.clientWidth, // Most unrelieable writeable width property  (int)
        ih: w.innerHeight || document.documentElement.clientHeight, // Most unrelieable writeable height property (int)
        avw: screen.availWidth, // Available screen width in pixels (int)
        avh: screen.availHeight, // Available screen height in pixels (int)
        sh: screen.height, // Height of screen in pixels (int)
        sw: screen.width, // Width of screen in pixels (int)
        type: 'ready'
    };

    // Add custom macros
    for (var key in params){
        if (key[0] == '_') {
            x[key] = params[key];
        }
    }

    // Makes a CORS AJAX request to logging server from an object
    var req = function(obj) {

        var ts = util.now();

        // Attributes that should be included in all messages
        obj.ts  = ts; // timestamp of the event (int)
        obj.wsid = enviroment.wsid; // webshop id (str)
        obj.sid = enviroment.sid; // session id (str)
        obj.iid = enviroment.iid; // impression id (str)

        var url = LOGGER_URL + '?wsid=' + obj.wsid + '&data=' + Base64.encode(JSON.stringify(obj))+'&ts=' + ts;

        if (obj.type != 'ping') { PING_INDEX = 0; }

        // console.log(obj);

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
        // console.log(obj['type']);
        console.log(obj);
        return false;
    };

    // Attach custom_event function to _enbrtly_ window object to call externally and send custom objects
    if (w._enbrtly_) {
        w._enbrtly_.custom_event = function(obj) {
            obj.type = 'custom';
            req(obj);
        };
    }

    var getAdboxState = function(adbox_id){
        var el = document.getElementById(adbox_id);
        if (el===null) {
            adboxFound = 0;
            return {
                propview: -1.0
            };
        }
        else {
            adboxFound = 1;
            return util.elementState(el);
        }
    };

    // Mouse event logging
    var co = []; // Segment coordinate Array
    var mouseOverBuffer = []; // Mouseover segment coordinate Array
    var ps = '';
    var prevMouseOver = '';
    var pageX, pageY; // pageXY coordinates
    var viewed = false; // Viewed flag
    var inad = 0;
    var handleMouseEvents = function(evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        inad = ((evt.target.id == ADBOX_ID)+0) || 0;
        pageX = evt.pageX; // pageX is evt.pageX if defined
        pageY = evt.pageY;
        if (pageX === undefined) {
            pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        pageX = Math.round(pageX);
        pageY = Math.round(pageY);
        var s;
        switch (evt.type){
            case 'mousemove':
                s = util.segment(pageX, pageY, SEGMENTW);
                if (s != ps) co.push(s);
                ps = s;
                break;
            case 'mouseover':
                s = pageX+':'+pageY;
                if (s != prevMouseOver) mouseOverBuffer.push(s);
                prevMouseOver = s;
                break;
            default:
                req({
                    coords: pageX+':'+pageY,
                    type: evt.type
                });
                break;
        }
    };

    // Mobile events
    var touchStartSegments = [];
    var lastTouchStartSegment = '';
    var handleTouchEvents = function(evt) {
        inad = ((evt.target.id == ADBOX_ID)+0) || 0;
        var touches = evt.changedTouches;
        var px = Math.round(touches[0].pageX);
        var py = Math.round(touches[0].pageY);
        var s = px+':'+py;
        if (s != lastTouchStartSegment) touchStartSegments.push(s);
        lastTouchStartSegment = s;
    };

    var adbox_prev_corrected_proportion = -1.0;
    var ab_state = {
        adboxfound: adboxFound,
        cp0:0,
        cp0_50:0,
        cp50_100:0,
        cp100:0,
        iabview:0,
        inad:0,
        cpview:0,
        pview:0,
        eid: 'NONE',
        overlap: 0,
        pixview: 0,
        pixad: 0,
        rt: 0,
        rb: 0,
        rr: 0,
        rl: 0,
        type: 'adchange'
    };
    var resized = false;
    var scrolled = false;
    var adbox_changed = false;

    // Handle window events
    var handleWindowEvents = function(evt) {
        evt = evt || window.event; // global window.event for ie 6,7,8
        var p = { type:evt.type };
        p.adboxfound = adboxFound;
        p.cp0 = ab_state.cp0;
        p.cp0_50 = ab_state.cp0_50;
        p.cp50_100 = ab_state.cp50_100;
        p.cp100 = ab_state.cp100;
        p.iabview = ab_state.iabview;
        p.inad = ab_state.inad;
        req(p);
    };

    var handleScrollEvent = function(evt) {
        scrolled = true;
    };

    var handleResizeEvent = function(evt){
        resized = true;
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
    ael(document, 'mousemove',  handleMouseEvents);
    ael(document, 'mouseover',  handleMouseEvents);
    ael(document, 'mousedown',  handleMouseEvents);
    ael(document, 'mouseup',    handleMouseEvents);
    ael(document, 'click',      handleMouseEvents);

    ael(window, 'touchstart',   handleTouchEvents);
    ael(window, 'touchend',     handleTouchEvents);
    ael(window, 'touchmove',    handleTouchEvents);

    ael(window, 'resize',       handleResizeEvent);

    ael(window, 'scroll',       handleScrollEvent);

    ael(window, 'focus',        handleWindowEvents);
    ael(window, 'blur',         handleWindowEvents);
    ael(window, 'beforeunload', handleWindowEvents);
    ael(window, 'load',         handleWindowEvents);
    ael(window, 'unload',       handleWindowEvents);

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

    setInterval(function() {

        var obj = {
            type:'heartbeat'
        };
        var changed = false;

        if (co.length > 0) {
            obj.co = co.join('|');
            obj.co_heartbeat = co.length;
            co = [];
            changed = true;
            console.log('Added mousemove coords', obj.co_heartbeat);
        }

        if (mouseOverBuffer.length > 0) {
            obj.mouseover_coords = mouseOverBuffer.join('|');
            obj.mouseover_heartbeat = mouseOverBuffer.length;
            mouseOverBuffer = [];
            changed = true;
            console.log('Added mouseover coords', obj.mouseover_heartbeat);
        }

        if (touchStartSegments.length > 0) {
            obj.touch_coords = touchStartSegments.join('|');
            obj.touch_heartbeat = touchStartSegments.length;
            touchStartSegments = [];
            changed = true;
            console.log('Added touch coords', obj.touch_heartbeat);
        }

        if (resized) {
            obj.dw = docdim.width;
            obj.dh = docdim.height;
            obj.eh = document.documentElement.clientHeight; // Read-only property = the root element's height (int)
            obj.ew = document.documentElement.clientWidth;  // Read-only property from the root element's width (int)
            obj.bh = body.clientHeight; // Read-only property from the body element's height (int)
            obj.bw = body.clientWidth; // Read-only property from the body element's width   (int)
            obj.iw = w.innerWidth || document.documentElement.clientWidth; // Most unrelieable writeable width property  (int)
            obj.ih = w.innerHeight || document.documentElement.clientWidth; // Most unrelieable writeable height property (int)
            obj.avw = screen.availWidth; // Available screen width in pixels (int)
            obj.avh = screen.availHeight; // Available screen height in pixels (int)
            obj.sh = screen.height; // Height of screen in pixels (int)
            obj.sw = screen.width; // Width of screen in pixels (int)
            obj.resize_heartbeat = 1;
            changed = true;
            resized = false;
            console.log('Added resize dimensions');
        }

        if (scrolled) {
            obj.st = document.body.scrollTop;
            obj.sl = document.body.scrollLeft;
            obj.scroll_heartbeat = 1;
            changed = true;
            scrolled = false;
            console.log('Added scrolled dimensions');
        }

        if (changed) {
            obj.adboxfound = adboxFound;
            obj.cp0 = ab_state.cp0;
            obj.cp0_50 = ab_state.cp0_50;
            obj.cp50_100 = ab_state.cp50_100;
            obj.cp100 = ab_state.cp100;
            obj.iabview = ab_state.iabview;
            obj.inad = ab_state.inad;
            req(obj);
        }

        // Send periodical pings
        if ( ((++PING_INDEX % 60) === 0) & ((util.now() - PAGELOAD_TIMESTAMP) < 5*60*1000)) {
            var evt = { type:'ping' };
            handleWindowEvents(evt);
        }

        //console.log('ADBOX state', ab_state.cp0, ab_state.cp0_50, ab_state.cp50_100, ab_state.cp100, ab_state.inad, ab_state.iabview, ab_state.cpview, ab_state.pview);

    }, 500);

    // Periodically send segment updates for viewability
    var sfreq = 10;
    var pt = PAGELOAD_TIMESTAMP;
    var abto = setInterval(function(){
        var adbox_curr_state = getAdboxState(ADBOX_ID);
        var t = util.now();
        var dt = t - pt;
        pt = t;

        ab_state.cp0 += (adbox_curr_state.cpview === 0.0)*dt;
        ab_state.cp0_50 += ((adbox_curr_state.cpview > 0.0) & (adbox_curr_state.cpview < 0.5))*dt;
        ab_state.cp50_100 += (adbox_curr_state.cpview >= 0.5)*dt;
        ab_state.cp100 += (adbox_curr_state.cpview == 1.0)*dt;
        ab_state.inad += inad*dt;
        ab_state.iabview = (ab_state.cp50_100 >= 1000.0)+0;

        // Adbox state akkor érdekes, ha változott
        ab_state.adboxfound = adboxFound;
        ab_state.cpview = adbox_curr_state.cpview;
        ab_state.pview = adbox_curr_state.pview;
        ab_state.eid = adbox_curr_state.eid;
        ab_state.overlap = adbox_curr_state.overlap;
        ab_state.pixview = adbox_curr_state.pixview;
        ab_state.pixad = adbox_curr_state.pixad;
        ab_state.rt = adbox_curr_state.rt;
        ab_state.rb = adbox_curr_state.rb;
        ab_state.rr = adbox_curr_state.rr;
        ab_state.rl = adbox_curr_state.rl;
        // console.log(adbox_curr_state.cpview != adbox_prev_corrected_proportion);
        if (adbox_curr_state.cpview != adbox_prev_corrected_proportion) {
            adbox_prev_corrected_proportion = adbox_curr_state.cpview;
            req(ab_state);
        }
    }, 1000/sfreq);


    // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
    setTimeout(function() {
        req(x);
    }, 5);

    // Send links
    if (params.getlinks==="1") {
        setTimeout(function(){
            req({
                links: util.fetchIfIframe(),
                type: 'links'
            });
        }, 100);
    }

    // Send viewed message after 1 sec delay
    setExactTimeout(function() {
        if (!viewed) {
            req({
                type: 'viewed'
            });
            viewed = true;
        }
    }, 1000, 100);

}(window));
