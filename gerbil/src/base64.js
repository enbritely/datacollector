
var Base64 = {
    d: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64.k(e);
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
            t = t + this.d.charAt(s) + this.d.charAt(o) + this.d.charAt(u) + this.d.charAt(a);
        }
        return t;
    },
    k: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        var p = String.fromCharCode;
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += p(r);
            } else if (r > 127 && r < 2048) {
                t += p(r >> 6 | 192);
                t += p(r & 63 | 128);
            } else {
                t += p(r >> 12 | 224);
                t += p(r >> 6 & 63 | 128);
                t += p(r & 63 | 128);
            }
        }
        return t;
    }
};
