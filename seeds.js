var mongoose=require('mongoose');
var campground=require('./models/campground'),
    Comment=require('./models/comment');
var data=[
    {
        name:"Camp2",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqgwm22E4kCuOFJ3trACy04LnRbpJnSHu4Mn5g2SiKxlrs8gnC",
        description:"Campground 2 "
    },
    {
        name:"Camp1",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMUPOhQFvdDLJr8-CG3hNPxtpcYZhrX62CN5XlhZekgvaZeKwg",
        description:"Campground 1"
    },
    {
        name:"Camp3",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqgwm22E4kCuOFJ3trACy04LnRbpJnSHu4Mn5g2SiKxlrs8gnC",
        description:"Campground 3"
    },
    {
        name:"Camp4",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMUPOhQFvdDLJr8-CG3hNPxtpcYZhrX62CN5XlhZekgvaZeKwg",
        description:"Campground 4"
    }
];
function seedDB(){
    campground.remove({},(err)=>{
        if(err)
        console.log(err);
        else 
        console.log('Removed all campground');
        data.forEach((seed)=>{
            campground.create(seed,(err,campground)=>{
                if(err)
                conssole.log(err);
                else
                console.log("added a campground")
                Comment.create(
                     {
                         text:"nice campground ",
                         author:"amit raj"
                     },function(err,comment){
                         if(err)
                         console.log(err);
                        else
                        {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("new comment added");
                        }
                     
                })
            });
        })
    });
   

}
module.exports=seedDB;
