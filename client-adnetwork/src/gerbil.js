;(function(w) {
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
    "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,f,u,p=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?a+"":"null";case"boolean":case"null":return a+"";case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(f=a.length,r=0;f>r;r+=1)u[r]=str(r,a)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+p+"]":"["+u.join(",")+"]",gap=p,o}if(rep&&"object"==typeof rep)for(f=rep.length,r=0;f>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,a),o&&u.push(quote(n)+(gap?": ":":")+o));else for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o=str(n,a),o&&u.push(quote(n)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+p+"}":"{"+u.join(",")+"}",gap=p,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","    ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text+="",cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

    // IE version detection
    var detect_ie = function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return 0;
    }

    // Returns UTC timestamp in milliseconds
    var now = function(){
        return new Date().getTime();
    }

    var LOGGER_URL = 'http://bd-prod-collector-propads-654752744.us-east-1.elb.amazonaws.com'; // Logging server URL
    var SCRIPT_VERSION = 'ad-1.2';
    var ord = 0;
    var pl = now();
    var en = w._enbrtly_;
    var d = en.document;
    var b = d.getElementsByTagName('body')[0];
    var e = d.documentElement;                    // The Element that is the root element of the document (for example, the <html> element for HTML documents). - Read-only
    var n = navigator;
    var s = screen;
    var ie_version = detect_ie();

    var x = {
        cid:        en.cid,                         // client id (str)
        curl:       en.curl,                        // client url (str)
        zid:        en.zid,                         // zone id (str)
        pid:        en.pid,                         // partner id (str)
        purl:       en.purl,                        // partner url (str)
        aid:        en.aid,                         // advertiser id (str) - ez baromsag hogy forditva van :)
        adid:       en.adid,                        // ad id (str)
        banw:       en.banw,                        // banner width (int)
        banh:       en.banh,                        // banner height (int)
        ref:        d.referrer,                     // document.referrer (str) - Returns the URI of the page that linked to this page.
        domain:     d.domain,                       // document.domain (str) -  The domain portion of the origin of the current document, as used by the same origin policy
        url:        d.URL,                          // document.URL (str)
        base_uri:   w.location.pathname,            // a DOMString (a UTF-16 String) containing an initial '/' followed by the path of the URL. (str)
        ua:         n.userAgent,                    // User agent string (str)
        plat:       n.platform,                     // platform of the browser (str)
        iev:        ie_version,                     // ineternet explorer version, 0="not ie" (int)
        eh:         e.clientHeight,                 // Read-only property: the root element's height (int)
        ew:         e.clientWidth,                  // Read-only property from the root element's width   (int)
        bh:         b.clientHeight,                 // Read-only property from the body element's height (int)
        bw:         b.clientWidth,                  // Read-only property from the body element's width   (int)
        iw:         w.innerWidth  || e.clientWidth, // Most unrelieable writeable width property  (int)
        ih:         w.innerHeight || e.clientWidth, // Most unrelieable writeable height property    (int)
        avw:        s.availWidth,                   // Available screen width in pixels (int)
        avh:        s.availHeight,                  // Available screen height in pixels (int)
        sh:         s.height,                       // Height of screen in pixels (int)
        sw:         s.width,                        // Width of screen in pixels (int)
        type: 'ready'
    };

    var evtc = {
        ready: 1,
        click: 0,
        mousemove: 0,
        mouseup: 0,
        mousedown: 0,
        mouseover: 0,
        sn: 0,
        sent: 0,
        charlen: 0
    };

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
        if (ie_version == 6 || ie_version === 7){
            // ie 6, 7 has ActiveXObjects!
            request = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        if (ie_version === 0){
            // if it is not ie, it just works
            request = new XMLHttpRequest();
        }
        request.open('GET', url, true);
        request.send();
        request = null;
        evtc.sent += 1;
        evtc.charlen += url.length;
        return false;
    };

    // Builds a query URL from event object
    var xurl = function(obj) {
        ts = now();
        // Attributes that should be included in all messages
        obj.ts0     = pl;               // pageload timestamp (int)
        obj.ts      = ts;               // timestamp of the event (int)
        obj.ord     = ord++;            // the number of the message in the current pageload (int)
        obj.scrv    = SCRIPT_VERSION;   // script version (str)
        obj.wsid    = en.wsid;          // webshop id (str)
        obj.sid     = en.sid;           // session id (str)
        obj.iid     = en.iid;           // impression id (str)
        return LOGGER_URL + '?ts=' + ts + '&wsid=' + obj.wsid + '&data=' + Base64.encode(JSON.stringify(obj));
    };

    // Segments the page by wxw pixel squares and returns the segments coordinate as astring
    // Top left corner = 0
    var se = function(x, y, w) {
        var f = Math.floor;
        return f(x / w) + ':' + f(y / w);
    };

    var co = [];
    var ps = '';
    var o = {};
    var pageX, pageY;
    var viewed = false;
    var evlog = function(evt) {
        evt = evt || window.event;  // global window.event for ie 6,7,8
        pageX = evt.pageX;          // pageX is evt.pageX if defined
        pageY = evt.pageY;
        if (pageX === undefined) {
            pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        evtc[evt.type] += 1;
        if (evt.type == 'mousemove') {
            s = se(pageX, pageY, 20);
            if (s != ps) {
                co.push(s);
                evtc.sn++;
                ps = s;
            }
        } else {
            req(xurl({
                px:     pageX,
                py:     pageY,
                sx:     evt.screenX,
                sy:     evt.screenY,
                ox:     evt.offsetX,
                oy:     evt.offsetY,
                cx:     evt.clientX,
                cy:     evt.clientY,
                ere:    evtc.ready,
                edwn:   evtc.mousedown,
                eup:    evtc.mouseup,
                ecl:    evtc.click,
                emov:   evtc.mousemove,
                eov:    evtc.mouseover,
                ese:    evtc.sent,
                sn:     evtc.sn,
                chlen:  evtc.charlen,
                type:   evt.type
            }));
        }
    };

    // Event listener
    function addEventListener(el, en, h) {
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

    // Attach listeners to the document
    addEventListener(d, 'mousemove', evlog);
    addEventListener(d, 'mouseover', evlog);
    addEventListener(d, 'mousedown', evlog);
    addEventListener(d, 'mouseup', evlog);
    addEventListener(d, 'click', evlog);

    // Periodically send segment Arrays, if segment Array length is > 0
    var ukk = setInterval(function(){
        if (co.length > 0) {
            req(xurl({
                co:     co.join('|'),
                ere:    evtc.ready,
                edwn:   evtc.mousedown,
                eup:    evtc.mouseup,
                ecl:    evtc.click,
                emov:   evtc.mousemove,
                eov:    evtc.mouseover,
                sn:     evtc.sn,
                ese:    evtc.sent,
                chlen:  evtc.charlen,
                type:   'heartbeat'
            }));
            co = [];
        }
        // Send viewed message after 1 sec delay
        if (!viewed) {
            req(xurl({
                ere:    evtc.ready,
                edwn:   evtc.mousedown,
                eup:    evtc.mouseup,
                ecl:    evtc.click,
                emov:   evtc.mousemove,
                eov:    evtc.mouseover,
                sn:     evtc.sn,
                ese:    evtc.sent,
                chlen:  evtc.charlen,
                type:   'viewed'
            }));
            viewed = true;
        }
    }, 1000);
    // Send pageview message after 5 ms (IE8 fucks up smthing, this is a hack)
    var mukk = setTimeout(function(){req(xurl(x));}, 5);
}(window));
