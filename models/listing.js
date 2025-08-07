//lecture 2 part
const mongoose=require("mongoose");//requiring mongoose
const Schema=mongoose.Schema;//bar bar hume mongoose.Schema nahi call karna pade issliye Only SChema set kiya
 
const Review=require("./review.js");//requiring review for post deletion of review for a deleted lisitng

const listingSchema=new Schema({//schema define kiya
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        maxlength: 1000
    },
    // image:{
    //     type:String,
    //     default:'https://unsplash.com/photos/a-green-house-surrounded-by-trees-and-bushes-AWVIBoVkudU',
    //     set: (v) => v===""
    //                 ?"https://unsplash.com/photos/a-green-house-surrounded-by-trees-and-bushes-AWVIBoVkudU"
    //                 :v,    
    // },
    //the above code is not work acc to db has one more extra component i.e. filename
    image: {
        filename: {
            type: String
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-green-house-surrounded-by-trees-and-bushes-AWVIBoVkudU",
            //this is defult when img is undefine (matlad jab img aa hi nahi rahi  hoti)
            //deafult img when img is empty
            set: (v) => v === ""
                ? "https://unsplash.com/photos/a-green-house-surrounded-by-trees-and-bushes-AWVIBoVkudU"
                : v
                //condition?execute on true: on false
        }
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },

    // ⭐ GeoJSON format for Map lecture 6 phase 3 partb
    geometry: {
        type: {
            type: String,
            enum: ['Point'], // Only point
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],

    //project phase 2 part e lecture 6:adding a owner section in schema
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

    category:String,


});
//mongoose middleware for 
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in :listing.reviews}});
    }
});



const Listing=mongoose.model("Listing",listingSchema);//listing naam ka schema banaya jo listingSchema pe based hai 
module.exports=Listing;//aur isko export kiye hai