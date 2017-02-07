/*jshint -W030 */
/*jshint -W061 */
(function(undefined) {
    "use strict";
    var getCurrentScript = function(script_name) {
        var scripts = document.getElementsByTagName("SCRIPT");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(script_name) > -1) {
                if (scripts[i].id === ""){
                    scripts[i].id = 'gerbil-' + i;
                    return scripts[i].src;
                }
            }
        }
    };
    // Returns an object from query string of the gerbil.js
    var getScriptParameters = function(script_url) {
        // Find all script tags for our collector if any
        var scripts = document.getElementsByTagName("SCRIPT");
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
    };
    // getElementsByClassName shim
    if( typeof document.getElementsByClassName !== "function"){
        document.getElementsByClassName= function( className, nodeName ){
            var a = [];
            var re = new RegExp('(^| )'+className+'( |$)');
            var els = nodeName.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        };
    }
    var Collector = function(parsed_params){
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
        "object"!=typeof JSON&&(JSON={}),function(){function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?i+"":"null";case"boolean":case"null":return i+"";case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;u>r;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;u>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","   ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text+="",rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(); // jshint ignore:line

        // TODO: globals check or return

        var util = {
            // Makes a CORS AJAX request to logging server with an object
            req: function(obj, env) {

                var async = true;
                if (env.seq === env.maxrequest + 1) {
                    if (obj.type === 'beforeunload' || obj.type === 'unload') {
                        async = false;
                    }
                    else {
                        return false;
                    }
                }

                var ts = util.now();

                // Attributes that should be included in all messages
                obj.ts  = ts; // timestamp of the event (int)
                obj.wsid = env.wsid;
                obj.sid = env.sid;
                obj.iid = env.iid;
                obj.seq = env.seq;

                var url = env.collector + 'a.gif?wsid=' + obj.wsid + '&event=' + obj.type + '&data=' + Base64.encode(JSON.stringify(obj))+'&ts=' + ts;

                var ie_version = util.detectIEVersion(navigator.userAgent.toLowerCase());
                // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
                // https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Browser_compatibility
                if (ie_version < 6 && ie_version > 0) {
                    // for ie < 6 we don't send fucknot
                    return false;
                }
                var r = null;
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

                // async request
                r.open('GET', url, async);

                r.send(null);
                r = null;

                console.log(obj.type);
                console.log(obj);

                env.seq++;

                return false;
            },
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
                    var kv = params[i].split("=");
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
            // Returns 1 if window is in an iframe and 0 if not
            inIframe: function() {
                try { return +(window.self !== window.top); } catch (e) { return 1; }
            },
            // Segments the page by wxw pixel squares and returns the segments coordinate as a string
            // Top left corner = 0:0
            segment: function(x, y, w) {
                return  Math.floor(x / w) + ':' +  Math.floor(y / w);
            },
            // Cookie handling functionality
            cookie: {
                prefix: '__nbrtl-',
                set: function(name, value, days) {
                    var expires;
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        console.log(date);
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
            debug: function(){
                if (window.console) {
                    if (console.log.apply) {
                        if (window.console.firebug) {
                            console.log.apply(this, arguments);
                        } else {
                            console.log.apply(console, arguments);
                        }
                    }
                }
            },
            // Add Event listener
            ael: function(el, en, h) {
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
        };

        // Generate document dimension object based on various width metrics
        var DocumentDimensions = (function() {
            var documentElement = document.documentElement;
            var body = document.getElementsByTagName('body')[0];
            var resized = false;
            return {
                dw: function() {
                    return Math.max(
                        body.scrollWidth,
                        body.offsetWidth,
                        documentElement.scrollWidth,
                        documentElement.offsetWidth,
                        documentElement.clientWidth
                    ) || 0;
                },
                dh: function() {
                    return Math.max(
                        body.scrollHeight,
                        body.offsetHeight,
                        documentElement.scrollHeight,
                        documentElement.offsetHeight,
                        documentElement.clientHeight
                    ) || 0;
                },
                eh:  function(){ return documentElement.clientHeight || 0; },
                ew:  function(){ return documentElement.clientWidth || 0; },
                bh:  function(){ return body.clientHeight || 0; },
                bw:  function(){ return body.clientWidth || 0; },
                avh: function(){ return screen.availHeight  || 0; },
                avw: function(){ return screen.availWidth  || 0; },
                sh:  function(){ return screen.height || 0; },
                sw:  function(){ return screen.width  || 0; },
                iw:  function(){ return window.innerHeight || documentElement.clientHeight || 0; },
                ih:  function(){ return window.innerWidth || documentElement.clientWidth || 0; },
                resized: resized
            };
        })();

        var ScrollState = (function() {
            var body = document.getElementsByTagName('body')[0];
            var scrolled = false;
            return {
                st: function(){ return body.scrollTop || 0; },
                sl: function(){ return body.scrollLeft || 0; },
                scrolled: scrolled,
            };
        })(undefined);

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

        var Ping = (function(){
            var pingIntervals = [1,5,10,30,60,120,300];
            var k = 0;
            var timeout = null;
            var tick = function(){
                if (k < pingIntervals.length) {
                    var evt = { type:'ping' };
                    windowEventHandler(evt);
                    k += 1;
                    // console.log("ping", k);
                    timeout = setTimeout(tick, pingIntervals[k] * 1000);
                }
            };
            var reset = function(){
                k = 0;
                clearTimeout(timeout);
                timeout = setTimeout(tick, pingIntervals[k] * 1000);
                // console.log("reset ping");
            };
            return {
                tick: tick,
                reset: reset
            };
        })();

        var Heartbeat = function(cb){
            var heartbeatInterval = 1;
            var k = 0;
            var timeout = null;
            var callback = cb;
            var tick = function(){
                var evt = { type:'ping' };
                callback.call();
                k += 1;
                timeout = setTimeout(tick, heartbeatInterval * 1000);
            };
            var reset = function(){
                k = 0;
                clearTimeout(timeout);
                timeout = setTimeout(tick, heartbeatInterval * 1000);
            };
            return {
                tick: tick,
                reset: reset
            };
        };

        var Buffer = function(){
            var list = [];
            var last = '';
            return {
                push: function(e){
                    if (e !== last) {
                        list.push(e);
                        last = e;
                    }
                },
                empty: function(){
                    var s = list.join('|');
                    list = [];
                    last = '';
                    return s;
                },
                length: function(){
                    return list.length;
                }
            };
        };

        if ("object" !== typeof(window)) {
            return false;
        }

        // Init env
        var env = {};

        // Extract parameters from script
        var params = parsed_params;

        // Initialize constants
        env.scriptVersion = "@@PACKAGEVERSION";
        env.pageload_timestamp = util.now();
        env.segmw = +parsed_params.segmw || 100;
        env.maxrequest = +parsed_params.maxr || 128;
        env.seq = 1;

        // TODO generate random hash for name
        // env.scriptName = script_url;

        console.log("GERBIL v-"+env.scriptVersion);

        // Add gerbil URL
        env.gerbil_url = params.gerbil_url;

        // Init wsid, abort if not present
        env.wsid = env.wsid || params.wsid;
        if (env.wsid === undefined) {
            throw('No WSID. Aborting.');
        }

        // Init colector
        var default_collector = (document.location.protocol === "https:") ? "https://dc-"+env.wsid+".enbrite.ly" : "http://dc-"+env.wsid+".enbrite.ly";
        env.collector = params.collector || default_collector;
        env.collector = decodeURIComponent(env.collector);
        if (env.collector[env.collector.length - 1] != '/') {
            env.collector = env.collector + '/';
        }

        console.log(env.collector);

        // TODO: try-catch connection error, and abort if host is not reachable

        // Initialize impression id and session id
        var default_sid = util.cookie.get('sid') || util.cookie.set('sid', util.randomString(16), 1);
        var default_iid = util.randomString(16);
        env.sid  = util.getURLSid() || env.sid  || params.n || params.sid || default_sid;
        env.iid  =                     env.iid  || params.n || params.iid || default_iid;

        util.debug("(sid: "+env.sid+' iid:'+env.iid+')');

        // Init impression and page identifiers
        env.pid  = env.pid    || params.esid || params.pid   || 'NAN';
        env.purl = env.purl   || params.s    || params.purl  || 'NAN';
        env.aid  = env.aid    || params.eiad || params.aid   || 'NAN';
        env.adid = env.adid   || params.eadv || params.adid  || 'NAN';
        env.zid  = env.zid    || params.epid || params.zid   || 'NAN';
        env.cid  = env.cid    || params.ebuy || params.cid   || 'NAN';
        env.curl = env.curl   || params.eenv || params.curl  || 'NAN';
        env.banh = env.banh   || params.banh || 'NAN';
        env.banw = env.banw   || params.banw || 'NAN';

        env.body = document.getElementsByTagName('body')[0];
        env.docElem = document.documentElement;

        env.inIFrame = util.inIframe();
        env.ua = navigator.userAgent; // User agent string (str)
        env.iev = util.detectIEVersion(env.ua.toLowerCase());
        env.ref = document.referrer || ''; // document.referrer (str) - Returns the URI of the page that linked to this page.
        env.domain = document.domain; // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
        env.url = document.URL; // document.URL (str)
        env.base_uri = window.location.pathname; // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
        env.lang = navigator.language;

        env.plat = navigator.platform; // platform of the browser (str)
        env.tzoHours = (new Date()).getTimezoneOffset() / 60;

        var x = {
            ts0:            env.pageload_timestamp, // pageload timestamp (int)
            gvr:            env.scriptVersion, // gerbil.js script version (int)
            ref:            env.ref, // document.referrer (str) - Returns the URI of the page that linked to this page.
            domain:         env.domain, // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
            url:            env.url, // document.URL (str)
            base_uri:       env.base_uri, // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
            ua:             env.ua, // User agent string (str)
            plat:           env.plat, // platform of the browser (str)
            iev:            env.iev, // internet explorer version, 0="not ie" (int)
            inif:           env.inIFrame,
            aid:            env.aid, // advertiser id (str)
            adid:           env.adid, // ad id (str)
            cid:            env.cid, // client id (str)
            curl:           env.curl, // client url (str)
            pid:            env.pid, // partner id (str)
            purl:           env.purl, // partner url (str)
            zid:            env.zid, // zone id (str)
            banw:           env.banw, // banner width (int)
            banh:           env.banh, // banner height (int)
            lang:           env.lang,
            tzo:            env.tzoHours,
            gurl:           env.gerbil_url,
            dw:             DocumentDimensions.dw(),
            dh:             DocumentDimensions.dh(),
            eh:             DocumentDimensions.eh(),
            ew:             DocumentDimensions.ew(),
            bh:             DocumentDimensions.bh(),
            bw:             DocumentDimensions.bw(),
            iw:             DocumentDimensions.iw(),
            ih:             DocumentDimensions.ih(),
            avw:            DocumentDimensions.avw(),
            avh:            DocumentDimensions.avh(),
            sh:             DocumentDimensions.sh(),
            sw:             DocumentDimensions.sw(),
            st:             ScrollState.st(),
            sl:             ScrollState.sl(),
            mr:             env.maxrequest,
            segw:           env.segmw,
            type:           'ready'
        };

        // Add custom macros
        for (var key in params){
            if (key[0] == '_') {
                x[key] = params[key];
            }
        }

        var mousemoveBuffer = new Buffer(),
            touchBuffer = new Buffer();

        var mouseEventHandler = function(evt) {
            evt = evt || window.event; // global window.event for ie 6,7,8
            var pageX = evt.pageX;
            var pageY = evt.pageY;
            if (pageX === undefined) {
                pageX = evt.clientX + env.body.scrollLeft + env.docElem.scrollLeft;
                pageY = evt.clientY + env.body.scrollTop + env.docElem.scrollTop;
            }
            pageX = Math.round(pageX);
            pageY = Math.round(pageY);
            switch (evt.type){
                case 'mousemove':
                    mousemoveBuffer.push(util.segment(pageX, pageY, env.segmw));
                    break;
                default:
                    util.req({
                        coords: pageX+':'+pageY,
                        type: evt.type
                    }, env);
                    break;
            }
        };

        var touchEventHandler = function(evt) {
            var touches = evt.changedTouches;
            var px = Math.round(touches[0].pageX);
            var py = Math.round(touches[0].pageY);
            var s = px+':'+py;
            touchBuffer.push(s);
        };

        var windowEventHandler = function(evt) {
            evt = evt || window.event; // global window.event for ie 6,7,8
            var obj = { type:evt.type };
            util.req(obj, env);
        };

        var scrollEventHandler = function(evt) {
            ScrollState.scrolled = true;
        };

        var resizeEventHandler = function(evt){
            DocumentDimensions.resized = true;
        };

        // Add event listeners
        util.ael(document, 'mousemove',  mouseEventHandler);
        util.ael(document, 'mousedown',  mouseEventHandler);
        util.ael(document, 'mouseup',    mouseEventHandler);
        util.ael(document, 'click',      mouseEventHandler);
        util.ael(window, 'touchstart',   touchEventHandler);
        util.ael(window, 'touchend',     touchEventHandler);
        util.ael(window, 'touchmove',    touchEventHandler);

        util.ael(window, 'resize',       resizeEventHandler);
        util.ael(window, 'scroll',       scrollEventHandler);
        util.ael(window, 'focus',        windowEventHandler);
        util.ael(window, 'blur',         windowEventHandler);
        util.ael(window, 'beforeunload', windowEventHandler);
        util.ael(window, 'load',         windowEventHandler);
        util.ael(window, 'unload',       windowEventHandler);

        var state = function() {

            var obj = { type:'heartbeat' };
            var changed = false;

            if (mousemoveBuffer.length() > 0) {
                obj.mousemove_heartbeat = mousemoveBuffer.length();
                obj.mousemove_coords = mousemoveBuffer.empty();
                changed = true;
            }

            if (touchBuffer.length() > 0) {
                obj.touch_heartbeat = touchBuffer.length();
                obj.touch_coords = touchBuffer.empty();
                changed = true;
            }

            if (DocumentDimensions.resized) {
                obj.dw  = DocumentDimensions.dw(),
                obj.dh  = DocumentDimensions.dh(),
                obj.eh  = DocumentDimensions.eh(),
                obj.ew  = DocumentDimensions.ew(),
                obj.bh  = DocumentDimensions.bh(),
                obj.bw  = DocumentDimensions.bw(),
                obj.iw  = DocumentDimensions.iw(),
                obj.ih  = DocumentDimensions.ih(),
                obj.avw = DocumentDimensions.avw(),
                obj.avh = DocumentDimensions.avh(),
                obj.sh  = DocumentDimensions.sh(),
                obj.sw  = DocumentDimensions.sw(),
                obj.resize_heartbeat = 1;
                changed = true;
                DocumentDimensions.resized = false;
            }

            if (ScrollState.scrolled) {
                obj.st = ScrollState.st();
                obj.sl = ScrollState.sl();
                obj.scroll_heartbeat = 1;
                changed = true;
                ScrollState.scrolled = false;
            }
            if (changed) {
                util.req(obj, env);
                Ping.reset();
            }
        };

        var hb = new Heartbeat(state);
        hb.tick();

        // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
        setTimeout(function() {
            util.req(x, env);
        }, 5);

        setTimeout(function() {
            util.req(Performance.get(), env);
        }, 1000);

        Ping.tick();

    };

    window.__enbrtly_collectors = window.__enbrtly_collectors || [];
    var gerbil_url = getCurrentScript('gerbil');
    var parsed_params = getScriptParameters(gerbil_url);
    parsed_params.gerbil_url =  gerbil_url;
    window.__enbrtly_collectors.push(new Collector(parsed_params));

}());
