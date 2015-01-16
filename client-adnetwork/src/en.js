(function(e, n, b, scriptUrl, wsid, impressionId, advertiserId, adId, partnerId, partnerUrl, bannerWidth, bannerHeight, sampleSize, zoneId) {
    // Sampling. Only pageloads/sampleSize part will inject the tracking code. The rest exists here.
    if ((Math.random() * 100 | 0) % sampleSize !== 0) {
        return;
    }
    var getCookie = function(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    };
    e._enbrtly_ = {
        'window': e,
        'document': n,
        'wsid': wsid,
        'iid': impressionId,
        'pid': partnerId,
        'purl': partnerUrl,
        'aid': adId,
        'adid': advertiserId,
        'banw': bannerWidth,
        'banh': bannerHeight,
        'sid': getCookie("SESSIONID"),
        'zid': zoneId
    };
    a = n.createElement(b);
    m = n.getElementsByTagName(b)[0];
    a.async = 1;
    a.src = scriptUrl;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'http://2b49fa8f0c16a03e1592-2366b89f86f9049a8d564854bcebe54e.r94.cf5.rackcdn.com/adprops/gerbil.js', 'adprops', 'impression_id', 'advertiser_id', 'ad_id', 'publisher_id', 'publisher_url', 'banner_width', 'banner_height', 2, 'zone_id');
