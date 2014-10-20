var cookie = {
    get: function(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length,c.length);
            }
        }
        return undefined;
    },
    set: function(key, value, domain, expires) {
        var s = key + '=' + value;
        if (expires) { 
            var time = new Date(new Date().getTime() + expires * 1000)
            s += '; expires=' + time;
        }
        if (domain) {
            s += '; path=' + domain;
        }
        document.cookie = s;
    },
    update: function(key, domain, expires) {
        var previous = this.get(key);
        this.set(key, previous, domain, expires);
    }

}

module.exports = cookie;
