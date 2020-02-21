var express =require('express');
var path =require('path');
var mongoose =require('mongoose');
var app =express();
var seedDB=require('./seeds')
var bodyParser=require("body-parser"),
passport=require('passport'),
LocalStrategy=require('passport-local'),
passportLocalMongoose=require('passport-local-mongoose'),
User=require('./models/user');

    campground=require("./models/campground"),
    Comment=require("./models/comment");
mongoose.connect('mongodb://localhost/yelpcamp',{useNewUrlParser: true,useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
seedDB();

//passport authentication
app.use(require('express-session')({
    secret:"Rusty is best and cutest dog",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});

app.get("/",(req,res)=>{
    res.render("landing");
});
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


//comment route
app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,campground)=>{
        if(err)
        console.log(err);
        else
        {
            res.render("comments/new",{campground:campground});
        }
    });
   
});


app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,(err,comment)=>{
                if(err)
                console.log(err);
                else
                {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//auth routes

app.get('/register',(req,res)=>{
    res.render("register")
});

app.post("/register",(req,res)=>{
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
         if(err)
         {
             console.log(err);
             return res.render('register');
         }
         passport.authenticate("local")(req,res,()=>{
             console.log(user);
             res.redirect("/campgrounds");
         })
    })
});

app.get('/login',(req,res)=>{
    res.render("login");
});
app.post("/login",
passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),
(req,res)=>{
});
app.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect('/campgrounds');
});

 ///middleware to authenticate and  open secret page 
 function isLoggedIn(req,res,next)
 {
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }




app.listen(3000,()=>{
    console.log('server started');
});