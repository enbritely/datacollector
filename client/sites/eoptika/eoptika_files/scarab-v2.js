var _scq = _scq || [];
_scq.push(['setMerchantId', '130586EBCC72200A']);

var ScarabArrays = function() {
  var forEach = function(array, fn, scope) {
    for(var i = 0, len = array.length; i < len; ++i) {
      fn.call(scope, array[i], i, this);
    }
  };

  var map = function(array, projectionFunction) {
    var results = [];
    forEach(array, function(itemInArray) {
        results.push(projectionFunction(itemInArray));
    });
    return results;
  };

  var filter = function(array, predicateFunction) {
    var results = [];
    forEach(array, function(itemInArray) {
      if (predicateFunction(itemInArray)) {
        results.push(itemInArray);
      }
    });
    return results;
  };

  return {
    forEach: forEach,
    map: map,
    filter: filter
  };
}();

var ScarabUtil = function() {

  var prettyPrice = function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  };

  var redirect = function(link, merchant, item, feature, cohort) {
    return 'http://recommender.scarabresearch.com/merchants/' + merchant + '/?v=' +
                  encodeURIComponent('i:' + item + ',t:' + feature + ',c:' + cohort) +
                  '&redirect_to=' + encodeURIComponent(link);
  };

  var sc_params = function(link, feature, cohort) {
    return appendParams(link, {sc_feature: feature, sc_cohort: cohort});
  };

  var addTrackingParams = function(SC, params) {
    return merge(params, {sc_feature: SC.recommender.f, sc_cohort: SC.cohort});
  };

  // Section 4 in RFC 2396 (http://www.ietf.org/rfc/rfc2396.txt) says that
  // fragment ids should be the last part of urls
  var appendParams = function(uri, params) {
    var paramsArray = [];
    for (var name in params) {
      if (params.hasOwnProperty(name)) {
        paramsArray.push({n: name, v: params[name]});
      }
    }
    if (paramsArray.length === 0) return uri;
    var paramsString = ScarabArrays.map(
      paramsArray.sort(function (a, b) {
        return a.n.localeCompare(b.n);
      }),
      function(p) {
        return p.n + '=' + encodeURIComponent(p.v);
      }
    ).join('&');
    var fragmentIndex = uri.indexOf('#');
    var fragment = '';
    if (fragmentIndex >= 0) {
      fragment = uri.substring(fragmentIndex);
      uri = uri.substring(0, fragmentIndex);
    }
    var sep = uri.indexOf('?') >= 0 ? '&' : '?';
    return uri + sep + paramsString + fragment;
  };

  var parseQueryString = function(myWindow) {
    var query_string = {};
    myWindow = myWindow || window;
    if (!myWindow || !myWindow.location || !myWindow.location.search ||
        myWindow.location.search === "") {
      return query_string;
    }
    var query = myWindow.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      var paramValue = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = paramValue;
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], paramValue ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(paramValue);
      }
    }
    return query_string;
  };

  var topDomainToCookie = function(domain) {
    if (domain === 'localhost') {
      return '';
    }
    var td = getTopDomain(domain);
    return 'domain=' + td;
  };

  var getTopDomain = function(domain) {
    var ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipPattern.test(domain)) {
        return domain;
    }
    var dparts = domain.split(".");
    var l = dparts.length;
    var partsToKeep = Math.min(l, 2);
    // handle *.co.uk, *.co.jp, *.com.tk, etc domains
    if (l > 2 && ('co' === dparts[l - 2] || 'com' === dparts[l - 2])) {
      partsToKeep = 3;
    }
    return '.' + dparts.slice(l-partsToKeep).join('.');
  };

  /**
   * merges two or more objects. the later one overwrites the previous object
   *
   * @return
   */
  var merge = function() {
    var i, l = arguments.length, result = {}, o, k;
    for (i = 0; i < l; i++) {
      o = arguments[i];
      if (o) {
        for (k in o) {
          if (o.hasOwnProperty(k)) {
            result[k] = o[k];
          }
        }
      }
    }

    return result;
  };

  var indexOfItem = function(array, needle, id) {
    var i, l;
    if (!array || (array && !array.length)) {
      return -1;
    }
    l = array.length;
    for (i = 0; i < l; i++) {
      if (typeof needle === "string") {
        if (typeof array[i] !== 'undefined' && array[i][id] === needle) {
          return i;
        }
      } else {
        if (typeof array[i] !== 'undefined' && needle.equal(array[i])) {
          return i;
        }
      }
    }
    return -1;
  };

  /**
   * Returns the deep copy of the source object. Usage: var target =
   * deepCopy(source);
   *
   * Code copied from
   * http://javascript.about.com/od/objectorientedjavascript/a/oop17.htm
   */
  var deepCopy = function(source, target) {
    target = target || {};
    for (var i in source) {
      if (typeof source[i] === 'object') {
        target[i] = (source[i].constructor === Array) ? [] : {};
        deepCopy(source[i], target[i]);
      } else {
        target[i] = source[i];
      }
    }
    return target;
  };

  /**
   * augment a constructor functions prototype with other functions first
   * param is the constructor function second and subsequent params are the
   * interface functions
   */
  var augment = function() {
    var i, l = arguments.length, f, cf = arguments[0];
    for (i = 1; i < l; i++) {
      f = arguments[i];
      f.call(cf.prototype);
    }
  };

  var bind = function(fn, context) {
    return function() {
      var f = fn, c = context;
      f.apply(c, arguments);
    };
  };

  // R4 version of http://code.google.com/p/tiny-sha1/
  var sha1 = function(s){function U(a,b,c){while(0<c--)a.push(b)}function L(a,b){return(a<<b)|(a>>>(32-b))}function P(a,b,c){return a^b^c}function A(a,b){var c=(b&0xFFFF)+(a&0xFFFF),d=(b>>>16)+(a>>>16)+(c>>>16);return((d&0xFFFF)<<16)|(c&0xFFFF)}var B="0123456789abcdef";return(function(a){var c=[],d=a.length*4,e;for(var i=0;i<d;i++){e=a[i>>2]>>((3-(i%4))*8);c.push(B.charAt((e>>4)&0xF)+B.charAt(e&0xF))}return c.join('')}((function(a,b){var c,d,e,f,g,h=a.length,v=0x67452301,w=0xefcdab89,x=0x98badcfe,y=0x10325476,z=0xc3d2e1f0,M=[];U(M,0x5a827999,20);U(M,0x6ed9eba1,20);U(M,0x8f1bbcdc,20);U(M,0xca62c1d6,20);a[b>>5]|=0x80<<(24-(b%32));a[(((b+65)>>9)<<4)+15]=b;for(var i=0;i<h;i+=16){c=v;d=w;e=x;f=y;g=z;for(var j=0,O=[];j<80;j++){O[j]=j<16?a[j+i]:L(O[j-3]^O[j-8]^O[j-14]^O[j-16],1);var k=(function(a,b,c,d,e){var f=(e&0xFFFF)+(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),g=(e>>>16)+(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(f>>>16);return((g&0xFFFF)<<16)|(f&0xFFFF)})(j<20?(function(t,a,b){return(t&a)^(~t&b)}(d,e,f)):j<40?P(d,e,f):j<60?(function(t,a,b){return(t&a)^(t&b)^(a&b)}(d,e,f)):P(d,e,f),g,M[j],O[j],L(c,5));g=f;f=e;e=L(d,30);d=c;c=k}v=A(v,c);w=A(w,d);x=A(x,e);y=A(y,f);z=A(z,g)}return[v,w,x,y,z]}((function(t){var a=[],b=255,c=t.length*8;for(var i=0;i<c;i+=8){a[i>>5]|=(t.charCodeAt(i/8)&b)<<(24-(i%32))}return a}(s)).slice(),s.length*8))))};

  return {
    prettyPrice: prettyPrice,
    redirect: redirect,
    sc_params: sc_params,
    addTrackingParams: addTrackingParams,
    appendParams: appendParams,
    topDomainToCookie: topDomainToCookie,
    getTopDomain: getTopDomain,
    redirectWithScParams: function(link, merchant, item, feature, cohort) {
      return redirect(sc_params(link, feature, cohort), merchant, item, feature, cohort);
    },
    parseQueryString: parseQueryString,
    merge: merge,
    indexOfItem: indexOfItem,
    deepCopy: deepCopy,
    augment: augment,
    bind: bind,
    sha1: sha1
  };
}();

var ScarabModule = function(win) {
    "use strict";

    var STRINGS = {
        VIEWCOOKIE : 'scarab.mayViewed',
        ADDCOOKIE : 'scarab.mayAdd'
    }, SERIALIZE = {
        'v' : 'views',
        'ai' : 'addedItems',
        'ca' : 'purchased',
        'co' : 'checkouts',
        'k' : 'keywords',
        'q' : 'searchTerm',
        'vc' : 'category'
    }, EVENT = {
        'addView' : 2,
        'checkAddedItem' : 3,
        'addAddedItem' : 4,
        'addCartItem' : 5,
        'addCheckoutItem' : 6,
        'commit' : 7
    };

    // doT.js
    // (c) 2011, Laura Doktorova
    // https://github.com/olado/doT
    //
    // doT is an extraction and slight modification of an excellent
    // templating function from jQote2.js (jQuery plugin) by aefxx
    // (http://aefxx.com/jquery-plugins/jqote2/).
    //
    // Modifications:
    // 1. nodejs support
    // 2. allow for custom template markers
    // 3. only allow direct invocation of the compiled function
    //
    // Licensed under the MIT license.

    var doT = (function() {
        var doT = {
            version : '0.1.0'
        };

        doT.templateSettings = {
            begin : '{{',
            end : '}}',
            varname : 'it'
        };

        doT.template = function(tmpl, conf) {
            conf = conf || doT.templateSettings;
            var str = '', tb = conf.begin, te = conf.end, m, l, arr = tmpl
                    .replace(
                            /\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g,
                            '').split(tb).join(te + '\x1b').split(te);

            l = arr.length;
            for (m = 0; m < l; m++) {
                str += arr[m].charAt(0) !== '\x1b' ? "out+='"
                        + arr[m].replace(/(\\|["'])/g, '\\$1') + "'"
                        : (arr[m].charAt(1) === '=' ? ';out+=('
                                + arr[m].substr(2) + ');'
                                : (arr[m].charAt(1) === '!' ? ';out+=('
                                        + arr[m].substr(2)
                                        + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('"
                                        + '"' + "').join('&#34;').split(" + '"'
                                        + "'" + '"' + ").join('&#39;');"
                                        : ';' + arr[m].substr(1)));
            }

            str = 'try{'
                    + ('var out="";' + str + ';return out;').split("out+='';")
                            .join('').split('var out="";out+=')
                            .join('var out=')
                    + '} catch(e){e.type="TemplateExecutionError";e.args=arguments;e.template=arguments.callee.toString();'
                    + 'throw new SyntaxError("Error in Scarab template.");}';

            try {
                return new Function(conf.varname, str);
            } catch (e) {
                if (typeof console !== 'undefined') {
                    console.log("Could not create a template function: " + str);
                }
                throw new SyntaxError('Error in Scarab template.');
            }
        };

        return doT;
    }());
    doT.templateSettings = {
        begin : '{{',
        end : '}}',
        varname : 'SC'
    };

    var w = win || window,
        sessionId,
        visitorId,
        orderId,
        customerId,
        trafficSource,
        fields,
        merchantId,
        testMode,
        debugMode,
        serverUrl,
        trackedFeature,
        trackedCohort,
        forcedCohort,
        cart = [],
        transactions = {},
        transactionCounter = 0,
        recommenderUrl,
        products = {},
        features = [],
        beforeRendering = null,
        afterRendering = null,
        skipRendering = false;


    var addEvent = function(o, name, fn, ctx) {
        if (!o) return;
        if (o.addEventListener) {
            o.addEventListener(name, ScarabUtil.bind(fn, ctx), false);
        } else if (o.attachEvent) {
            o.attachEvent('on' + name, ScarabUtil.bind(fn, ctx));
        }
    };

    var ISerializable = (function() {
        var serialize = function() {
            var s = [], i, sp = this.serializableProperties, l = sp.length, cp;

            for (i = 0; i < l; i++) {
                cp = sp[i];
                if (this.hasOwnProperty(cp) && (this[cp] || this[cp] === 0)) {
                    s.push(cp + ':' + this[cp]);
                }
            }
            return s.join(',');
        };

        return function() {
            this.serialize = serialize;
        };
    }());

    var IComparable = (function() {
        var equal = function(other) {
            return this.compare(other);
        };

        return function() {
            this.equal = equal;
        };
    }());

    var IMergable = (function() {

        var merge = function() {
            var i, l = arguments.length, co, prop;

            for (i = 0; i < l; i++) {
                co = arguments[i];
                for (prop in co) {
                    if (co.hasOwnProperty(prop)) {
                        this[prop] = co[prop];
                    }
                }
            }
        };

        return function() {
            this.merge = merge;
        };
    }());

    var Item = function(config) {
        // IMPORTANT!
        // this URL encoding is just a way of escaping special characters in the
        // item ID (comma, pipe, colon)
        // recserver will url-decode this part of the string
        this.i = encodeURIComponent(config.i + '') || null; // itemId
        this.t = config.t || null; // tracking code (feature id)
        this.p = config.p || null; // price
        this.q = config.q || null; // quantity
        this.c = config.c || null; // cohort
    };
    ScarabUtil.augment(Item, ISerializable, IComparable, IMergable);
    Item.prototype.serializableProperties = [ 'i', 't', 'p', 'q', 'c' ];
    Item.prototype.compare = function(otherItem) {
        return this.i === otherItem.i;
    };

    var Feature = function(config) {
        this.f = config.f || null; // feature
        this.l = config.l || null; // limit
        this.o = (typeof config.o == 'undefined') ? null : config.o; // offset
        this.hasMore = false; // true if there are more items form this
        // feature
        this.cohort = '';
        this.merchants = [];
        this.parent = config.parent || null; // parentElement
        this.template = config.template || null; // template
        this.pages = config.pages || []; // loaded pages
        this.currentPage = null; // current page
        this.attachedListeners = config.attachedListeners || false;
        this.transaction = null;
        this.pi = null;
        this.cust = config.cust || null;
        this.requestSent = false;
    };
    ScarabUtil.augment(Feature, ISerializable, IComparable);
    Feature.prototype.serializableProperties = [ 'f', 'l', 'o', 'cust' ];
    Feature.prototype.compare = function(otherItem) {
        return this.f == otherItem.f;
    };
    Feature.prototype.getProducts = function() {
        var i, l = this.pages.length, result = [], page;
        for (i = 0; i < l; i++) {
            page = this.pages[i];
            result = result.concat(page.products);
        }

        return result;
    };
    Feature.prototype.purgePagesCache = function() {
        this.pages = [];
        this.currentPage = null;
    };
    var findProductsMSIE = function(root) {
        var productIds = [];
        if (typeof (root.getAttribute) !== "undefined") {
            var dataitem = root.getAttribute('data-scarabitem');
            if (dataitem) {
                productIds.push(dataitem);
            }
        }
        if (root.childNodes.length == 0) {
            return productIds;
        }
        for ( var i = 0; i < root.childNodes.length; ++i) {
            var subresult = findProductsMSIE(root.childNodes[i]);
            productIds = productIds.concat(subresult);
        }
        return productIds;
    };
    Feature.prototype.findProducts = function() {
        if (typeof (NodeFilter) == "undefined") {
            return findProductsMSIE(this.parent);
        }
        var walker = document.createTreeWalker(this.parent,
                NodeFilter.SHOW_ELEMENT, null, false), productIds = [], el, dataitem;
        do {
            el = walker.currentNode;
            dataitem = el.getAttribute('data-scarabitem');
            if (dataitem) {
                productIds.push(dataitem);
            }
        } while (walker.nextNode());
        return productIds;
    };
    Feature.prototype.setProducts = function(pi) {
        this.pi = pi;
    };
    Feature.prototype.setPage = function(page) {
        var that = this;
        var renderCallback = function(SC, skipScarabRendering) {
            return that.render(SC, skipScarabRendering);
        };
        var SC;
        this.currentPage = page;
        SC = this.getDataForRendering();
        if (beforeRendering) beforeRendering(SC);
        if (this.successCallback) {
            try {
                this.successCallback(SC, renderCallback);
            } catch (e) {
                if (console.log) {
                    console.log("Error in successCallback: " + e);
                }
            }
        } else if (!skipRendering) {
            Scarab.invokeRendering(SC, renderCallback);
        }
        this.attachListeners();
        if (afterRendering) afterRendering(SC);
    };
    Feature.prototype.addPage = function(page) {
        this.pages.push(page);
        this.setPage(page);
    };
    Feature.prototype.previousPage = function() {
        var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
        if (index > 0) {
            this.setPage(this.pages[index - 1]);
        }
    };
    Feature.prototype.nextPage = function() {
        var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
        if (index != -1) {
            if (index < this.pages.length - 1) {
                this.setPage(this.pages[index + 1]);
            } else if (this.hasMore) {
                this.o += this.l;
                Scarab.setCohortId(this.cohort);
                this.requestSent = false;
                this.transaction.sendRequest();
            }
        }
    };
    Feature.prototype.getDataForRendering = function() {
        var SC = {};
        SC.page = ScarabUtil.deepCopy(this.currentPage);
        SC.recommender = {};
        SC.recommender.f = this.f;
        SC.recommender.limit = this.l;
        SC.recommender.container = this.parent;
        SC.cohort = this.cohort;
        SC.merchants = this.merchants;
        return SC;
    };
    var getElementsByClassName = function(container, button) {
        if (container.getElementsByClassName) {
            return container.getElementsByClassName(button);
        }
        var all = container.getElementsByTagName('*');
        var ret = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].className === button) {
                ret.push(all[i]);
            }
        }
        return ret;
    };
    var disableButton = function(container, button) {
        var buttons = getElementsByClassName(container, button);
        for ( var i = 0; i < buttons.length; ++i) {
            var className = buttons[i].className;
            buttons[i].className = className + ' scarab-disabled-button';
        }
    };
    Feature.prototype.render = function(SC, skipScarabRendering) {
        var el = this.parent, that = this;
        if (typeof (this.template) === 'function' && !skipScarabRendering) {

            if (el !== document.getElementById(el.id)) {
                // Oooops, probably they threw out 'el', and replaced it with a
                // new element with the same id!
                el = document.getElementById(el.id);
                this.parent = el;
                this.attachedListeners = false;
            }
            el.innerHTML = this.template(SC);
            var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
            if (index === 0) {
                disableButton(el, "scarab-prev");
            }
            if (index === this.pages.length - 1 && !this.hasMore) {
                disableButton(el, "scarab-next");
            }
        }
    };
    Feature.prototype.attachListeners = function() {
        if (this.attachedListeners) return;
        this.attachedListeners = true;
        var el = this.parent;

        addEvent(el, 'click', this.eventListener, this);
    };

    Feature.prototype.eventListener = function(e) {
        var element = e.srcElement || e.target, cssClass, classes = [], i, l, dataitem;
        do {
            dataitem = element.getAttribute('data-scarabitem');
            if (dataitem) {
                return Feature.eventsHandlers['scarab-item'].call(this,
                        dataitem, this.f, this.cohort);
            }
            cssClass = element.className;
            classes = cssClass.split(' ');
            l = classes.length;
            for (i = 0; i < l; i++) {
                if (classes[i] in Feature.eventsHandlers) {
                    return Feature.eventsHandlers[classes[i]].call(this, element);
                }
            }
            element = element.parentNode;
        } while (element != this.parent);
        return true;
    };
    Feature.eventsHandlers = {
        'scarab-item' : function(productId, feature, cohort) {
            Scarab.itemClick(productId, feature, cohort);
        },
        'scarab-prev' : function(element) {
            this.previousPage();
        },
        'scarab-next' : function(element) {
            this.nextPage();
        }
    };

    var Page = function(config) {
        this.products = [];
    };
    ScarabUtil.augment(Page, IComparable);
    Page.prototype.compare = function(otherItem) {
        return otherItem == this;
    };
    Page.prototype.addProduct = function(product) {
        this.products.push(product);
    };
    Page.prototype.removeProduct = function(productId) {
    };

    var OrderedItemEventQueue = function(transaction) {
        this.isPlaying = false;
        this.tick = null;
        this.events = [];
        this.transaction = transaction;
        this.playcounter = 0;
    };
    OrderedItemEventQueue.prototype.add = function(event) {
        this.events.push(event);
        this.events.sort(this.compareEvent);
    };
    OrderedItemEventQueue.prototype.compareEvent = function(a, b) {
        if (a.item && b.item && a.item.i != b.item.i) {
            return a.item.i < b.item.i ? -1 : 1;
        } else {
            return (EVENT[a.event] < EVENT[b.event]) ? -1 : 1;
        }
    };
    OrderedItemEventQueue.prototype.shouldSend = function() {
       return (this.events.length > 1
               || this.events[0].event !== 'commit'
               || this.events[0].forceSend
               || customerId
               || trafficSource
               || this.transaction.features.length > 0
               || this.transaction.searchTerm.length > 0
               || this.transaction.category.length > 0);
    };
    OrderedItemEventQueue.prototype._play = function() {
        var transaction = this.transaction, e;
        this.isPlaying = true;

        if (!this.shouldSend()) {
            this.clear();
        }
        while (this.events.length) {
            e = this.events.shift();
            transaction.eventHandlers[e.event].call(transaction, e.item);
        }
        this.isPlaying = false;
    };

    OrderedItemEventQueue.prototype.play = function(immediate) {
        if (this.isPlaying) {
            return true;
        }

        if (this.tick) {
            w.clearTimeout(this.tick);
        }

        if (immediate) {
            this._play();
        } else {
            this.tick = w.setTimeout(ScarabUtil.bind(this._play, this), 100);
        }

    };
    OrderedItemEventQueue.prototype.clear = function() {
        this.events = [];
    };

    /**
     * Gets a cookie, if it exists returns it's value or empty array otherwise
     */
    var getCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        /*
         * Search in the document.cookies for the cookie named 'name'.
         */
        for ( var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            /*
             * It exists so parse it's contain, and return the value.
             */
            if (c.indexOf(nameEQ) == 0)
                return eval(decodeURIComponent(c.substring(nameEQ.length, c.length)));
        }
        /*
         * It doesn't exists, so we return an empty array as value.
         */
        return [];
    };

    /**
     * Serialize a list of tracking codes into a cookie
     */
    var serializeCookie = function(name, collection) {
        var key, serializedPairs, serializedObjects, i, cookieValue = "[";

        /*
         * Serialize tracking code list: Array of itemId - tracking code pairs,
         * eg: [{itemId: "i1", featureId: "RELATED"}, {..}, ...]
         */
        serializedObjects = [];
        ;
        for (i = 0; i < collection.length; i++) {
            serializedPairs = [];
            for (key in collection[i]) {
                if (collection[i].hasOwnProperty(key)
                        && (collection[i][key] || collection[i][key] === 0)) {
                    serializedPairs.push('"' + key + '":"' + collection[i][key]
                            + '"');
                }
            }
            if (serializedPairs.length) {
                serializedObjects.push("{" + serializedPairs.join(',') + "}");
            }
        }
        if (serializedObjects.length) {
            cookieValue += serializedObjects.join(',');
        }
        cookieValue += "]";

        /*
         * Save the serialized list into a cookie named 'name' The created
         * cookie expires, when the browser closed
         */
        document.cookie = name + "=" + encodeURIComponent(cookieValue) + "; path=/;" + ScarabUtil.topDomainToCookie(document.domain);
    };

    var findInCookie = function(cname, item) {
        var c = getCookie(cname), i, l = c.length;

        for (i = 0; i < l; i++) {
            if (i in c && item.equal(c[i])) {
                return c[i];
            }
        }
        return null;
    };

    var removeFromCookie = function(cname, item) {
        var c = getCookie(cname), i = ScarabUtil.indexOfItem(c, item);
        if (i > -1) {
            c.splice(i, 1);
        }
        serializeCookie(cname, c);
    };

    var addCookie = function(cname, item) {
        var c = getCookie(cname), i = ScarabUtil.indexOfItem(c, item);
        if (c.length > 9) {
            c.shift();
        }
        if (i == -1) {
            c.push(item);
            serializeCookie(cname, c);
        }
    };

    var Transaction = function(name) {
        this.name = name;
        this.views = [];
        this.addedItems = [];
        this.purchased = [];
        this.features = [];
        this.productIds = [];
        this.checkouts = [];
        this.orderId = '';
        this.callbackName = '';
        this.events = new OrderedItemEventQueue(this);
        this.keywords = [];
        this.searchTerm = [];
        this.category = [];
        this.exclude = [];
    };

    Transaction.prototype = {
        eventHandlers : {
            addView : function(viewedItem) {
                var v = findInCookie(STRINGS.VIEWCOOKIE, viewedItem);
                if (v) {
                    viewedItem.merge(v);
                    removeFromCookie(STRINGS.VIEWCOOKIE, viewedItem);
                }
                if (trackedFeature) {
                    viewedItem.t = trackedFeature;
                }
                if (trackedCohort) {
                    viewedItem.c = trackedCohort;
                }
                this.views.push(viewedItem);
                addCookie(STRINGS.ADDCOOKIE, viewedItem);
            },
            checkAddedItem : function(addedItem) {
                var v = findInCookie(STRINGS.VIEWCOOKIE, addedItem);
                if (v) {
                    this.addView(addedItem);
                }
            },
            addAddedItem : function(addedItem) {
                var a = findInCookie(STRINGS.ADDCOOKIE, addedItem);
                if (a) {
                    addedItem.merge(a);
                    removeFromCookie(STRINGS.ADDCOOKIE, addedItem);
                }

                this.addedItems.push(addedItem);
            },
            addCartItem : function(purchasedItem) {
                this.purchased.push(purchasedItem);
            },
            addCheckoutItem : function(checkoutItem) {
                this.checkouts.push(checkoutItem);
            },
            commit : function() {
                this.sendRequest();
                start();
            }
        },
        highlightFeatures : function() {
            if (!debugMode) return;
            for (var i = 0; i < features.length; ++i) {
                var label = document.createElement('span');
                label.innerHTML = features[i].f;
                label.style.background = "red";
                features[i].parent.appendChild(label);
                features[i].parent.style.border = '5px solid red';
            }

        },
        setOrderId : function(orderId) {
            this.orderId = orderId;
        },
        addView : function(viewedItem) {
            this.events.add({
                item : viewedItem,
                event : 'addView'
            });
        },
        addAddedItem : function(addedItem) {
            this.events.add({
                item : addedItem,
                event : 'checkAddedItem'
            });
            this.events.add({
                item : addedItem,
                event : 'addAddedItem'
            });
        },
        addCartItem : function(purchasedItem) {
            this.events.add({
                item : purchasedItem,
                event : 'addCartItem'
            });
        },
        addCheckoutItem : function(checkoutItem) {
            this.events.add({
                item : checkoutItem,
                event : 'addCheckoutItem'
            });
        },
        addKeyword : function(keyword) {
            this.keywords.push(keyword);
        },
        addSearchTerm : function(searchTerm) {
            this.searchTerm.push(searchTerm);
        },
        addCategory : function(category) {
            this.category.push(category);
        },
        addExcludeRule : function(e) {
            this.exclude.push(e);
        },
        go : function(immediate, forceSend) {
            var hasViews = function(events) {
                for (var i = 0; i < events.length; ++i) {
                    if (events[i].event === 'addView') return true;
                }
                return false;
            };
            if (trackedFeature && trackedCohort && !hasViews(this.events.events)) {
                Scarab.view('scarab/click',0,0,trackedFeature,trackedCohort);
            }
            this.events.add({
                item : null,
                event : 'commit',
                forceSend : forceSend
            });
            this.events.play(immediate);
        },
        registerFeature : function(feature) {
            feature.transaction = this;
            this.features.push(feature);
        },
        serializeList : function(list) {
            var i, l = list.length, o = [];
            for (i = 0; i < l; i++) {
                if (list[i].serialize) {
                    o.push(list[i].serialize());
                } else {
                    o.push(list[i]);
                }
            }
            return o.join('|');
        },
        serializeContext : function() {
            var i, list, slist = [], l;
            for (i in SERIALIZE) {
                if (SERIALIZE.hasOwnProperty(i)) {
                    list = this[SERIALIZE[i]];
                    if (list.length > 0) {
                        slist.push(i + '=' +
                                encodeURIComponent(this.serializeList(list)));
                    }
                }
            }

            var unsentFeatures = ScarabArrays.filter(this.features, function(feature) { return !feature.requestSent; });
            if (unsentFeatures.length > 0) {
                slist.push('f=' + encodeURIComponent(this.serializeList(unsentFeatures)));
            }
            ScarabArrays.forEach(unsentFeatures, function(feature) { feature.requestSent = true; });

            for (i = 0; i < this.features.length; i++) {
                if (this.features[i].pi && this.features[i].pi.length > 0) {
                    list = Array.prototype.concat([ this.features[i].f ],
                            this.features[i].pi);
                    slist.push('pi=' +
                            encodeURIComponent(this.serializeList(list)));
                }
            }

            if (sessionId) {
                slist.push('s=' + encodeURIComponent(sessionId));
            }

            if (visitorId) {
                slist.push('vi=' + encodeURIComponent(visitorId));
            }

            if (customerId) {
                slist.push('ci=' + encodeURIComponent(customerId));
            }

            if (fields) {
                slist.push('fields=' + encodeURIComponent(this.serializeList(fields)));
            }

            if (this.exclude.length > 0) {
                slist.push('ex=' + encodeURIComponent(JSON.stringify(this.exclude)));
            }

            if (forcedCohort) {
                slist.push('fc=' + encodeURIComponent(forcedCohort));
            }
            if (this.orderId) {
                slist.push('oi=' + encodeURIComponent(this.orderId));
            }

            if (getTestMode()) {
                slist.push('test=true');
            }
            if (debugMode) {
                slist.push('debug=' + debugMode);
            }
            if (document.referrer) {
                slist.push('prev_url=' + encodeURIComponent(document.referrer));
            }

            return slist.join('&');
        },
        checkRequest : function() {
            return true;
        },
        getHost : function() {
            if (getServerUrl()) {
                return getServerUrl() + "/merchants/";
            }
            var proto = document.location.protocol;
            if (proto == "file:") {
                proto = "http:";
            }
            return proto + '//recommender.scarabresearch.com/merchants/';
        },
        generateUrl : function() {

            /*
             * If we don't have any data, do nothing.
             */
            if (!this.checkRequest()) {
                return false;
            }

            var context = this.serializeContext();
            if (context.length) context += '&';
            var url = this.getHost() + getMerchantId() + '/?' +
                context + 'callback=' +
                this.callbackName;

            return url;
        },
        sendRequest : function() {
            var url = this.generateUrl();
            if (this.callbackName === "") {
                var i = new Image();
                i.src = url;
            } else {
                var s = document.createElement('script');
                s.src = url;
                s.id = "scarab-jsonp-" + this.callbackName;
                s.type = 'text/javascript';
                s.charset = 'UTF-8';
                document.getElementsByTagName('head')[0].appendChild(s);
            }
        },
        callback : function(data) {
            var feature, index, currentFeature, product, items, newPage, i;
            if (data.trace && typeof console !== 'undefined') {
                console.log('SCARAB SERVER: ' + data.trace);
            }
            if (data.products) {
                products = ScarabUtil.merge(products, data.products);
            }
            if (data.features) {
                for (feature in data.features) {
                    if (data.features.hasOwnProperty(feature)) {
                        currentFeature = findFeature(feature);
                        if (currentFeature) {
                            items = data.features[feature].items;
                            newPage = new Page();
                            for (i = 0; i < items.length; i++) {
                                product = ScarabUtil.merge(items[i], products[items[i].id]);
                                newPage.addProduct(product);
                            }
                            currentFeature.hasMore = data.features[feature].hasMore;
                            currentFeature.cohort = data.cohort;
                            currentFeature.merchants = data.features[feature].merchants;
                            currentFeature.addPage(newPage);
                        }
                    }
                }
            }
            this.highlightFeatures();
        }
    };

    var addFeature = function(featureObject) {
        features.push(featureObject);
        return featureObject;
    };

    var findFeature = function(f) {
        var index = ScarabUtil.indexOfItem(features, f, 'f');
        if (index > -1) {
            return features[index];
        }
        return null;
    };

    var getTrnName = function() {
        return 'tx' + transactionCounter;
    };

    /*
     * Setters and Getters
     */

    var setMerchantId = function(mid) {
        merchantId = mid;
    };

    var getMerchantId = function() {
        if (merchantId) {
            return merchantId;
        }
        var apiTag = document.getElementById('scarab-js-api');
        if (apiTag && apiTag.src) {
            merchantId = apiTag.src.substring(apiTag.src.indexOf('/js/')
                    + '/js/'.length);
            if (merchantId.indexOf('/') != -1) {
                merchantId = merchantId.substr(0, merchantId.indexOf('/'));
            }
        }
        return merchantId;
    };

    var setSessionId = function(sid) {
        sessionId = sid;
    };

    var setVisitorId = function(vid) {
        visitorId = vid;
    };

    var setCustomerId = function(cid) {
        customerId = cid;
    };

    var setFields = function(fs) {
        fields = fs;
    };

    var getCustomerId = function() {
        return customerId;
    };

    var setTestMode = function(tm) {
        testMode = tm;
    };

    var getTestMode = function() {
        return testMode;
    };

    var setServerUrl = function(url) {
        serverUrl = url;
    };

    var getServerUrl = function() {
        return serverUrl;
    };

    var setForcedCohort = function(cohortId) {
        forcedCohort = cohortId;
    };

    var getForcedCohort = function() {
        return forcedCohort;
    };

    var getCurrentTransaction = function() {
        var trn = getTrnName();
        if (trn in transactions) {
            return transactions[trn];
        }
        return null;
    };

    /**
     * begin
     */
    var start = function() {
        transactionCounter++;
        transactions[getTrnName()] = new Transaction(getTrnName());
    };

    /**
     * commit
     */
    var go = function(delayed, forceSend) {
        var trn = getTrnName(), ctr = transactions[trn], callbackName = 'cb_'
                + trn;
        Scarab[callbackName] = function(data) {
            transactions[trn].callback(data);
        };
        ctr.callbackName = 'Scarab.' + callbackName;
        ctr.go(!delayed, forceSend);
        return ctr;
    };

    var myFeature = function(featureName, elementId) {
        if (!document.getElementById(elementId)) {
            throw new ReferenceError('Error in Scarab.myFeature() call: element "' + elementId + '" does not exist.');
        }
        var tr = getCurrentTransaction(), feature = addFeature(new Feature({
            f : featureName,
            parent : document.getElementById(elementId),
            attachedListeners : true,
            cust : 1
        }));
        feature.attachListeners();
        feature.setProducts(feature.findProducts());
        tr.registerFeature(feature);
    };

    var init = function() {
        var searchString = w.location.search.substring(1), i, val, params = searchString
                .split("&");

        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] === 'sc_feature') {
                trackedFeature = val[1];
            } else if (val[0] === 'sc_cohort') {
                trackedCohort = val[1];
            } else if (val[0] === 'sc_customer') {
                customerId = val[1];
            } else if (val[0] === 'sc_debug') {
            	debugMode = val[1];
            } else if (val[0] === 'sc_src') {
                trafficSource = val[1];
            }
        }
    }

    init();

    start();

    /*
     * public interfaces
     *
     */
    return {
        defaultTemplate : '<![CDATA[ {{ if(SC.page.products.length) { }}<div class="scarab-itemlist"><div class="scarab-prev">◀</div>{{ for(var i=0;i<SC.page.products.length;i++) { }}<span data-scarabitem="{{= SC.page.products[i].id }}" class="scarab-item"><a href="{{= SC.page.products[i].link }}"><img src="{{= SC.page.products[i].image }}">{{= SC.page.products[i].title }}</a></span>{{ } }}<div class="scarab-next">▶</div></div>{{ } }} ]]>',
        testMode : function() {
            setTestMode(true);
        },
        setMerchantId : function(mid) {
            setMerchantId(mid);
        },
        setSessionId : function(sid) {
            setSessionId(sid);
        },
        setVisitorId : function(vid) {
            setVisitorId(vid);
        },
        setCustomerId : function(cid) {
            setCustomerId(cid);
        },
        setEmail : function(email) {
            setCustomerId(ScarabUtil.sha1(email));
        },
        setFields : function(fields) {
            setFields(fields);
        },
        setOrderId : function(orderId) {
            var tr = getCurrentTransaction();
            tr.setOrderId(orderId);
        },
        setCohortId : function(cohortId) {
            setForcedCohort(cohortId);
        },
        addKeyword : function(keyword) {
            var tr = getCurrentTransaction();
            tr.addKeyword(keyword);
        },
        searchTerm : function(searchTerm) {
            var tr = getCurrentTransaction();
            tr.addSearchTerm(searchTerm);
        },
        category : function(category) {
            var tr = getCurrentTransaction();
            tr.addCategory(category);
        },

        view : function(itemId, quantity, price, feature, cohort) {
            var tr = getCurrentTransaction();
            tr.addView(new Item({
                  i : itemId,
                  p : price,
                  q : quantity,
                  t : feature,
                  c : cohort
            }));
        },
        addToCart : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addAddedItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        cartItem : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addCartItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        checkOut : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addCheckoutItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        include: function(field, rule, value) {
            Scarab.exclude(field, rule, value, true);
        },
        exclude : function(field, rule, value, negate) {
            if (typeof value === 'undefined') {
                value = rule;
                rule = 'is';
            }

            var RULES = {
              'is': 'IS',
              'has': 'HAS',
              'in': 'IN',
              'overlaps': 'OVERLAPS',
              'is not': 'IS',
              'has not': 'HAS',
              'not in': 'IN',
            };

            if (typeof RULES[rule] === 'undefined') {
                throw new Error("unknown exclude rule: " + rule);
            }

            if (rule.indexOf('not') !== -1) {
                negate = true;
            }

            if (typeof value !== 'string') {
                value = value.join('|');
            }

            var tr = getCurrentTransaction();
            negate = negate || false;
            tr.addExcludeRule({f:field, r: RULES[rule], v: value, n: negate});
        },
        updateTemplate : function(feature, newTemplate) {
            var f = findFeature(new Feature({f : feature }));
            if (f) {
                f.template = doT.template(newTemplate);
            }
        },
        recommend : function(conf, element, limit, template, baselineRecs, successCallback) {
            var feature = conf;
            if (typeof conf === 'object') {
                feature = conf.logic;
                element = conf.containerId;
                limit = conf.limit;
                if (conf.templateStr) {
                    template = conf.templateStr;
                } else if (conf.templateId){
                    template = document.getElementById(conf.templateId).innerHTML;
                } else {
                    template = Scarab.defaultTemplate;
                }
                baselineRecs = conf.baseline;
                successCallback = conf.success;
            }

            var tr = getCurrentTransaction();
            var f = findFeature(new Feature({f : feature }));

            if (!f) {
                f = new Feature(
                        {
                            f : feature,
                            o : 0,
                            l : parseInt(limit, 10) || 5,
                            parent : document.getElementById(element),
                            template : doT.template(template || Scarab.defaultTemplate),
                            pages : []
                        });
                if (baselineRecs) {
                    f.setProducts(baselineRecs);
                }
                addFeature(f);
                f.successCallback = successCallback;
            }
            f.requestSent = false;
            f.purgePagesCache();
            tr.registerFeature(f);
            return f;
        },
        invokeRendering : function(SC, renderCallback) {
            renderCallback(SC);
        },
        beforeRenderingAsync: function(callback) {
            Scarab.invokeRendering = callback;
        },
        beforeRendering: function(callback) {
            if (callback && typeof(callback) === 'function') {
                beforeRendering = callback;
            }
        },
        afterRendering: function(callback) {
            if (callback && typeof(callback) === 'function') {
                afterRendering = callback;
            }
        },
        skipRendering: function() {
            skipRendering = true;
        },
        itemClick : function(itemId, feature, cohort) {
            addCookie(STRINGS.VIEWCOOKIE, new Item({
                i : itemId,
                t : feature,
                c : cohort
            }));
        },
        myFeature : myFeature,
        go : function(forceSend) {
            go(false, forceSend);
        },
        goAsync : function(forceSend) {
            go(true, forceSend);
        },
        setServerUrl : function(serverUrl) {
            setServerUrl(serverUrl);
        }
    };
};

var Scarab = ScarabModule(window);
var _scPlayQueue = function(publicAPI, queue){
    var Queue = function(queue) {
        if (!(queue instanceof Array)) {
            if (queue instanceof Queue) return;
            throw new SyntaxError("Scarab Queue is not an array");
        }
        for (var i = 0; i < queue.length; ++i) {
          this.push(queue[i]);
        }
    };
    Queue.prototype.push = function() {
      for (var i = 0; i < arguments.length; ++i) {
          var commandArray = arguments[i];
          if (!(commandArray instanceof Array) && commandArray.length > 0) {
              throw new SyntaxError("command should be a non-empty array: " + commandArray);
          }
          var command = commandArray[0];
          var params = [];
          for (var j = 1; j < commandArray.length; ++j) {
            params.push(commandArray[j]);
          }
          if (publicAPI.hasOwnProperty(command)) {
            publicAPI[command].apply(null, params);
          } else {
              throw new SyntaxError("unknown command: " + command);
          }
      }
    };
    return new Queue(queue);
};

var _scq = _scPlayQueue(Scarab, _scq || []);
var ScarabQueue = _scPlayQueue(Scarab, ScarabQueue || []);


