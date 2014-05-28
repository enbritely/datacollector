// Utility functions
var util = (function(){
    var jq_module = require('./jq');
    return {
        hasKey: function(dict, key){
            return dict.hasOwnProperty(key);
        },
        isUndefined: function(value){
            return typeof value === "undefined";
        },
        elementPath: function (elem) {
            if (elem.length !== 1) {
                return "!";
            }
            var path, node = elem;
            while (node.length) {
                var realNode = node[0], name = realNode.localName;
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
                var parent = node.parent(), siblings = parent.children(name);
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
            if(params) {
                var first = true;
                for (var key in params) {
                    if(first) {
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
            var hash = 0, i, chr, len;
            if (str.length === 0) {
                return hash;
            }
            for (i = 0, len = str.length; i < len; i++) {
                chr   = str.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return Math.abs(hash);
        }
    }
})();

module.exports = util;