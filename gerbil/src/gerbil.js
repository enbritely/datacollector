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
        if (target === null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null) { // Skip over if undefined or null
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
            return s;
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
    }, 1000);

    // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
    setTimeout(function () {
        req(x);
    }, 5);

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

}(null));
