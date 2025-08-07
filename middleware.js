//project phase 2 part e  lecture 1
//here we have created a middleware for to check the user is  logged in or not

const Listing=require("./models/listing");
const Review = require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema }=require("./schema.js");//including expresserror and schema's 

module.exports.isloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //lecture 5 part e(below line)=>throught this it will redirect to post login page
        req.session.redirectUrl=req.originalUrl;//hum yaha pe naya variable create kiya hai jo destination ka url store karta hai session me 
        
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

//lecture 5 part e:we store the url in middleware in local form and call it before authencation in /login in user.js
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

//lecture 8:used to check the user is owner of the lisitn or not
module.exports.isOwner=  async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//lecture 10:for adding authenticaton for review that can be deleted by its owner only
module.exports.isReviewAuthor=  async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};