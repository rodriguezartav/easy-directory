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

