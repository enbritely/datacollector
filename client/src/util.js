// Utility functions
var util = (function(){
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
                    var rncn = $.trim(realNode.className);
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
        }

    }
})();

module.exports = util;