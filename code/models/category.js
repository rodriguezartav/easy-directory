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