var wsid = "jatek";
module.exports = {
    "base": {
        "wsid": wsid,
        "verbose": 0,
        "test": 1,
        "baseUri": "",
        "path": "/",
        "scriptVersion": 310,
        "sessionMod": 1
    },
    "events": [{
        "event": "mouseover",
        "source": document,
        "tags": "div,a,img,p,pre,span,h1,h2,h3,h4,h5,h6,select,input,button,form,textarea,option,table,td,tr,th,ol,ul,li",
        "msgID": "mouseevent",
        "send": 1
    }, {
        "event": "mouseup",
        "source": document,
        "tags": "a,body,img",
        "msgID": "event",
        "send": 1
    }, {
        "event": "ready",
        "source": document,
        "tags": "",
        "msgID": "pageview",
        "send": 1
    }, {
        "event": "unload",
        "source": window,
        "tags": "",
        "msgID": "pageview",
        "send": 1
    }],
    "attribute_collection": {
        "pageview": {
            "attributes": ["wsid", "sid", "ord", "ts0", "type", "msgID", "avh", "avw", "cd", "ce", "lang", "meta", "plat", "tzo", "ua", "vend", "scrv", "title", "wh", "ww", "ref", "url", "c", "uid"],
            "urlparams": {
                "wsid": wsid
            }
        },
        "event": {
            "attributes": ["wsid", "sid", "ord", "ts0", "type", "msgID", "px", "py", "dh", "dw", "href", "ih", "iw", "st", "scrv", 'ot', 'ol', 'et', 'ec', 'ei'],
            "urlparams": {
                "wsid": wsid
            }
        },
        "mouseevent": {
            "attributes": ["wsid", "sid", "ord", "ts0", "type", "msgID", "px", "py", "dh", "dw", "ih", "iw", "st", "scrv", 'ot', 'ol', 'et', 'ec', 'ei'],
            "urlparams": {
                "wsid": wsid
            }
        }

    },
    "attribute_description": {
        "uid": {
            "func": "uid",
            "default": "",
            "type": "string",
            "validate": {
                "max": 256
            }
        },
        "meta": {
            "func": "meta",
            "default": "",
            "type": "string",
            "validate": {
                "max": 100000
            }
        },
        "wsid": {
            "func": "wsid",
            "default": "",
            "type": "string",
            "validate": {
                "max": 10
            }
        },
        "scrv": {
            "func": "scrv",
            "default": -1,
            "type": "int"
        },
        "sid": {
            "func": "sid",
            "default": "",
            "type": "string",
            "validate": {
                "max": 2048
            }
        },
        "msgID": {
            "func": "msgID",
            "default": "",
            "type": "string",
            "validate": {
                "max": 128
            }
        },
        "avh": {
            "func": "avh",
            "default": -1,
            "type": "int"
        },
        "avw": {
            "func": "avw",
            "default": -1,
            "type": "int"
        },
        "base_uri": {
            "func": "base_uri",
            "default": "",
            "type": "string",
            "validate": {
                "max": 2048
            }
        }, "cd": {
            "func": "cd",
            "default": -1,
            "type": "int"
        },
        "ce": {
            "func": "ce",
            "default": -1,
            "type": "int"
        },
        "dh": {
            "func": "dh",
            "default": -1,
            "type": "int"
        },
        "dw": {
            "func": "dw",
            "default": -1,
            "type": "int"
        },
        "eid": {
            "func": "eid",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 2048
            }
        },
        "href": {
            "func": "href",
            "default": null,
            "type": "string",
            "urlencode": true,
            "validate": {
                "max": 2048
            }
        },
        "ih": {
            "func": "ih",
            "default": -1,
            "type": "int"
        },
        "ip": {
            "func": "ip",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 6
            }
        },
        "iw": {
            "func": "iw",
            "default": -1,
            "type": "int"
        },
        "lang": {
            "func": "lang",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 32
            }
        },
        "ord": {
            "func": "ord",
            "default": -1,
            "type": "int"
        },
        "plat": {
            "func": "plat",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "px": {
            "func": "px",
            "default": -1,
            "type": "int"
        },
        "py": {
            "func": "py",
            "default": -1,
            "type": "int"
        },
        "st": {
            "func": "st",
            "default": -1,
            "type": "int"
        },
        "t0": {
            "func": "t0",
            "default": 0,
            "type": "int"
        },
        "title": {
            "func": "title",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "ts0": {
            "func": "ts0",
            "default": 0,
            "type": "int"
        },
        "type": {
            "func": "type",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "tzo": {
            "func": "tzo",
            "default": 0,
            "type": "int"
        },
        "ua": {
            "func": "ua",
            "default": null,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "vend": {
            "func": "vend",
            "default": null,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "wh": {
            "func": "wh",
            "default": 0,
            "type": "int"
        },
        "ww": {
            "func": "ww",
            "default": 0,
            "type": "int"
        },
        "sts": {
            "func": "sts",
            "default": null,
            "type": "string",
            "validate": {
                "max": 4096
            }
        },
        "ot": {
            "func": "ot",
            "default": null,
            "type": "int"
        },
        "ol": {
            "func": "ol",
            "default": null,
            "type": "int"
        },
        "ref": {
            "func": "ref",
            "default": null,
            "type": "string",
            "urlencode": true,
            "validate": {
                "max": 512
            }
        },
        "url": {
            "func": "turl",
            "default": null,
            "type": "string",
            "urlencode": true,
            "validate": {
                "max": 2048
            }
        },
        "ec": {
            "func": "eclass",
            "default": null,
            "type": "string",
            "urlencode": false,
            "validate": {
                "max": 512
            }
        },
        "ei": {
            "func": "ei",
            "default": null,
            "type": "string",
            "urlencode": false,
            "validate": {
                "max": 512
            }
        },
        "et": {
            "func": "etag",
            "default": null,
            "type": "string",
            "urlencode": false,
            "validate": {
                "max": 512
            }
        },
        "c": {
            "func": "cookie",
            "default": null,
            "type": "string",
            "urlencode": true,
            "validate": {
                "max": 2048
            }
        }
    }
};
