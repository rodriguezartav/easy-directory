var http = require("https")
var Path = require("path")
var fs = require("fs")
var Listing = require("../code/models/listing")
var url = 'https://spreadsheets.google.com/feeds/list/1Cj_rc5QV6LK2RTGkGZb8c3B04coNFys0Zp9m5KBtkmI/od6/public/values?alt=json';

return false;

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        writeFile(transform(JSON.parse(body)));
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});


function transform(json) {
	var posts = Listing.parse(json)
	return posts;
}

function getValue(obj,type){
	if(obj[type] && obj[type]["$t"]) return obj[type]["$t"]
	return ""
}

function writeFile(body){
	var generatedPath = Path.join( __dirname, "..", "code", "data", "data.json" );

	fs.writeFileSync(generatedPath, JSON.stringify(body, null, '\t') , "utf-8");

	console.log("Pre Hook Executed Successfully")
}