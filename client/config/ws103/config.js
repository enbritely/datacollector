var wsid = "ddf1";
module.exports = {
    "base": {
        "wsid": wsid,
        "verbose": 0,
        "test": 1,
        "baseUri": "http://localhost:8089",
        "path": "/api/ddf1/add",
        "scriptVersion": 1,
        "sessionMod": 1
    },
    "events": [
    {
        "event": "mouseover",
        "source": document,
        "tags": "a,img",
        "msgID": "event",
        "send": 1
    },
    {
        "event": "click",
        "source": document,
        "tags": "a,body,img",
        "msgID": "event",
        "send": 1
    },
    {
        "event": "ready",
        "source": document,
        "tags": "",
        "msgID": "pageview",
        "send": 1
    },
    {
        "event": "unload",
        "source": window,
        "tags": "",
        "msgID": "pageview",
        "send": 1
    },
    {
        "event": "mousemove",
        "source": document,
        "tags": "",
        "msgID": "mousemove",
        "send": 0
    }
    ],
    "attribute_collection": {
        "pageview": {
			"attributes" : ["sid","ord","ts0","t0","type","msgID", "avh","avw","cd","ce","ip","lang","meta","plat","tzo","ua","vend"],
			"urlparams" : {"sts": true, "wsid": wsid}
		},
        "event": {
			"attributes" : ["sid","ord","ts0","t0","type","msgID", "eid", "px", "py", "ds", "dt"],
			"urlparams" : {"wsid": wsid}
		},
        "mousemove": {
			"attributes" : ["move"],
			"urlparams" : {"wsid": wsid}
		}
    },
    "attribute_description": {
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
                "max": 5
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
        },
		"cd": {
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
		"ds": {
            "func": "ds",
            "default": 0,
            "type": "float",
			"zero":4
        },
		"dt": {
            "func": "dt",
            "default": 0,
            "type": "float",
			"zero":4
        },
		"eid": {
            "func": "eid",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 2048
            }
        },
		"fp": {
            "func": "fp",
            "default": "-1",
            "type": "int"
        },
		"href": {
            "func": "href",
            "default": "NA",
            "type": "string",
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
            "func": "placehip",
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
		"tzo":{
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
		"move": {
			"func": "move",
			"default": null,
			"type": "int",
			"validate": {
				"max": 1024
			}
		}
    }
};
