(function(e, n, b, scriptUrl, wsid, advertiserId, adId, partnerId, partnerUrl, bannerWidth, bannerHeight, sampleSize, zoneId, channelId, channelUrl, clt_url) {
    var version = 103;

    if ((Math.random() * 100 | 0) % sampleSize !== 0) {
        return;
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    var randString = function(len) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var text = '';
        for (var i = 0; i < len; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    var cname = 'wjskdfjo344d';
    if (!readCookie(cname)) {
        createCookie(cname, randString(8), 365);
    }

    var sid = readCookie(cname);

    e._enbrtly_ = {
        'window': e,
        'document': n,
        'wsid': wsid,
        'iid': randString(8),
        'pid': partnerId,
        'purl': partnerUrl,
        'aid': adId,
        'adid': advertiserId,
        'banw': bannerWidth,
        'banh': bannerHeight,
        'sid': sid,
        'zid': zoneId,
        'cid': channelId,
        'curl': channelUrl,
        'envr': version,
        'clt_url': clt_url
    };
    a = n.createElement(b);
    m = n.getElementsByTagName(b)[0];
    a.async = 1;
    a.src = scriptUrl;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '@@GERBIL_URL', '@@WSID', 'advertiser_id', 'ad_id', 'publisher_id', 'publisher_url', 'banner_width', 'banner_height', 1, 'zone_id', 'channel_id', 'channel_url', '@@COLLECTOR_URL');
