var mongoose=require('mongoose');
var campground=require('./models/campground'),
    Comment=require('./models/comment');
var data=[
    {
        name:"Camp1",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqgwm22E4kCuOFJ3trACy04LnRbpJnSHu4Mn5g2SiKxlrs8gnC",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
    },
    {
        name:"Camp2",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMUPOhQFvdDLJr8-CG3hNPxtpcYZhrX62CN5XlhZekgvaZeKwg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Camp3",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqgwm22E4kCuOFJ3trACy04LnRbpJnSHu4Mn5g2SiKxlrs8gnC",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Camp4",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMUPOhQFvdDLJr8-CG3hNPxtpcYZhrX62CN5XlhZekgvaZeKwg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
