/*
//now we have to restructining for reviews
const express=require("express");
const router=express.Router( {mergeParams :true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isloggedIn,isReviewAuthor}=require("../middleware.js")//including validateReview middleware from middleware.js(lecture 8 part e)



//Post review route
router.post(//change app.post into router.post
    "/",
    isloggedIn,
    validateReview,
    wrapAsync(async(req,res)=>{
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
    })
);
//delete review route
router.delete("/:reviewId",
    isloggedIn,
    isReviewAuthor,
    wrapAsync(async (req,res)=>{
        let { id ,reviewId }=req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews:reviewId}});//for deletion for listing array as their isrelationship b/w them 
        await Review.findByIdAndDelete(reviewId);//for deletion form review

        req.flash("success"," Review Deleted!");

        res.redirect(`/listings/${id}`);
    })
);
module.exports=router;
*/










//project phase 3 part a lecture 3:

const express=require("express");
const router=express.Router( {mergeParams :true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isloggedIn,isReviewAuthor}=require("../middleware.js")//including validateReview middleware from middleware.js(lecture 8 part e)

const reviewController=require("../controllers/reviews.js");


//Post review route
router.post(
    "/",
    isloggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);
//delete review route
router.delete("/:reviewId",
    isloggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);
module.exports=router;