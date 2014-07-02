(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
//Declaring Item Template
var MenuItem = require("./menuItem")

var Category = require("../../models/category");

var el;


//Initialize function, receives a DomElementId string and assigns the Dom Element to el for future use.
function init(domElementId){
	el = document.getElementById(domElementId)
	//Returns Todo List to simplify Jquery Style Chaining API
	Category.bind("refresh", render);
}

//Renders all objects in TodoList.items using Item Template
function render(){
	var items = Category.all();
	var src = ""
	for(i in items) src += MenuItem(items[i]);
	el.innerHTML = src;
}

module.exports = init;

// NOTES:
// 1. This is the simplest pattern for components that will be instantiated only once.
// 2. Using this for-loop only works with array
// 3. Requires manual rendering, an automatic implementation would use Models with EventEmmiters
},{"../../models/category":9,"./menuItem":3}],3:[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<li class="list-group-item">\n \t<a href="#');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"  data-id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</a>\n</li>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
},{}],4:[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="container-fluid category-item" >\n\n\t<div class="row">\n\t\t\n\t\t<div class="col-md-3">\n\t\t\t<h1  name="#');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" >');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</h1>\n\t\t</div>\n\n\t\t<div class="col-md-9">\n\t\t\t');
    
      __out.push(this.html);
    
      __out.push('\n\t\t</div>\n\n\n\t</div>\n\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
},{}],5:[function(require,module,exports){
var CategoryItem = require("./categoryItem")
var SubCategoryItem = require("./subcategoryItem")
var ListingItem = require("./listingItem")


var Listing = require("../../models/listing");
var Category = require("../../models/category");

var el;

function init(domElementId){
	el = document.getElementById(domElementId);
	Category.bind("refresh", render);
}

function render(){
	var categories = Category.all();
	var src = ""

	for(categoryIndex in categories){
		var category = categories[categoryIndex];
		category.html = ""
		
		for (var i = category.subcategories.length - 1; i >= 0; i--) {
			var subcategory = category.subcategories[i];
			var listingHtml = ""
			var listingsInCategory = Listing.select(function(listing){ return category.name == listing.category && subcategory == listing.subcategory });	

			for (var ii = 0; ii < listingsInCategory.length; ii++) listingHtml += ListingItem( listingsInCategory[ii] );
			category.html += SubCategoryItem({name: subcategory, html: listingHtml });	
		};

		src += CategoryItem(category);
	}
	el.innerHTML = src;
}

module.exports = init;


},{"../../models/category":9,"../../models/listing":10,"./categoryItem":4,"./listingItem":6,"./subcategoryItem":7}],6:[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="media listing-item">\n  <a class="pull-left" >\n    <img class="media-object img-responsive img-thumbnail" src="');
    
      __out.push(__sanitize(this.image));
    
      __out.push('" alt="...">\n  </a>\n  <div class="media-body">\n    <h4 class="media-heading">');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</h4>\n\t\t<p class="lead">');
    
      __out.push(__sanitize(this.description));
    
      __out.push('</p>\n\t\t<a target="_blank" href="');
    
      __out.push(__sanitize(this.link));
    
      __out.push('">+ Info: ');
    
      __out.push(__sanitize(this.link));
    
      __out.push('</a>\t\t\t\t    \n  </div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
},{}],7:[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="subcategory-item">\n\t<h2>');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</h2>\n\t');
    
      __out.push(this.html);
    
      __out.push('\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
},{}],8:[function(require,module,exports){
module.exports=[
	{
		"name": "Item 8",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 1",
		"subcategory": "Subcategory 1-3",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 7",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 3",
		"subcategory": "Subcategory 1-2",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 6",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 3",
		"subcategory": "Subcategory 1-1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 5",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 1",
		"subcategory": "Subcategory 1-1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 4",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 1",
		"subcategory": "Subcategory 1-1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 3",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 2",
		"subcategory": "Subcategory 1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 2",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 2",
		"subcategory": "Subcategory 1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	},
	{
		"name": "Item 1",
		"description": "Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans. Lorem Ipsum goldan sirum, nas la faltan ne pase se de mercy arive along travans",
		"link": "http://google.com",
		"image": "https://dl.dropboxusercontent.com/u/6461913/icon-face.png",
		"category": "Category 1",
		"subcategory": "Subcategory 1-1",
		"type": "Small",
		"details": "any=true&count=22&color=white"
	}
]
},{}],9:[function(require,module,exports){
var _3Model = require("3vot-model/lib/ajaxless")

var fields = [ "name","subcategories" ]; 

Category = _3Model.Model.setup("Category", fields);

Category.createFromListing = function(listings){
	var categories = {}
	for (var i = listings.length - 1; i >= 0; i--) {
		var listing = listings[i];

		var category = listing.category;
		var subcategory = listing.subcategory;

		if( !categories[category] ) categories[category] = {name: category, subcategories: []}
		if( categories[category].subcategories.indexOf( subcategory ) == -1 ) categories[category].subcategories.push(subcategory)
	};
	
	var items = []
	for(i in categories){
		items.push(categories[i])
	}
	Category.refresh(items);
	

}

module.exports = Category

//CONVERT MARKDOWN TO LINK .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a target="_blank" href="\$2">\$1</a>')
},{"3vot-model/lib/ajaxless":12}],10:[function(require,module,exports){
var fs = require("fs")
var _3Model = require("3vot-model/lib/ajaxless")

var fields = ["name",	"description",	"link",	"image",	"category",	"subcategory",	"type", "details"]; 

Listing = _3Model.Model.setup("Listing", fields);

Listing.loadFromJSON = function(){
	var json = require("../data/data.json")
	Listing.refresh(json);
}

Listing.loadFromGoogle  = function(){
	var script = document.createElement('script');
	script.src = 'https://spreadsheets.google.com/feeds/list/1Cj_rc5QV6LK2RTGkGZb8c3B04coNFys0Zp9m5KBtkmI/od6/public/values?alt=json-in-script&callback=hooray';
	document.body.appendChild(script);

	window.hooray = function(json) {
		var posts = Listing.parse(json);
		Listing.refresh(posts);	
	}
}

Listing.parse = function(json){
	var posts = []
	for (var i = json.feed.entry.length - 1; i >= 0; i--) {
		var post = json.feed.entry[i]
		var obj = {}
		for(attrIndex in fields){
			var attr = fields[attrIndex]
			obj[attr] = getValue(post, "gsx$" + attr)
		}
		posts.push(obj);
	};
	return posts;
}

function getValue(obj,type){
	if(obj[type] && obj[type]["$t"]) return obj[type]["$t"]
	return ""
}

module.exports = Listing

//CONVERT MARKDOWN TO LINK .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a target="_blank" href="\$2">\$1</a>')
},{"../data/data.json":8,"3vot-model/lib/ajaxless":12,"fs":1}],11:[function(require,module,exports){
var Listing = require("./code/models/listing");
var Category = require("./code/models/category");


var CategoryMenu = require("./code/controllers/categoryMenu");
CategoryMenu("menu-item-controller");


var MainList = require("./code/controllers/mainList");
MainList("main-list-controller");

//Listing.loadFromJSON()
Listing.loadFromGoogle()

Listing.bind("refresh", function(){
	Category.createFromListing( Listing.all() );
})



},{"./code/controllers/categoryMenu":2,"./code/controllers/mainList":5,"./code/models/category":9,"./code/models/listing":10}],12:[function(require,module,exports){
(function() {
  var Events, Model, Module, _3Model;

  Events = require("./events");

  Model = require("./model_ajaxless");

  Module = require("./module");

  _3Model = this._3Model = {};

  _3Model.Events = Events;

  _3Model.Module = Module;

  _3Model.Model = Model;

  _3Model.isBlank = Model.isBlank;

  Module.extend.call(_3Model, Events);

  _3Model.Class = Module;

  module.exports = _3Model;

}).call(this);

},{"./events":13,"./model_ajaxless":14,"./module":15}],13:[function(require,module,exports){
(function() {
  var Events, trim,
    __slice = [].slice;

  trim = function(text) {
    var rtrim, _ref;
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        if ((_ref = text === null) != null) {
      _ref;
    } else {
      ({
        "": (text + "").replace(rtrim, "")
      });
    };
    return text;
  };

  Events = {
    bind: function(ev, callback) {
      var calls, evs, name, _i, _len;
      evs = ev.split(' ');
      if (this.hasOwnProperty('_callbacks') && this._callbacks) {
        calls = this._callbacks;
      } else {
        this._callbacks = {};
        calls = this._callbacks;
      }
      for (_i = 0, _len = evs.length; _i < _len; _i++) {
        name = evs[_i];
        calls[name] || (calls[name] = []);
        calls[name].push(callback);
      }
      return this;
    },
    one: function(ev, callback) {
      var handler;
      return this.bind(ev, handler = function() {
        this.unbind(ev, handler);
        return callback.apply(this, arguments);
      });
    },
    trigger: function() {
      var args, callback, ev, list, _i, _len, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ev = args.shift();
      list = this.hasOwnProperty('_callbacks') && ((_ref = this._callbacks) != null ? _ref[ev] : void 0);
      if (!list) {
        return;
      }
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        callback = list[_i];
        if (callback.apply(this, args) === false) {
          break;
        }
      }
      return true;
    },
    listenTo: function(obj, ev, callback) {
      obj.bind(ev, callback);
      this.listeningTo || (this.listeningTo = []);
      this.listeningTo.push({
        obj: obj,
        ev: ev,
        callback: callback
      });
      return this;
    },
    listenToOnce: function(obj, ev, callback) {
      var handler, listeningToOnce;
      listeningToOnce = this.listeningToOnce || (this.listeningToOnce = []);
      obj.bind(ev, handler = function() {
        var i, idx, lt, _i, _len;
        idx = -1;
        for (i = _i = 0, _len = listeningToOnce.length; _i < _len; i = ++_i) {
          lt = listeningToOnce[i];
          if (lt.obj === obj) {
            if (lt.ev === ev && lt.callback === callback) {
              idx = i;
            }
          }
        }
        obj.unbind(ev, handler);
        if (idx !== -1) {
          listeningToOnce.splice(idx, 1);
        }
        return callback.apply(this, arguments);
      });
      listeningToOnce.push({
        obj: obj,
        ev: ev,
        callback: callback,
        handler: handler
      });
      return this;
    },
    stopListening: function(obj, events, callback) {
      var ev, evts, i, idx, listeningTo, lt, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      if (arguments.length === 0) {
        _ref = [this.listeningTo, this.listeningToOnce];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listeningTo = _ref[_i];
          if (!listeningTo) {
            continue;
          }
          for (_j = 0, _len1 = listeningTo.length; _j < _len1; _j++) {
            lt = listeningTo[_j];
            lt.obj.unbind(lt.ev, lt.handler || lt.callback);
          }
        }
        this.listeningTo = void 0;
        return this.listeningToOnce = void 0;
      } else if (obj) {
        _ref1 = [this.listeningTo, this.listeningToOnce];
        _results = [];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          listeningTo = _ref1[_k];
          if (!listeningTo) {
            continue;
          }
          events = events ? events.split(' ') : [void 0];
          _results.push((function() {
            var _l, _len3, _results1;
            _results1 = [];
            for (_l = 0, _len3 = events.length; _l < _len3; _l++) {
              ev = events[_l];
              _results1.push((function() {
                var _m, _ref2, _results2;
                _results2 = [];
                for (idx = _m = _ref2 = listeningTo.length - 1; _ref2 <= 0 ? _m <= 0 : _m >= 0; idx = _ref2 <= 0 ? ++_m : --_m) {
                  lt = listeningTo[idx];
                  if ((!ev) || (ev === lt.ev)) {
                    lt.obj.unbind(lt.ev, lt.handler || lt.callback);
                    if (idx !== -1) {
                      _results2.push(listeningTo.splice(idx, 1));
                    } else {
                      _results2.push(void 0);
                    }
                  } else if (ev) {
                    evts = lt.ev.split(' ');
                    if (~(i = evts.indexOf(ev))) {
                      evts.splice(i, 1);
                      lt.ev = trim(evts.join(' '));
                      _results2.push(lt.obj.unbind(ev, lt.handler || lt.callback));
                    } else {
                      _results2.push(void 0);
                    }
                  } else {
                    _results2.push(void 0);
                  }
                }
                return _results2;
              })());
            }
            return _results1;
          })());
        }
        return _results;
      }
    },
    unbind: function(ev, callback) {
      var cb, evs, i, list, name, _i, _j, _len, _len1, _ref;
      if (arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      if (!ev) {
        return this;
      }
      evs = ev.split(' ');
      for (_i = 0, _len = evs.length; _i < _len; _i++) {
        name = evs[_i];
        list = (_ref = this._callbacks) != null ? _ref[name] : void 0;
        if (!list) {
          continue;
        }
        if (!callback) {
          delete this._callbacks[name];
          continue;
        }
        for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
          cb = list[i];
          if (!(cb === callback)) {
            continue;
          }
          list = list.slice();
          list.splice(i, 1);
          this._callbacks[name] = list;
          break;
        }
      }
      return this;
    }
  };

  Events.on = Events.bind;

  Events.off = Events.unbind;

  module.exports = Events;

}).call(this);

},{}],14:[function(require,module,exports){
(function() {
  var Events, Model, Module, createObject, isArray, isBlank, makeArray,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Events = require("./events");

  Module = require("./module");

  Model = (function(_super) {
    __extends(Model, _super);

    Model.extend(Events);

    Model.records = [];

    Model.irecords = {};

    Model.attributes = [];

    Model.host = "";

    Model.headers = [];

    Model.configure = function() {
      var attributes, name;
      name = arguments[0], attributes = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.className = name;
      this.deleteAll();
      if (attributes.length) {
        this.attributes = attributes;
      }
      this.attributes && (this.attributes = makeArray(this.attributes));
      this.attributes || (this.attributes = []);
      this.unbind();
      return this;
    };

    Model.toString = function() {
      return "" + this.className + "(" + (this.attributes.join(", ")) + ")";
    };

    Model.find = function(id) {
      var record;
      record = this.exists(id);
      if (!record) {
        throw new Error("\"" + this.className + "\" model could not find a record for the ID \"" + id + "\"");
      }
      return record;
    };

    Model.exists = function(id) {
      var _ref;
      return (_ref = this.irecords[id]) != null ? _ref.clone() : void 0;
    };

    Model.addRecord = function(record) {
      if (record.id && this.irecords[record.id]) {
        this.irecords[record.id].remove();
      }
      record.id || (record.id = record.cid);
      this.records.push(record);
      this.irecords[record.id] = record;
      return this.irecords[record.cid] = record;
    };

    Model.refresh = function(values, options) {
      var record, records, result, _i, _len;
      if (options == null) {
        options = {};
      }
      if (options.clear) {
        this.deleteAll();
      }
      records = this.fromJSON(values);
      if (!isArray(records)) {
        records = [records];
      }
      for (_i = 0, _len = records.length; _i < _len; _i++) {
        record = records[_i];
        this.addRecord(record);
      }
      this.sort();
      result = this.cloneArray(records);
      this.trigger('refresh', result, options);
      return result;
    };

    Model.select = function(callback) {
      var record, _i, _len, _ref, _results;
      _ref = this.records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        if (callback(record)) {
          _results.push(record.clone());
        }
      }
      return _results;
    };

    Model.findByAttribute = function(name, value) {
      var record, _i, _len, _ref;
      _ref = this.records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        if (record[name] === value) {
          return record.clone();
        }
      }
      return null;
    };

    Model.findAllByAttribute = function(name, value) {
      return this.select(function(item) {
        return item[name] === value;
      });
    };

    Model.each = function(callback) {
      var record, _i, _len, _ref, _results;
      _ref = this.records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        _results.push(callback(record.clone()));
      }
      return _results;
    };

    Model.all = function() {
      return this.cloneArray(this.records);
    };

    Model.first = function() {
      var _ref;
      return (_ref = this.records[0]) != null ? _ref.clone() : void 0;
    };

    Model.last = function() {
      var _ref;
      return (_ref = this.records[this.records.length - 1]) != null ? _ref.clone() : void 0;
    };

    Model.count = function() {
      return this.records.length;
    };

    Model.deleteAll = function() {
      this.records = [];
      return this.irecords = {};
    };

    Model.destroyAll = function(options) {
      var record, _i, _len, _ref, _results;
      _ref = this.records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        _results.push(record.destroy(options));
      }
      return _results;
    };

    Model.update = function(id, atts, options) {
      return this.find(id).updateAttributes(atts, options);
    };

    Model.create = function(atts, options) {
      var record;
      record = new this(atts);
      return record.save(options);
    };

    Model.destroy = function(id, options) {
      return this.find(id).destroy(options);
    };

    Model.change = function(callbackOrParams) {
      if (typeof callbackOrParams === 'function') {
        return this.bind('change', callbackOrParams);
      } else {
        return this.trigger.apply(this, ['change'].concat(__slice.call(arguments)));
      }
    };

    Model.fetch = function(callbackOrParams) {
      if (typeof callbackOrParams === 'function') {
        return this.bind('fetch', callbackOrParams);
      } else {
        return this.trigger.apply(this, ['fetch'].concat(__slice.call(arguments)));
      }
    };

    Model.toJSON = function() {
      return this.records;
    };

    Model.fromJSON = function(objects) {
      var value, _i, _len, _results;
      if (!objects) {
        return;
      }
      if (typeof objects === 'string') {
        objects.replace(/\Id/g, 'id');
        objects = JSON.parse(objects);
      }
      if (isArray(objects)) {
        _results = [];
        for (_i = 0, _len = objects.length; _i < _len; _i++) {
          value = objects[_i];
          if (value.Id) {
            value.id = value.Id;
          }
          _results.push(new this(value));
        }
        return _results;
      } else {
        if (objects.Id) {
          objects.id = objects.Id;
        }
        return new this(objects);
      }
    };

    Model.fromForm = function() {
      var _ref;
      return (_ref = new this).fromForm.apply(_ref, arguments);
    };

    Model.sort = function() {
      if (this.comparator) {
        this.records.sort(this.comparator);
      }
      return this;
    };

    Model.cloneArray = function(array) {
      var value, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        value = array[_i];
        _results.push(value.clone());
      }
      return _results;
    };

    Model.idCounter = 0;

    Model.uid = function(prefix) {
      var uid;
      if (prefix == null) {
        prefix = '';
      }
      uid = prefix + this.idCounter++;
      if (this.exists(uid)) {
        uid = this.uid(prefix);
      }
      return uid;
    };

    function Model(atts) {
      Model.__super__.constructor.apply(this, arguments);
      if (atts) {
        this.load(atts);
      }
      this.cid = (atts != null ? atts.cid : void 0) || this.constructor.uid('c-');
    }

    Model.prototype.isNew = function() {
      return !this.exists();
    };

    Model.prototype.isValid = function() {
      return !this.validate();
    };

    Model.prototype.validate = function() {};

    Model.prototype.load = function(atts) {
      var key, value;
      if (atts.id) {
        this.id = atts.id;
      }
      for (key in atts) {
        value = atts[key];
        if (atts.hasOwnProperty(key) && typeof this[key] === 'function') {
          this[key](value);
        } else {
          this[key] = value;
        }
      }
      return this;
    };

    Model.prototype.get = function(attr) {
      return this[attr];
    };

    Model.prototype.set = function(attr, value) {
      return this[attr] = value;
    };

    Model.prototype.attributes = function() {
      var key, result, _i, _len, _ref;
      result = {};
      _ref = this.constructor.attributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (key in this) {
          if (typeof this[key] === 'function') {
            result[key] = this[key]();
          } else {
            result[key] = this[key];
          }
        }
      }
      if (this.id) {
        result.id = this.id;
      }
      return result;
    };

    Model.prototype.eql = function(rec) {
      return !!(rec && rec.constructor === this.constructor && (rec.cid === this.cid) || (rec.id && rec.id === this.id));
    };

    Model.prototype.save = function(options) {
      var error, record;
      if (options == null) {
        options = {};
      }
      if (options.validate !== false) {
        error = this.validate();
        if (error) {
          this.trigger('error', error);
          return false;
        }
      }
      this.trigger('beforeSave', options);
      record = this.isNew() ? this.create(options) : this.update(options);
      this.stripCloneAttrs();
      this.trigger('save', options);
      return record;
    };

    Model.prototype.stripCloneAttrs = function() {
      var key, value;
      if (this.hasOwnProperty('cid')) {
        return;
      }
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        value = this[key];
        if (this.constructor.attributes.indexOf(key) > -1) {
          delete this[key];
        }
      }
      return this;
    };

    Model.prototype.updateAttribute = function(name, value, options) {
      var atts;
      atts = {};
      atts[name] = value;
      return this.updateAttributes(atts, options);
    };

    Model.prototype.updateAttributes = function(atts, options) {
      this.load(atts);
      return this.save(options);
    };

    Model.prototype.changeID = function(id) {
      var records;
      if (id === this.id) {
        return;
      }
      records = this.constructor.irecords;
      records[id] = records[this.id];
      delete records[this.id];
      this.id = id;
      return this.save();
    };

    Model.prototype.remove = function() {
      var i, record, records, _i, _len;
      records = this.constructor.records.slice(0);
      for (i = _i = 0, _len = records.length; _i < _len; i = ++_i) {
        record = records[i];
        if (!(this.eql(record))) {
          continue;
        }
        records.splice(i, 1);
        break;
      }
      this.constructor.records = records;
      delete this.constructor.irecords[this.id];
      return delete this.constructor.irecords[this.cid];
    };

    Model.prototype.destroy = function(options) {
      if (options == null) {
        options = {};
      }
      this.trigger('beforeDestroy', options);
      this.remove();
      this.destroyed = true;
      this.trigger('destroy', options);
      this.trigger('change', 'destroy', options);
      if (this.listeningTo) {
        this.stopListening();
      }
      this.unbind();
      return this;
    };

    Model.prototype.dup = function(newRecord) {
      var atts;
      if (newRecord == null) {
        newRecord = true;
      }
      atts = this.attributes();
      if (newRecord) {
        delete atts.id;
      } else {
        atts.cid = this.cid;
      }
      return new this.constructor(atts);
    };

    Model.prototype.clone = function() {
      return createObject(this);
    };

    Model.prototype.reload = function() {
      var original;
      if (this.isNew()) {
        return this;
      }
      original = this.constructor.find(this.id);
      this.load(original.attributes());
      return original;
    };

    Model.prototype.refresh = function(data) {
      var root;
      root = this.constructor.irecords[this.id];
      root.load(data);
      this.trigger('refresh');
      return this;
    };

    Model.prototype.toJSON = function() {
      return this.attributes();
    };

    Model.prototype.toString = function() {
      return "<" + this.constructor.className + " (" + (JSON.stringify(this)) + ")>";
    };

    Model.prototype.fromForm = function(form) {
      var result;
      result = {};

      /*      
      for checkbox in $(form).find('[type=checkbox]:not([value])')
        result[checkbox.name] = $(checkbox).prop('checked')
      
      for checkbox in $(form).find('[type=checkbox][name$="[]"]')
        name = checkbox.name.replace(/\[\]$/, '')
        result[name] or= []
        result[name].push checkbox.value if $(checkbox).prop('checked')
      
      for key in $(form).serializeArray()
        result[key.name] or= key.value
       */
      return this.load(result);
    };

    Model.prototype.exists = function() {
      return this.constructor.exists(this.id);
    };

    Model.prototype.update = function(options) {
      var clone, records;
      this.trigger('beforeUpdate', options);
      records = this.constructor.irecords;
      records[this.id].load(this.attributes());
      this.constructor.sort();
      clone = records[this.id].clone();
      clone.trigger('update', options);
      clone.trigger('change', 'update', options);
      return clone;
    };

    Model.prototype.create = function(options) {
      var clone, record;
      this.trigger('beforeCreate', options);
      this.id || (this.id = this.cid);
      record = this.dup(false);
      this.constructor.addRecord(record);
      this.constructor.sort();
      clone = record.clone();
      clone.trigger('create', options);
      clone.trigger('change', 'create', options);
      return clone;
    };

    Model.prototype.bind = function(events, callback) {
      var binder, singleEvent, _fn, _i, _len, _ref;
      this.constructor.bind(events, binder = (function(_this) {
        return function(record) {
          if (record && _this.eql(record)) {
            return callback.apply(_this, arguments);
          }
        };
      })(this));
      _ref = events.split(' ');
      _fn = (function(_this) {
        return function(singleEvent) {
          var unbinder;
          return _this.constructor.bind("unbind", unbinder = function(record, event, cb) {
            if (record && _this.eql(record)) {
              if (event && event !== singleEvent) {
                return;
              }
              if (cb && cb !== callback) {
                return;
              }
              _this.constructor.unbind(singleEvent, binder);
              return _this.constructor.unbind("unbind", unbinder);
            }
          });
        };
      })(this);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        singleEvent = _ref[_i];
        _fn(singleEvent);
      }
      return this;
    };

    Model.prototype.one = function(events, callback) {
      var handler;
      return this.bind(events, handler = (function(_this) {
        return function() {
          _this.unbind(events, handler);
          return callback.apply(_this, arguments);
        };
      })(this));
    };

    Model.prototype.trigger = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.splice(1, 0, this);
      return (_ref = this.constructor).trigger.apply(_ref, args);
    };

    Model.prototype.listenTo = function() {
      return Events.listenTo.apply(this, arguments);
    };

    Model.prototype.listenToOnce = function() {
      return Events.listenToOnce.apply(this, arguments);
    };

    Model.prototype.stopListening = function() {
      return Events.stopListening.apply(this, arguments);
    };

    Model.prototype.unbind = function(events, callback) {
      var event, _i, _len, _ref, _results;
      if (arguments.length === 0) {
        return this.trigger('unbind');
      } else if (events) {
        _ref = events.split(' ');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          _results.push(this.trigger('unbind', event, callback));
        }
        return _results;
      }
    };

    return Model;

  })(Module);

  Model.prototype.on = Model.prototype.bind;

  Model.prototype.off = Model.prototype.unbind;

  createObject = Object.create || function(o) {
    var Func;
    Func = function() {};
    Func.prototype = o;
    return new Func();
  };

  isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };

  isBlank = function(value) {
    var key;
    if (!value) {
      return true;
    }
    for (key in value) {
      return false;
    }
    return true;
  };

  makeArray = function(args) {
    return Array.prototype.slice.call(args, 0);
  };

  Model.isBlank = isBlank;

  Model.sub = function(instances, statics) {
    var Result;
    Result = (function(_super) {
      __extends(Result, _super);

      function Result() {
        return Result.__super__.constructor.apply(this, arguments);
      }

      return Result;

    })(this);
    if (instances) {
      Result.include(instances);
    }
    if (statics) {
      Result.extend(statics);
    }
    if (typeof Result.unbind === "function") {
      Result.unbind();
    }
    return Result;
  };

  Model.setup = function(name, attributes) {
    var Instance;
    if (attributes == null) {
      attributes = [];
    }
    Instance = (function(_super) {
      __extends(Instance, _super);

      function Instance() {
        return Instance.__super__.constructor.apply(this, arguments);
      }

      return Instance;

    })(this);
    Instance.configure.apply(Instance, [name].concat(__slice.call(attributes)));
    return Instance;
  };

  Model.host = "";

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Model;
  }

}).call(this);

},{"./events":13,"./module":15}],15:[function(require,module,exports){
(function() {
  var Module, moduleKeywords,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  moduleKeywords = ['included', 'extended'];

  Module = (function() {
    Module.include = function(obj) {
      var key, value, _ref;
      if (!obj) {
        throw new Error('include(obj) requires obj');
      }
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((_ref = obj.included) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Module.extend = function(obj) {
      var key, value, _ref;
      if (!obj) {
        throw new Error('extend(obj) requires obj');
      }
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Module.proxy = function(func) {
      return (function(_this) {
        return function() {
          return func.apply(_this, arguments);
        };
      })(this);
    };

    Module.prototype.proxy = function(func) {
      return (function(_this) {
        return function() {
          return func.apply(_this, arguments);
        };
      })(this);
    };

    function Module() {
      if (typeof this.init === "function") {
        this.init.apply(this, arguments);
      }
    }

    return Module;

  })();

  Module.create = Module.sub = function(instances, statics) {
    var Result;
    Result = (function(_super) {
      __extends(Result, _super);

      function Result() {
        return Result.__super__.constructor.apply(this, arguments);
      }

      return Result;

    })(this);
    if (instances) {
      Result.include(instances);
    }
    if (statics) {
      Result.extend(statics);
    }
    if (typeof Result.unbind === "function") {
      Result.unbind();
    }
    return Result;
  };

  module.exports = Module;

}).call(this);

},{}]},{},[11])