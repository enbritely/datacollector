(function(w) {

    var BASE_URL = 'http://bd-prod-collector-propads-654752744.us-east-1.elb.amazonaws.com';

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

    var req = function(url) {
        request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send();
        request = null;
    };

    var xurl = function(obj) {
        return BASE_URL + '?wsid=' + x.wsid + '&data=' + Base64.encode(JSON.stringify(obj));
    };
    var se = function(x, y, w) {
        var f = Math.floor;
        return f(x / w) + ':' + f(y / w);
    };

    var ord = 0;
    var pl = new Date().getTime();
    var en = w._enbrtly_;
    var d = en.document;
    var b = d.getElementsByTagName('body')[0];
    var e = d.documentElement;
    var n = navigator;
    var s = screen;

    var x = {
        ts0: pl,
        ord: ord,
        sid: en.sid,
        iid: en.iid,
        wsid: en.wsid,
        pid: en.pid,
        purl: en.purl,
        aid: en.aid,
        adid: en.adid,
        hid: en.hid,
        banw: en.banw,
        banh: en.banh,
        host: d.baseURI,
        ref: d.referrer,
        domain: d.domain,
        url: d.URL,
        ua: n.userAgent,
        plat: n.platform,
        eh: e.clientHeight,
        ew: e.clientWidth,
        bh: b.clientHeight,
        bw: b.clientWidth,
        base_uri: w.location.pathname,
        iw: w.innerWidth,
        ih: w.innerHeight,
        ow: w.outerWidth,
        oh: w.outerHeight,
        avw: s.availWidth,
        avh: s.availHeight,
        sh: s.height,
        sw: s.width,
        type: 'ready'
    };

    req(xurl(x));

    var evtc = {
        ready: 1,
        click: 0,
        mousemove: 0,
        mouseup: 0,
        mousedown: 0,
        mouseover: 0
    };

    var co = [];
    var ps, jstr, b64e, ts = '';
    var o = {};
    var evlog = function(evt) {
        ts = new Date().getTime();
        o = {
            wsid: x.wsid,
            sid: x.sid,
            ts0: pl,
            ts: ts,
            ord: ord++,
            px: evt.pageX,
            sx: evt.screenX,
            ox: evt.offsetX,
            py: evt.pageY,
            sy: evt.screenY,
            oy: evt.offsetY,
            type: evt.type
        };
        evtc[evt.type] += 1;
        if (evt.type == 'mousemove') {
            s = se(o.sx, o.sy, 20);
            if (s != ps) {
                co.push(s);
                ps = s;
            }
            if (co.length > 5) {
                o = {
                    ts0: pl,
                    ts: ts,
                    wsid: x.wsid,
                    sid: x.sid,
                    co: co.join('|'),
                    evtc: evtc,
                    type: evt.type
                };
                req(xurl(o));
                co = [];
            }
        } else {
            req(xurl(o));
        }
    };

    function addEventListener(el, en, h) {
        if (el.addEventListener) {
            el.addEventListener(en, h);
        } else {
            el.attachEvent('on' + en, function() {
                h.call(el);
            });
        }
    }

    addEventListener(d, 'mousemove', evlog);
    addEventListener(d, 'mouseover', evlog);
    addEventListener(d, 'mousedown', evlog);
    addEventListener(d, 'mouseup', evlog);
    addEventListener(d, 'click', evlog);

}(window));
