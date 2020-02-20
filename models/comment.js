var mongoose=require('mongoose');
// var campground=require('./models/campground');
var CommentSchema = mongoose.Schema(
    {
        text:String,
        author:String
    }
);
module.exports=mongoose.model('Comment',CommentSchema);