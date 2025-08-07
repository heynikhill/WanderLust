/*
//all the listing related thing are written here and we use only a sinlge line in app.js for this=>restructining
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");//we have chnage the path so that it can rquire form global folder
const Listing=require("../models/listing.js");
const {isloggedIn, isOwner,validateListing}=require("../middleware.js");//phase 2 part e lecture 1



//Index Route

router.get("/"),wrapAsync(async(req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//NEW ROUTE
router.get("/new",isloggedIn,
    (req,res)=>{
    //project phase 2 part e lecture 1
    // console.log(req.user);//before login in=>undefine and after the login in =>user detaisl in terminal
    // if(!req.isAuthenticated()){
    //     req.flash("error","you must be logged in to create listing!");
    //     return res.redirect("/login");
    // }
     res.render("listings/new");
    //now we can write this in every route but we can also created a middleware for this and require it in this listing .js to use middleware.js
    //so from this we just require the isloggedIn if routes instead of writing the whole code
})
// SHOW ROUTE
router.get("/:id", isloggedIn,wrapAsync (async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
        .populate({//hum review to saare review to chahhite hhi hai lekin iskke sath author bhi aa gaye ,so we have ti use nested populate 
            path:"reviews",
            populate:{
                path:"author",
            }
        
        })
        .populate("owner");
        
    
    //phase 2 part c lecture 11.
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
         return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
    
}));
//CREATE ROUTE
router.post(
    "/",
    isloggedIn,
    validateListing,
     wrapAsync(async(req,res)=>{
        const newListing = new Listing(req.body.listing);

        newListing.owner=req.user_id;//throught this when new lisitng is created then its owner is creator itself

        await newListing.save();
        req.flash("success","New Listing Created!");//flash message created (key,message)(phase 2 c -L9)
        res.redirect("/listings");
    })
);
//EDIT ROUTE
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync( async  (req,res)=>{
    let {id}=req.params;
    const  listing=await Listing.findById(id);
    if(!listing){//lecture11 phase 2 part c
        req.flash("error","Listing you requested for does not exist");
         return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{ listing});
}));
//Update Route
router.put("/:id",
    isloggedIn,//phele login check  hoga fir
    isOwner,//owner check hoga
    validateListing,
     wrapAsync(async(req,res)=>{
    let { id}=req.params;

    //authentication :lecture 8 part e pahse 2
    // let listing=await Listing.findById(id);
    // if(!listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","you don't have permission to edit");
    //     return res.redirect(`/listings/${id}`);
    // }//we use middleware that we ahve creted fot this

    await Listing.findByIdAndUpdate(id,{...req.body.listing});

    req.flash("success","Listing Updated!");

    res.redirect(`/listings/${id}`);
}));
//Delete Route
router.delete("/:id",isloggedIn,isOwner, wrapAsync (async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 

    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}));

module.exports=router;
*/







//started form phase 3 part a:
/*
//lecture 1 and 2
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isloggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");//L1 phase 3 part a

//Index Route
router.get("/", wrapAsync(listingController.index));//L1 phase 3 part a :all the inner code is past into lisitng.jsof controller


//NEW ROUTE
router.get("/new",isloggedIn,listingController.renderNewForm);

// SHOW ROUTE
router.get("/:id",
     isloggedIn,wrapAsync (listingController.showListing)
);

//CREATE ROUTE
router.post(
    "/",
    isloggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
);
//EDIT ROUTE
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync( listingController.renderEditForm));

//Update Route
router.put("/:id",
    isloggedIn,//phele login check  hoga fir
    isOwner,//owner check hoga
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id",isloggedIn,isOwner, wrapAsync (listingController.destroyListing));

module.exports=router;
*/

//lecture 3 :restrucing the review and user

//lecture 4:make listing.js more compact through Router.route i.e.
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isloggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");//L1 phase 3 part a

//lecture 7 phase 3 part a
const multer=require("multer");//require multer=>used to parse multipart data for form

const {storage}=require("../cloudConfig.js");//lecture 9//now multer will store the files storage instedaof update

const upload=multer({storage});//L7:initilizing multer=>then multer take outthe file data from form and it saved in uploads folder



router
    .route("/")
    .get(wrapAsync(listingController.index))//Index Route and handles search also
    // .post(//CREATE ROUTE
    //     isloggedIn,
    //     validateListing,
    //     wrapAsync(listingController.createListing)
    // );
    //this is wrong acc gpt
    // .post(upload.single("listing[image]"),(req,res)=>{//lecture 7 phase 3 part a
    //     res.send(req.file);
    // });
    .post(
    isloggedIn,
    upload.single("listing[image]"),
    validateListing, // Optional: if you're validating with Joi
    wrapAsync(listingController.createListing)
);



//NEW ROUTE
router.get("/new",isloggedIn,listingController.renderNewForm);

// add this before /:id route:
router.get("/category/:category", async (req, res) => {
    const category = decodeURIComponent(req.params.category); // Handles spaces like 'Snow Adventures'
    const listings = await Listing.find({ category });
    res.render("listings/index", { allListing: listings });
});


router
    .route("/:id")
    .get(wrapAsync (listingController.showListing))// SHOW ROUTE
    .put(//Update Route
        isloggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isloggedIn,isOwner, wrapAsync (listingController.destroyListing))//Delete Route



//EDIT ROUTE
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync( listingController.renderEditForm));


module.exports=router;
