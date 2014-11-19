// Utility functions
var util = (function(providedJquery) {
    var jq_module = require("./jquery");
    if(!jq_module) {
        jq_module = providedJquery;
    }
    return {
        hasKey: function(dict, key) {
            return dict.hasOwnProperty(key);
        },
        isUndefined: function(value) {
            return typeof value === "undefined";
        },
        elementPath: function(elem) {
            if (elem.length !== 1) {
                return "!";
            }
            var path, node = elem;
            while (node.length) {
                var realNode = node[0],
                    name = realNode.localName;
                if (!name) {
                    break
                }
                name = name.toLowerCase();
                if (realNode.id) {
                    return name + '#' + realNode.id + (path ? '>' + path : '');
                } else if (realNode.className) {
                    var rncn = jq_module.trim(realNode.className);
                    name += '.' + rncn.split(/\s+/).join('.');
                }
                var parent = node.parent(),
                    siblings = parent.children(name);
                if (siblings.length > 1) {
                    name += ':eq(' + siblings.index(node) + ')';
                }
                path = name + (path ? '>' + path : '');
                node = parent;
            }
            return path;
        },
        buildQuery: function(baseUri, path, params) {
            var query = baseUri;
            query += path;
            if (params) {
                var first = true;
                for (var key in params) {
                    if (first) {
                        first = false;
                        query += '?' + key + '=' + params[key];
                    } else {
                        query += '&' + key + '=' + params[key];
                    }
                }
            }
            return query;
        },
        hash: function(str) {
            var hash = 0,
                i, chr, len;
            if (str.length === 0) {
                return hash;
            }
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return Math.abs(hash);
        },
        /**
         *
         *  Base64 encode / decode
         *  http://www.webtoolkit.info/
         *
         **/
        Base64: {

            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode: function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = this._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },


            // private method for UTF-8 encoding
            _utf8_encode: function(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            }

        },

        generateVisitID: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
})($);

module.exports = util;
