(function(e, n, b, scriptUrl, wsid, impressionId, advertiserId, adId, partnerId, partnerUrl, bannerWidth, bannerHeight, sampleSize, zoneId, channelId, channelUrl) {
    // Sampling. Only pageloads/sampleSize part will inject the tracking code. The rest exits here.
    if ((Math.random() * 100 | 0) % sampleSize !== 0) {
        return;
    }
    var version = 100;
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
        'zid': zoneId,
        'cid': channelId,
        'curl': channelUrl,
        'envr': version
    };
    a = n.createElement(b);
    m = n.getElementsByTagName(b)[0];
    a.async = 1;
    a.src = scriptUrl;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'gerbil.js', 'adprops', 'impression_id', 'advertiser_id', 'ad_id', 'publisher_id', 'publisher_url', 'banner_width', 'banner_height', 1, 'zone_id', 'channel_id', 'channel_url');
