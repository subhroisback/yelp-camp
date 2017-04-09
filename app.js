var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

var campgroundSchema = new mongoose.Schema({
  name        : String,
  image       : String,
  description : String
});
var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name :"Mountain Hill",
// 	image:"http://localhost:3000/images/camp1.jpg",
//   description:"This is the Mountain Hill Camp. Beautiful. Big Famous Camp."
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Newly created Campground :");
// 		console.log(campground);
// 	}
// });




//
// var campground = [
// 	{name:"Salmon Creek",image:"http://localhost:3000/images/jellystone_web_size__large.jpg"},
// 	{name:"Mountain Hill",image:"http://localhost:3000/images/can-female-only-campgrounds-prevent-sexual-assault-at-music-festivals-1457473395.jpg"},
// 	{name:"Salmon Creek",image:"http://localhost:3000/images/jellystone_web_size__large.jpg"},
// 	{name:"Mountain Hill",image:"http://localhost:3000/images/can-female-only-campgrounds-prevent-sexual-assault-at-music-festivals-1457473395.jpg"},
// 	{name:"Salmon Creek",image:"http://localhost:3000/images/jellystone_web_size__large.jpg"},
// 	{name:"Mountain Hill",image:"http://localhost:3000/images/can-female-only-campgrounds-prevent-sexual-assault-at-music-festivals-1457473395.jpg"}
//
// ];

app.get('/',function(req, res){
	res.render('home');
});

app.get('/campground',function(req, res){
	Campground.find({},function(err,allCampgrounds){
	  if(err){
	    console.log("Oh no Error :");
	    console.log(err);
	  }else{
	    res.render("index",{campground:allCampgrounds});
	  }
	});
});

app.post('/campground',function(req, res){

	var name = req.body.name;
	var image = req.body.image;
  var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	//campground.push(newCampground);
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else {
			res.redirect('/campground');
		}
	});

});

app.get('/campground/new',function(req,res){
	res.render("new");
});

app.get('/campground/:id',function(req, res){
  Campground.findById(req.params.id,function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show",{campground:foundCampground});
    }
  });
});



app.listen(3000,function(){
	console.log("Listening to Port 3000. Yelp Camp App started!");
})
