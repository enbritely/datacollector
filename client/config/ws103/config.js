module.exports = {
    "base": {
        "wsid": "ddf1",
        "verbose": 0,
        "test": 0,
        "baseUri": "localhost:8089",
        "path": "/api/ddf1/add",
        "scriptVersion": 1,
        "sessionMod": 1
    },
    "events": [
    {
        "event": "copy",
        "source": window,
        "tags": "",
        "msgID": "timeinstant",
        "send": 1
    },
    {
        "event": "blur",
        "source": window,
        "tags": "",
        "msgID": "timeinstant",
        "send": 1
    },
    {
        "event": "focus",
        "source": window,
        "tags": "",
        "msgID": "timeinstant",
        "send": 1
    },
    {
        "event": "resize",
        "source": window,
        "tags": "",
        "msgID": "resize",
        "send": 1
    },
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
        "event": "scroll",
        "source": window,
        "tags": "",
        "msgID": "scroll",
        "send": 1
    },
    {
        "event": "unload",
        "source": window,
        "tags": "",
        "msgID": "timeinstant",
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
        "error":        ["ord","t0","ts0","type","dump"],
        "timeinstant":  ["ord","t0","ts0","type"],
        "resize":       ["ord","t0","ts0","type", "h", "w"],
        "pageview":     ["ord","t0","ts0","type", "ua", "fp", "bpin"],
        "event":        ["ord","t0","ts0","type", "eid", "tn", "px", "py", "mov", "mosumds"],
        "scroll":       ["ord","t0","ts0","type", "st", "sl"],
        "mousemove":    ["move"]
        
    },
    "attribute_description": {
        "fp": {
            "func": "fp",
            "default": null,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "bpin": {
            "func": "bpin",
            "default": null,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "mov": {
            "func": "mov",
            "default": null,
            "type": "float",
            "zero": 4,
            "validate": {
                "max": 1024
            }
        },
        "move": {
            "func": "move",
            "default": null,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "mosumds": {
            "func": "mosumds",
            "default": null,
            "type": "float",
            "zero": 4,
            "validate": {
                "max": 1024
            }
        },
        "ua": {
            "func": "ua",
            "default": null,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "ts0": {
            "func": "ts0",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "t0": {
            "func": "t0",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "h": {
            "func": "h",
            "default": -1,
            "type": "int",
            "validate": {
                "max": 50000
            }
        },
        "dump": {
            "func": "dump",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 50000
            }
        },
        "w": {
            "func": "w",
            "default": -1,
            "type": "int",
            "validate": {
                "max": 50000
            }
        },
        "type": {
            "func": "type",
            "default": "NA",
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "tn": {
            "func": "tn",
            "default": 0,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "eid": {
            "func": "eid",
            "default": 0,
            "type": "string",
            "validate": {
                "max": 1024
            }
        },
        "px": {
            "func": "px",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "py": {
            "func": "py",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "ord": {
            "func": "ord",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "st": {
            "func": "st",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        },
        "sl": {
            "func": "sl",
            "default": 0,
            "type": "int",
            "validate": {
                "max": 1024
            }
        }
    }
};
