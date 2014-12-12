var getCookie = function(key) {
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
}
(function(e,n,b,r,i,te,d,o,t,l,y,getCookie("SESSIONID")){
    e['_enbrtly_']={'window':e,'document':n,'wsid':i,'sid':te,'pid':d,'aid':o,'hid':t,'banw':l,'banh':y};
    a=n.createElement(b),m=n.getElementsByTagName(b)[0]; a.async=1; a.src=r; m.parentNode.insertBefore(a,m)
})(window,document,'script','/gerbil.js','eoptika2','impression_id','partner_id','ad_id','eoptika.hu/','banner_width','banner_height');
