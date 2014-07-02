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