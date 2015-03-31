(function(e, n, b, scriptUrl, wsid, sid, impressionId, advertiserId, adId, partnerId, partnerUrl, bannerWidth, bannerHeight, sampleSize, zoneId, channelId, channelUrl, clt_url) {
    // Sampling. Only pageloads/sampleSize part will inject the tracking code. The rest exits here.
    if ((Math.random() * 100 | 0) % sampleSize !== 0) {
        return;
    }
    var version = 102;
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
})(window, document, 'script', '@@GERBIL_URL', '@@WSID', 'sid', 'impression_id', 'advertiser_id', 'ad_id', 'publisher_id', 'publisher_url', 'banner_width', 'banner_height', 1, 'zone_id', 'channel_id', 'channel_url', '@@COLLECTOR_URL');