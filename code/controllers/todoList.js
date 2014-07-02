//Declaring Item Template
var ItemTemplate = require("../views/todoItem")

var Listing = require("../models/listing");

var el;

//Object to be Exported. This is what will be assigned to TodoList in var TodoList =  require("./todoList")
var TodoList = {
	init: init,
	render: render
};

//Initialize function, receives a DomElementId string and assigns the Dom Element to el for future use.
function init(domElementId){
	el = document.getElementById(domElementId)
	//Returns Todo List to simplify Jquery Style Chaining API

	return TodoList;
}

//Renders all objects in TodoList.items using Item Template
function render(){
	var items = Category.all();
	var src = ""
	for(i in items) src += ItemTemplate(items[i]);
	el.innerHTML = src;
}

module.exports = TodoList;

// NOTES:
// 1. This is the simplest pattern for components that will be instantiated only once.
// 2. Using this for-loop only works with array
// 3. Requires manual rendering, an automatic implementation would use Models with EventEmmiters