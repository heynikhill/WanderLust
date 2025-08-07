const Listing=require("../models/listing.js");

const geocode = require("../utils/geocode");// 👈 Import geocode




//lecture 1 phase 3 part1:here we cut it out all the code from index route in listing.js from route and 
//write it here all the code that will do the work after the router get the request and it exports the respnse
// module.exports.index=async(req,res)=>{
//     const allListing=await Listing.find({});
//     res.render("listings/index.ejs",{allListing});
// };
//lecture 5 phase 3 partc:we have created this for serch destionation part
module.exports.index = async (req, res) => {
    const { q } = req.query;
    let allListing;

    if (q) {
        const regex = new RegExp(q, 'i'); // case-insensitive
        allListing = await Listing.find({
            $or: [
                { title: regex },
                { location: regex },
                { category: regex }
            ]
        });
    } else {
        allListing = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListing });
};


//lecture 2:
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
        .populate({//hum review to saare review to chahhite hhi hai lekin iskke sath author bhi aa gaye ,so we have ti use nested populate 
            path:"reviews",
            populate:{
                path:"author",
            }
        })
        .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
         return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{ listing });
};

// module.exports.createListing=async(req,res,next)=>{
//         let response=await geocodingClient
//             .forwardGeocode({
//                 query:req.body.listing.location,
//                 limit:1
//             })
//             .send();
        
//         console.log(response.body.features[0].geometry);
//         res.send("done!");    



//         let url=req.file.path;
//         let filename=req.file.filename;

//         const newListing = new Listing(req.body.listing);
        
//         newListing.owner=req.user._id;
//         newListing.image={url,filename};
//         await newListing.save();
//         console.log("Body received:", req.body.listing);

//         req.flash("success","New Listing Created!");
//         res.redirect("/listings");
// };

//modified code as we are using maptiler for geocodingi.e.Now, every listing will automatically get its latitude & longitude based on the location input.
module.exports.createListing = async (req, res, next) => {
    const { geometry } = await geocode(req.body.listing.location); // 👈 Geocode the location

    const newListing = new Listing(req.body.listing);
    newListing.geometry = geometry;// 👈 Save geometry into DB
    newListing.owner = req.user._id;

    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        newListing.image = { url, filename };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm=async  (req,res)=>{
    let {id}=req.params;
    const  listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
         return res.redirect("/listings");
    }

    //lecture 2 phase 3 partb
    // modify the img quality and size so that user can get a preview on the img only not require the whole img as in high quality
    let originalImageUrl=listing.image.url;
    originalImageUrl =originalImageUrl.replace("upload","/upload/w_250");  

    res.render("listings/edit.ejs",{ listing,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
    let { id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});


    if(typeof req.file !== "undefined"){//work only when we have upload a file
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 

    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};