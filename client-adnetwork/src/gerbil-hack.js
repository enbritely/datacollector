;(function(){
	// Find all script tags for our collector if any
	var gqp = function(script_url) {
		var scripts = document.getElementsByTagName("script");
		// Look through them trying to find ourselves
		for (var i = 0; i < scripts.length; i++) {
		    if (scripts[i].src.indexOf(script_url) > -1) {
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
	};

	var qp = function(script_url) {
		var scripts = document.getElementsByTagName("script");
		// Look through them trying to find ourselves
		for (var i = 0; i < scripts.length; i++) {
		    if (scripts[i].src.indexOf(script_url) > -1) {
		        // Get an array of key=value strings of params
		        return scripts[i].src.split("?").pop();
		    }
		}
	};

	var p = gqp("gerbil");
	var _qp = qp("gerbil");
	var scriptURL;

	if(p.wsid==="fastb") {
		scriptURL = "https://df3a34acb7eb1321d99f-2366b89f86f9049a8d564854bcebe54e.ssl.cf5.rackcdn.com/gerbil-2.1.6.js?"+_qp;
	}
	else {
		scriptURL = "https://df3a34acb7eb1321d99f-2366b89f86f9049a8d564854bcebe54e.ssl.cf5.rackcdn.com/gerbil-2.0.1-old.js?"+_qp;
	}

	console.log(p.wsid);
	console.log(scriptURL);

	var b = 'script';
    var a = document.createElement(b);
    var m = document.getElementsByTagName(b)[0];
    a.async = 1;
    a.src = scriptURL;
    m.parentNode.insertBefore(a, m);

}());

