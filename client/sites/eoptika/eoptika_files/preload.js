var optiMonk = {};
var OptiMonkRegistry = {
    account: 84,
    baseUrl: 'http://front.optimonk.com',
    offset: (new Date().getTime()/1000) - '1400058438'
};
var OptiMonkAjax = function() {
    var self = this;
    self.get = function (url, callback) {
        var xhr = self.load(callback);
        xhr.open('GET', url, true);
        xhr.send('');
    };

    self.post = function (data, url, callback) {
        var xhr = self.load(callback);
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    };

    self.load = function (callback) {
        var xhr;

        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"];

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) {
                }
            }
        }

        xhr.onreadystatechange = requestStatusChangeHandler;

        function requestStatusChangeHandler() {
            if (xhr.readyState < 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            if (xhr.readyState === 4) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        }

        return xhr;
    };
};


optiMonk.getCookie = function (name) {
    if (!name) {
        name = 'optiMonkClient';
    }
    var cookies = document.cookie.split("; ");
    for (var x = 0, y = cookies.length; x < y; x++) {
        var tmp = cookies[x].split('=');
        if (tmp[0] == name) {
            tmp.shift();
            tmp = decodeURIComponent(tmp.join('=').replace(/\+/g, ' '));
            return tmp;
        }
    }
    return '';
};

function areCookiesEnabled() {
    var navigatorCookie = navigator.cookieEnabled;
    var cookieEnabled = !!navigatorCookie;
    if (typeof navigatorCookie == "undefined" && !cookieEnabled) {
        document.cookie = "isCookie";
        cookieEnabled = (document.cookie.indexOf("isCookie") != -1);
    }
    return cookieEnabled;
}

function addResponseToHead(response)
{
    var scriptObject = document.createElement('script');
    scriptObject.innerHTML = response;
    scriptObject.setAttribute('type', 'text/javascript');
    document.getElementsByTagName("head")[0].appendChild(scriptObject);
}

function inArray(needle, haystack)
{
    if (!haystack) {
        return false;
    }
    var key = '';
    for (key in haystack) {
        if (haystack[key] == needle) {
            return true;
        }
    }
    return false;
}

var cookie = '';
if (areCookiesEnabled()) {
    cookie = optiMonk.getCookie();
}

var url = OptiMonkRegistry.baseUrl + '/public/' + OptiMonkRegistry.account + '/js/load';

if (typeof calledOptiMonkUrls == 'undefined') {
    var calledOptiMonkUrls = [];
}

if (!inArray(url, calledOptiMonkUrls)) {
    var data = 'url=' + encodeURIComponent(window.location.href) + '&cookie=' + cookie + '&accountId=' + OptiMonkRegistry.account;
    var optiMonkAjax = new OptiMonkAjax();
    optiMonkAjax.post(data, url, addResponseToHead);
    calledOptiMonkUrls.push(url);
}
