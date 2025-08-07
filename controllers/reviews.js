const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview= async(req,res)=>{
        let listing=await Listing.findById(req.params.id);
        let newReview=new Review(req.body.review);
        //lecture 9 part e =>fisrt we add islogged middleware then add author(who has logged in) to new review
        newReview.author=req.user._id;//adding author to new review
        console.log(newReview);//printnig authoe
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success","New Review Created!");

        res.redirect(`/listings/${listing._id}`);
    };


module.exports.destroyReview=async (req,res)=>{
        let { id ,reviewId }=req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews:reviewId}});//for deletion for listing array as their isrelationship b/w them 
        await Review.findByIdAndDelete(reviewId);//for deletion form review

        req.flash("success"," Review Deleted!");

        res.redirect(`/listings/${id}`);
    };