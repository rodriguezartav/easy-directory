(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("3vot")( require("./package") )
},{"./package":4,"3vot":2}],2:[function(require,module,exports){
window = window || { location: { hostname: "3vot.com", protocol: "http" } };

window._3vot = {
  el: null,
  package: {},
  initOptions: {},
  utils: require("./utils"),
  device: "",
  width: "",
  height: "",
  user_name: "",
  unique_query_string: "unique_domain=" + window.location.protocol + window.location.hostname
};

module.exports= init;

function init(package, options){
  if(!options) options = {};
  _3vot.initOptions = options;
  _3vot.package = package;

  _3vot.user_name = package.threevot.user_name;
  _3vot.endpoint= options.endpoint || "http://backend.3vot.com/v1";
  _3vot.frontpoint= options.frontpoint || "http://daulau2emlz5i.cloudfront.net";
  _3vot.domain= ""; //options.domain || "//3vot.com";
  _3vot.path= package.name; //_3vot.domain+"/"+_3vot.user_name+"/"+package.name;
  _3vot.host= _3vot.frontpoint.split("://")[1];
  _3vot.el = document.getElementById('_3vot_' + package.name);
  _3vot.app = package.name;
  loadFile( fileToLoad() );
}

function fileToLoad(){
  var entries = _3vot.package.threevot.entries || _3vot.package.threevot.platforms || _3vot.package.threevot.screens;

  // "screens": {
  //    "0-320" : [ "phone" ],
  //    "320-900": [ "desktop", "laptop" ],
  //    "900-1200" : [ "tablet" ],
  //    "1200-5000" : [ "tablet" ]
  //  }

  var fileToLoad = "index";
  var width = document.documentElement.clientWidth;
  for(entry in entries){
    var borders = entry.split("-");
    if(width > parseInt(borders[0]) && width <= parseInt(borders[1]) ){
      fileToLoad = entries[entry];
    }
  }

  if(!fileToLoad) return console.error("Could not determine a file to load from package.json threevot.screens. 3VOT will load index.js please fix package.json of your app.");
  return fileToLoad;
}

function loadFile(fileToCall){
  if(!fileToCall) return false;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =  "//3vot.com/tutorial/dir/" + fileToCall + '.js?' + _3vot.unique_query_string;    

  document.getElementsByTagName('head')[0].appendChild(script);

}

},{"./utils":3}],3:[function(require,module,exports){
module.exports = {

  getCurrentUrl: function (){
    var currentUrl = window.location.href
    lastIndex = currentUrl[currentUrl.length -1];
    if(lastIndex != "/") currentUrl += "/"
    return currentUrl;
  },
  
  replaceAll: function (str, find, replace) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
  }
  
}
},{}],4:[function(require,module,exports){
module.exports={
	"INSTRUCTIONS": {
		"name": "READ ONLY: The name of the app, also url slug in 3vot.com/YOUR PROFILE/name",
		"description": "The ~140 chars description that appears on your 3VOT Web Page with Apps",
		"displayName": "The Name that appears on the 3VOT Platform Profile, it can have any character",
		"size": "Apps have 3 sizes (small, regular and large); They have different traffic allowances and prices",
		"platforms": "The file that will be dynamically loaded once we know the screen size. Located in the /start folder",
		"extensions": "Compile Option: require files with using it's extension",
		"transforms": "Compile Option: The NPM Browserify Transforms applied when compiling App",
		"external": "Performance Option: Allows to extract the common depedencies between apps ie: jquery, cache and speed all apps",
		"gitDependencies": "Bower and Github based Libraries that can be required within an app. ie: Angular",
		"depedencies": "NPM Browser Compatible Dependencies that can be required within an app. ie: 3vot-model"
	},
	"name": "dir",
	"description": "",
	"version": "0.0.5",
	"threevot": {
		"user_name": "tutorial",
		"version": "5",
		"displayName": "dir",
		"size": "small",
		"screens": {
			"0-320": "index",
			"320-900": "index",
			"900-1200": "index",
			"1200-5000": "index"
		},
		"extensions": [
			".coffee",
			".eco",
			".html"
		],
		"transforms": [
			"browserify-eco",
			"coffeeify",
			"brfs"
		],
		"external": {},
		"gitDependencies": {}
	},
	"dependencies": {
		"3vot": "0.1.4",
		"3vot-model": "0.1.0"
	}
}
},{}]},{},[1])