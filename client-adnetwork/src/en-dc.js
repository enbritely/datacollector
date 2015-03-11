(function(e, n, r) {

    CONFIG = {
        GERBIL_URL: 'http://2b49fa8f0c16a03e1592-2366b89f86f9049a8d564854bcebe54e.r94.cf5.rackcdn.com/isobar/gerbil.js',
        SCRIPT_NAME: 'en-dc.js',
        COLLECTOR_URL: 'http://bd-prod-collector-isobar-1850207057.us-east-1.elb.amazonaws.com/'
    };

    function getParams(script_name) {
        // Find all script tags
        var scripts = document.getElementsByTagName("script");
        // Look through them trying to find ourselves
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf("/" + script_name) > -1) {
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
    }

    var p = getParams(CONFIG.SCRIPT_NAME);
    console.log(p);


    // Sampling. Only pageloads/sampleSize part will inject the tracking code. The rest exits here.
    var sampleSize = p.ssize || 1; // ...&ssize=1&... ! custom constant parameter
    if ((Math.random() * 100 | 0) % sampleSize !== 0) {
        return;
    }
    // URL template:
    // http://localhost:8084/en-dc.js?wsid=en-js-test&ssize=1&banw=100&banh=100&n=12345678&esid=PID&s=PURL&eaid=AID&eadv=ADID&epid=ZID&ebuy=CID
    // KONSTANS RÉSZ: wsid=en-js-test&ssize=1&banw=100&banh=100
    // MACRO RÉSZ:    n=12345678&esid=PID&s=PURL&eaid=AID&eadv=ADID&epid=ZID&ebuy=CID
    //                az egyes értékeket a makró nevével kell helyettesíteni, tehát:
    //                n=%n&esid=%esid&....
    // Megfeleltetés:
    // ----- %eaid = ad_id
    // ----- %eadv = advertiser_id
    // ----- %ebuy = channel_id
    // ----- %ecid = ad_id kettő? Itt ez egy döntés, hogy melyik szinten akarjuk azonosítani. Ha az a tézis, hogy egy eaid-hoz tartozik több ecid, akkor az ecid = ad_id nálunk inkább
    // ----- %ekid = semmi
    // ----- %epid = zone_id
    // ----- %esid = publisher_ID
    // ----- %g = nem kell, gyűjtjük magunktól (ha csak nem szolgál visszaellenőrzést? de szerintem hagyhatjuk)
    // ----- keyword value macro = semmi
    // ----- %m = semmi
    // ----- %n = random number. ez akár egy sessionID/impressionID is lehetne szvsz
    // ----- pattern match macro = semmi
    // ----- %s = publisher_url
    //
    e._enbrtly_ = {
        'window': e,
        'document': n,
        'wsid': p.wsid, // ...&wsid={isobar}&... ! custom param
        'iid': p.n, // ...&n=%n&...
        'pid': p.esid, // ...&esid=%esid&... former partnerId --> publisher_ID
        'purl': p.s, // ...&s=%s&...  former  partnerUrl --> publisher_url
        'aid': p.eaid, // ...&eaid=%eaid&...
        'adid': p.eadv, // ...&eadv=%eadv&...
        'banw': p.banw, // ...&banw={isobar}&... ! custom param
        'banh': p.banh, // ...&banh={isobar}&... ! custom param
        'sid': p.n, // ...&n=%n&...
        'zid': p.epid, // ...&epid=%epid&...
        'cid': p.ebuy, // ...&ebuy=%ebuy&...
        'curl': 'NAN', // NO MATCH !!!!!!! former channelUrl
        'envr': 102,
        'clt_url': CONFIG.COLLECTOR_URL
    };
    a = n.createElement(r);
    m = n.getElementsByTagName(r)[0];
    a.async = 1;
    a.src = CONFIG.GERBIL_URL;
    m.parentNode.insertBefore(a, m);
    // Comment out this last block !!444!!!!
    console.log('wsid', e._enbrtly_.wsid);
    console.log('iid', e._enbrtly_.iid);
    console.log('sid', e._enbrtly_.sid);
    console.log('pid', e._enbrtly_.pid);
    console.log('purl', e._enbrtly_.purl);
    console.log('aid', e._enbrtly_.aid);
    console.log('adid', e._enbrtly_.adid);
    console.log('zid', e._enbrtly_.zid);
    console.log('cid', e._enbrtly_.cid);
    console.log('envr', e._enbrtly_.envr);
    console.log('clt_url', e._enbrtly_.clt_url);
    console.log('banw', e._enbrtly_.banw);
    console.log('banh', e._enbrtly_.banh);
    console.log('curl', e._enbrtly_.curl);
    // Comment out this last block !!444!!!!
})(window, document, 'script');
