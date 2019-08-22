var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



//Mongo connection
mongoose.connect("mongodb://localhost/todo");


//Mongo schema
var todoSchema = new mongoose.Schema({
	name: String
});

var Todo = mongoose.model("Todo", todoSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// var todoList = [
// 	"First Task",
// 	"Second Task"
// 	]

//==========Routes============//

// default route
app.get("/", function(req, res){
	Todo.find({}, function(err, todoList) {
		if(err) console.log(err);
		else{
			res.render("index.ejs", {todoList: todoList});
		}
	})
});

//To catch all WRONG routes
app.get("*", function(req, res){
	res.send("<h1>INVALID PAGE</h1>");
});


//Submit form route
app.post("/newtodo", function(req, res){
	console.log("item submitted");
	var newItem = new Todo({
		name: req.body.item
	});
	Todo.create(newItem, function(err, Todo) {
		if(err) console.log(err);
		else{
			console.log("Inserted Item: "+newItem);
		}
	});
	res.redirect("/");
});


app.listen(3000, function(){
	console.log("Server started on port 3000");
});