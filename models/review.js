const mongoose=require("mongoose");//requiring mongoose
const Schema=mongoose.Schema;//bar bar hume mongoose.Schema nahi call karna pade issliye Only SChema set kiya

const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        nim:1,
        max:5,
    },
    createdAt :{
        type:Date,
        default:Date.now(),
    },
    // lecture 9 part E for addinf the author for authencation
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports=mongoose.model("Review",reviewSchema);