// Data functions
var fns = (function(jq_module) {

    var getHost = function() {
        var pathArray = window.location.href.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '://' + host;
        return url;
    }

    function getPathFromUrl(url) {
        return url.split("?")[0];
    }
	
    var n_ord = 0;
    var t0 = new Date().getTime();
    var util = require('./util');
    var cookie = require("./cookie");
    var vid = cookie.get("vid");

    return {
        vid: function(event, node) {
            return vid;
        },
        sid: function(event, node) {
            return event.data.sid;
        },
        meta: function(event, node) {
            return event.data.meta;
        },
        wsid: function(event, node) {
            return event.data.base.wsid;
        },
        scrv: function(event, node) {
            return event.data.base.scriptVersion;
        },
        msgID: function(event, node) {
            return event.data.msgID;
        },
        dump: function(event, node) {
            return console.log(event);
        },
        ord: function(event, node) {
            return n_ord++;
        },
        t0: function(event, node) {
            return t0;
        },
        eid: function(event, node) {
            return util.elementPath(node);
        },
        ts0: function(event, node) {
            return new Date().getTime();
        },
        type: function(event, node) {
            return event.type;
        },
        py: function(event, node) {
            return event.pageY;
        },
        px: function(event, node) {
            return event.pageX;
        },
        nw: function(event, node) {
            return node.width();
        },
        nh: function(event, node) {
            return node.height();
        },
        ow: function(event, node) {
            return node.outerWidth();
        },
        oh: function(event, node) {
            return node.outerHeight();
        },
        iw: function(event, node) {
            return node.innerWidth();
        },
        ih: function(event, node) {
            return node.innerHeight();
        },
        tn: function(event, node) {
            return node.nodeName;
        },
        id: function(event, node) {
            return node.attr("id");
        },
        src: function(event, node) {
            return node.attr("src");
        },
        href: function(event, node) {
            return node.attr("href");
        },
        title: function(event, node) {
            return jq_module(document).attr("title");
        },
        acn: function(event, node) {
            return navigator.appCodeName;
        },
        an: function(event, node) {
            return navigator.appName;
        },
        av: function(event, node) {
            return navigator.appVersion;
        },
        vend: function(event, node) {
            return navigator.vendor;
        },
        psub: function(event, node) {
            return navigator.productSub;
        },
        prod: function(event, node) {
            return navigator.product;
        },
        ua: function(event, node) {
            return navigator.userAgent;
        },
        lang: function(event, node) {
            return navigator.language;
        },
        ce: function(event, node) {
            return navigator.cookieEnabled;
        },
        plat: function(event, node) {
            return navigator.platform;
        },
        domain: function(event, node) {
            return window.location.host;
        },
        base_uri: function(event, node) {
            return window.location.pathname;
        },
        tzo: function(event, node) {
            return new Date().getTimezoneOffset();
        },
        cd: function(event, node) {
            return screen.colorDepth;
        },
        sh: function(event, node) {
            return screen.height;
        },
        sw: function(event, node) {
            return screen.width;
        },
        avh: function(event, node) {
            return screen.availHeight;
        },
        avw: function(event, node) {
            return screen.availWidth;
        },
        st: function(event, node) {
            if (util.isUndefined(pageYOffset)) {
                //most browsers except IE before #9
                return pageYOffset;
            } else {
                var B = document.body; //IE 'quirks'
                var D = document.documentElement; //IE with doctype
                D = (D.clientHeight) ? D : B;
                return D.scrollTop;
            }
        },
        sl: function(event, node) {
            if (util.isUndefined(pageXOffset)) {
                //most browsers except IE before #9
                return pageXOffset;
            } else {
                var B = document.body; //IE 'quirks'
                var D = document.documentElement; //IE with doctype
                D = (D.clientWidth) ? D : B;
                return D.scrollLeft;
            }
        },
        dh: function(event, node) {
            return jq_module(document).height();
        },
        dw: function(event, node) {
            return jq_module(document).width();
        },
        wh: function(event, node) {
            return jq_module(window).height();
        },
        ww: function(event, node) {
            return jq_module(window).width();
        },
        ip: function(event, node) {
            return "<ip>";
        },
        sts: function(event, node) {
            return "<sts>";
        },
        lnks: function(event, node) {
            var links = [];
            var host = event.data.base.filterUri;
            jq_module("a").each(function(index) {
                var link = jq_module(this).attr("href");
                if (!link || link.indexOf("javascript") === 0) {
                    return;
                }
                if (link.indexOf(host) === -1 && link.indexOf(".") !== 0) {
                    links.push(getPathFromUrl(link));
                }
            });
            return links.join();
        },
        scrs: function(event, node) {
            var scripts = [];
            jq_module("script").each(function() {
                var scr = jq_module(this).attr("src");
                if (scr) {
                    if (scr.indexOf("data:text/javascript;base64") === 0) {
                        scr = "base64"
                    }
                    scripts.push(scr);
                }
            });
            return scripts.join(";")
        },
        ot: function(event, node) {
            return node.offset().top;
        },
        ol: function(event, node) {
            return node.offset().left;
        },
        ref: function(event, node) {
            return document.referrer;
        },
        turl: function(event, node) {
            return document.URL;
        },
        tt: function(event, node) {
            return event.data.tt;
        },
        dvc: function(event, node) {
            return event.data.dvc;
        },
        hgeo: function(event, node) {
            return event.data.hgeo;
        }
    }
})($);
module.exports = fns;
