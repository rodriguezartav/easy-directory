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


