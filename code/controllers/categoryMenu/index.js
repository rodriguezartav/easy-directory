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