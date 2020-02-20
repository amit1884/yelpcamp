var express =require('express');
var path =require('path');
var mongoose =require('mongoose');
var app =express();
var seedDB=require('./seeds')
var bodyParser=require("body-parser"),
    campground=require("./models/campground");
mongoose.connect('mongodb://localhost/yelpcamp',{useNewUrlParser: true,useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get("/",(req,res)=>{
    res.render("landing");
});
seedDB();
app.get("/campgrounds",(req,res)=>{
    
    campground.find({},(err,allcampgrounds)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render('campgrounds',{campgrounds:allcampgrounds})
            }
    });
 
});


app.post("/campgrounds",(req,res)=>{

 var name=req.body.name;
 var image=req.body.image;
 var desc=req.body.description;
 var newcampgrounds={name:name,image:image,description:desc};
//  campgrounds.push(newcampgrounds);
campground.create(newcampgrounds,(err,newlycreated)=>{
    if(err){
            console.log(err);
    }
    else{
        res.redirect('/campgrounds');
    }
});
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/campgrounds/:id",(req,res)=>{
   campground.findById(req.params.id).populate("comments").exec ((err,foundcampground)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(foundcampground);
        res.render("show",{campground:foundcampground});
    }
   });
    
});

app.listen(3000,()=>{
    console.log('server started');
});