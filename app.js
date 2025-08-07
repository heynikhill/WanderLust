/*//lecture 1:(basic setup)
//here we have do npm init -y and  then install express,ejs,mongoose and touch app.js then
const express=require("express");//requiring express
const app=express();
const mongoose=require("mongoose");//requiring mongoose
//creating connection to mondodb
const MONGO_URL="mongodb://127.0.0.1:27017/wnderlust"//wonderlust=database
main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}    

app.get("/",(req,res)=>{//craeting a route
    res.send("hi, i am root");
})
app.listen(8080,()=>{//server connection
    console.log("server is listening to port 8080");
});
*/
/*
//lecture 2:(creating a listing MODEL;contain=>title,description,img,price,location,country)
//so we have created a model (folder) in this we have create a listing file (for listing model)
//in this we have created a  model which has schema and then we require it and we created a document and save it
//at the end we check it on monogo shell(db.listings.find())
const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./models/listing.js");//import listing model

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"//wonderlust=database
main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}    
app.get("/",(req,res)=>{
    res.send("hi, i am root");
});

app.get("/testListing", async (req,res)=>{//creating the getlsiting route that save our document here we created only one documnet
    let sampleListing=new Listing({
        title:"My New Villa",
        description:"By the Beach",
        price:1200,
        location:"Calangute,Goa",
        country:"India",
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("successful");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
*/

//lecture3:we just have to downoad the data for database.

//lecture 4:initilization the database we have download
//creted a init folder and in this we created a data.js to store our sample(download) data

/*
//lecture5:
//index Route: GET       /listings          =>it retunr all listing
const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./models/listing.js");
const path=require("path");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("hi, i am root");
});

//index route
//so upto here we have fisrt save data is db by getlsiting anf second we aslo initilze the data through index and data.js
//now we are do the CRUD iperation in the saved data
app.get("/listings",async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
*/

/*
//lecture 6:show Route
//here we created a show route  and a show wjs
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));//so that our incoming data to request can parse

app.get("/",(req,res)=>{
    res.send("hi, i am root");
});
app.get("/listings",async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})

//show route:
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);//ye listing show.ejs me use hoga
    res.render("listings/show.ejs",{ listing });
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
*/
/*
//lecture7
//here we have created a New & Create route
//fisrt we have created GET /listings/new route and when we submit it it will go to POST /lisiting
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));//so that our incoming data to request can parse

app.get("/",(req,res)=>{
    res.send("hi, i am root");
});
app.get("/listings",async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})

//new route:should above the show route if not new will search as id
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")//it render new.ejs that we have created
})


app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
})

//create route:after filling the deatils and clicking the add button 
app.post("/listings",async(req,res)=>{
    //method 1:
    // let{title,description,image,price,country,location}=req.body;
    //method 2:saare variable ko object ki key bana de
    // let listing= req.body.listing;
    // new Listing(listing);//or just
    const newListing = new Listing(req.body.listing);
    // console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
*/

/*
//lecture 8: 
//here we have created an edit(GET   /listing/:id/edit   it open a form for edit and when we submi it ) and update(after submit it will give next request ot PUT    /listing/:id ) route
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

const methodOverride=require("method-override");//method overide

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));//method override

app.get("/",(req,res)=>{
    res.send("hi, i am root");
});
app.get("/listings",async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
})
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})


//Edit Route
app.get("/listings/:id/edit", async  (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing});
});


//updte route
app.put("/listings/:id",async(req,res)=>{
    let { id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);//go to the update page of details page
})

//lecture 9:
//delete request
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
    res.redirect("/listings");
})


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
*/































/*
//PROJECT PHASE 1(PART B)
//lecture1:EJS MATE=>helps us to create template like navbar
//in this we have install ejs requre iyt and set it and then create layout folder and boilerplate file
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");

const ejsMate=require('ejs-mate');//requiring ejs mate

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("hi, i am root");
})
app.get("/listings",async (req,res) =>{
    const allListing=await Listing.find({});
    // console.log(allListing);
    res.render("listings/index",{allListing});
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
})
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
app.get("/listings/:id/edit", async  (req,res)=>{
    let {id}=req.params;
    const  listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing});
});
app.put("/listings/:id",async(req,res)=>{
    let { id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);//go to the update page of details page
})
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//so in l1:we have creted a bolierplate through this properties that we want in all page 
//we use in this plate and apply this 


//in lecture2:we have to crete a navbar ,we use bootstrap so we link(both css and js) it first in boilerplate
//then we have copy a navbar code from bootstrap in navbar file
//customise it accordingly then style it

//lecture 3: we have created a footer file,and write the code and also includes it in boilerplate
//write code for footer and we style it 

//lecture 4: in this lecture we display the image with title and setting styliing to it
//we have use index.ejs and style.css

//lecture 5:we  have update the new.ejs page with the  help of bootstrap

//lecture 6:we  have update the edit.ejs page with the  help of bootstrap
*/



















/*
//PROJECT PHASE 1 :(PART C)

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');

const wrapAsync=require("./utils/wrapAsync.js");//handlind async error through wrapAsync function(lecture 4)
const ExpressError=require("./utils/ExpressError.js");//defingin specific error for specfic validation(lecture 5)
const {listingSchema}=require("./schema.js");//accquiring server side schema (lecture 7)

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

const validateListing =(req,res,next)=>{
    let {err}=listingSchema.validate(req.body);//yeha pe humne result se err nikala hai
    if(error){//if error exit then we throw a error
        let errMsg=ErrorEvent.details.map((el)=>el.message).join(",");//showing additonal details seperated by comma
        throw new ExpressError(400,errMsg);//ye joi ka error hoga
    }else{
        next();
    }
}

//Index Route
app.get("/listings", wrapAsync (
    async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})
);
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})
// SHOW ROUTE
app.get("/listings/:id", wrapAsync (async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
}));

//CREATE ROUTE
// app.post("/listings",async(req,res)=>{
//     try{
//         const newListing = new Listing(req.body.listing);
//         await newListing.save();
//         res.redirect("/listings");
//     }catch(err){
//         next(err);//if the validation is not correct then it will move to next err i.e., our custom error handler
//     }
    
// })
//act like same as the above one
app.post(
    "/listings",
    validateListing,//for to use server side validation schema
     wrapAsync(async(req,res)=>{

        // if(!req.body.listing){//ye client side se error hoga ;when we using hoopscoth and give POST request when we not ahve any listing (nothing in body part) 
        //     throw new ExpressError(400,"send vaild data for listing");
        // }
        // const newListing = new Listing(req.body.listing);
        //comment out for method 1

        //method 1:write code of each (lecture 7)
        // if(!newListing.tite){
        //     throw new ExpressError(400,"Title is missing");
        // }
        // if(!newListing.description){
        //     throw new ExpressError(400,"escription is missing");
        // }
        // if(!newListing.location){
        //     throw new ExpressError(400,"Location is missing");
        // }

        //method 2:
        // let result=listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){//if error exit then we throw a error
        //     throw new ExpressError(400,result.error);//ye joi ka error hoga
        // };

        //commet it because now we conver this validation schema into a middleware (lecture 8)
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);

//EDIT ROUTE
app.get("/listings/:id/edit",wrapAsync( async  (req,res)=>{
    let {id}=req.params;
    const  listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing});
}));
//Update Route
app.put("/listings/:id",validateListing, wrapAsync(async(req,res)=>{
    // if(!req.body.listing){
    //    throw new ExpressError(400,"send vaild data for listing");
    // }//now we dont require itself validation we use validateLsting
    let { id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
//Delete Route
app.delete("/listings/:id", wrapAsync (async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
    res.redirect("/listings");
}));


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});




//our custom error handler middleware
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;//lecture5
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);//lecture 5
    // res.send("something went wrong");//lecture 4
});
//if we comment out the above middleware then database will send an error which is default one handle by express(stacksof code)
//but through this it will print only =>"something went wrong"

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//lecture 1:Form Validations=>when we enter the data in the form,the browser and/or the web server
//will check to see the data is in the CORRECT FORMAT and WITHIN THE CONSTRAINTS set by the application. 
//we have to check the valaditon from bioth side client(check format) and server(acc to db rules and also handles error in any)
//so for validation we have to add REQUIRED keyword in new.ejs after the form-control=>this show message "please fill the details" (in not entered the details n required)
//but this required is default validation give differnt message on different browser 
//so we want to standardise it we use bootstrap validation
//we have to add novalidate keyand and a class =>class="row g-3 needs-validation" in the new.ejs form tag
//and also we have created js file in public and pacle the code bootsrap validation in it and also link this js file in boilerplate.ejs


//lecture 2:success and failure text 
//to show some message below the box in form (for both vaild and invalid deatils) i.e.
//we have to these div's in(inside) the respective div (like tilte,price,lication...) in the new.ejs file
//vaild: <div class="valid-feedback">Looks good!</div> 
//invalid:<div class="invalid-feedback">Please enter  a valid price.</div>
//we aslo add validation in edit.ejs=>add reuired(ech box) and [novalidate  class="row g-3 needs-validation"] to form and at last script.js for link
//and then we add text to each box

//upto this we are now leave box or can't enter incorrect data but from with the help of postman or hoopscoth where we directly access the api it 
//can possible to enter the  incorrect data so WE ALSO HAVE TO ADD VALIDATION ON  SERVER SIDE


//lecture 3:Defining our own custom error handling
//as error come from the  database is async so here we have define our custom error handeler and modified  the create route with try -catch block.
//if the enter details is not acc to the vaildation then it will throw error("something went wrong");


//lecture 4:Custom  WrapAsync(other ways to handle async error : WrapAsync function)
//we have created a WrapAsync.js file in utils folder and here we have define the wrapAsync function and accquire it in app.js


//lecture 5: now we want to send different-different error for diff-diff response
//so we created an ExpressError.js in utils where define our modified or specific error and
//we also define a universal error handler if the route is not match then it handle the error
//after this we  have define wrapAsyn to all route
//we also write hander occurred by client side  when try to send request withour listing

//lecture 6:Error.ejs
//in this lecture instead of showing a message (lecture 5) now we are showing some alerts i.e.,
//  we have created error.ejs file and we render it in app.js
//we can also customise our alert as we have write some in err.ejs and can also refer to bootstrap



//lecture 7:
//now we see the the validation for schema 
//it is possible to add some details and some not byin body using hoopsscothw/o any failure
//so if we have to check validation for individual box then there are two ways for it:
//method 1:if(!newListing.tite){throw new ExpressError(400,"Title is missing");}
//but above method is very tadious(bulky),so we use method 2
//method 2: in this we use joi for individual validation(npm i joi)
//through with joi we define schema for server side not for mongoose
//byt his joi  will give validation error that tell the some listing are require but the partial details are show in db .
//it only tell that required listing is missing


//lecture 8:
//now we are defining the schema of validation into middleware
//we cinver it into function

*/





















/*
//project phase 2-part a
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema}=require("./schema.js");//lecture 6:server side validation for review

const Review=require("./models/review.js");//require review(lecture 5 )

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

const validateListing =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//lecture 6 :server-side validation
const validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//Index Route
app.get("/listings", wrapAsync (
    async (req,res) =>{
    const allListing=await Listing.find({});
    res.render("listings/index",{allListing});
})
);
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})
// SHOW ROUTE
app.get("/listings/:id", wrapAsync (async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{ listing });
}));
//CREATE ROUTE
app.post(
    "/listings",
    validateListing,
     wrapAsync(async(req,res)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);
//EDIT ROUTE
app.get("/listings/:id/edit",wrapAsync( async  (req,res)=>{
    let {id}=req.params;
    const  listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing});
}));
//Update Route
app.put("/listings/:id",validateListing, wrapAsync(async(req,res)=>{
    let { id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
//Delete Route
app.delete("/listings/:id", wrapAsync (async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
    res.redirect("/listings");
}));

//Reviews
//Post review route(lecture 5  )
//and passing the validateReview as a middleware to check server-side validation
app.post("/listings/:id/reviews",
    validateReview,
    wrapAsync( async(req,res)=>{
        let listing=await Listing.findById(req.params.id);//getting listing in ehich review is written
        let newReview=new Review(req.body.review);//getting the review that has been written

        listing.reviews.push(newReview);//pushing that review into listing schema

        await newReview.save();//saving them
        await listing.save();

        res.redirect(`/listings/${listing._id}`);//redirect to the listing page in which review is written
    })
);
//delete review route
app.delete("/listings/:id/reviews/:reviewId",
    wrapAsync(async (req,res)=>{
        let { id ,reviewId }=req.params;

        await Listing.findByIdAndUpdate(id, { $pull: { reviews:reviewId}});//for deletion for listing array as their isrelationship b/w them 
        await Review.findByIdAndDelete(reviewId);//for deletion form review

        res.redirect(`/listings/${id}`);
    })
);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;//lecture5
    // console.log("ERROR DETAILS:", err);
    res.render("error.ejs",{message});
    
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//lecture 1 ans 2 :
//explain in relationship =>lecture details

//lecture 3:
//in this lecture we will making a review models(comment(string),rating(1 to 5)(number),createAt(date & time))
//so for this we have created a review.js file in models folder where we define review schema
//we have created a one to many realtion(listing-review)
//we have added a review(array) section in listing Schema

//lecture 4:create Review(two step process)
//1.Setting up the reviews Form
//so to create a form for review we have to add it on show.ejs page
//just after the show profile ,in downwards of wch profile but there we only created a not not definfin thr submit.


//lecture 5:
//2.Submitting the form 
//means adding the review  so,POST/listings/:id/reviews =>each review should specify for a specific listing
//so we added the action and method in form of review in show.ejs
//and then created a route for review that store the review in database(wanderlust) in reviews(collections) and redirectit the listing page where review is written
//but it is also possible to submit an emotyy review in the db so,we have to add validation for both server nad client side
//and we also want to show these review on the page

//lecture 6:
//adding the validatin for reviews for both side
//we added required keyword in textarea in show.ejs =>give default validation and 
// later we use bootstap validation by adding =>novalidate class="needs-validation" in form 
//also we have aadded some valistaion text in textarea
//note: there is no need for to write=> <script src="/js/script.js"></script>  as it added to the boilerplate
//upto here we have handle client-side validation so user can't enter invalid data

//but from hoopscoth we can enter(post) invlaid(empty) data in database(wanderlust)
//so for sever-side validation i.e. first we ave created a reviewSchema in Schema.js and require it in app.js alongwith listing.js and then
//creating a validateReview method and add validateReview keyword in the review route to check server-side validation
//and we add wrapAsync to handle basic error handling

//SERVER -SIDE VALIDATION NOT WORKING BUT CLIENT SIDE WORK(CHECK IT)FROM validateListing



//lecture 7:
//now se render all the review on the show.ejs 
//through lisiting.review it will print all the id on the page that we have added
//now to see the deatils of reviews change this Listing.findById(id) into Listing.findById(id).populate("reviews") in show route
//now to see only the comment and route create a for loop in show.ejs and write in it reviews.commment and review.rating


//lecture 8:
//now to add styling in it review section on show.ejs page
//we are showing the reviews in card format with the help of bootstrap
//as show in show.ejs but reviews dont have borde so in css folder style.css change .card into .listing-card and inside index.ejs  add this class in class="card col" in show .ejs aslo add it.
//now after boundary come now we want in one row 2 reviews come so we add classes accordingly   


//lecture 9:
//now we want to delete the review  so to Deleting Review =>MOngo $pull operator
//$pull=this operator is used to removes from an existing array all instances of a value or values that match a specific condition.
//so delete the route will be: /listings/:id/reviews/:reviewId 
//so fisrt add a delete button in each review =>go to show.ejs and add it

//to check all the rewiws and its detial:use this in moongoshell
//==> db.listings.findOne({title:"Secluded Beach House in Costa Rica"})

//lecture 10:
//we have seen that when we delete a review then it also delted form the listing but in opposite when we delelte listing then its review are available in the reviews 
//so we have creates a post middleware in listing.js =>to delete all the listing reviews
*/


















/*
//project phase 2 part b:
//restructing of our program
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");


const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.use("/listings",listings); //uske jaghe pe
app.use("/listings/:id/reviews",reviews);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});



//PROJECT PHASE 2 PART B
//lecture 1:restructing of our project
// through EXPRESS ROUTER => app.use("/listings",listings);
//so to do restructining first create a routes folder and cut all the listings routes from app.ja to listing.js in routes folder
//also we change each app.__ into  router.__ and /listing/:id into /:id (remove the common once) and change the path and export it 
//and in app.js we require  listing.js and write app.use("/lisintg",listing)
//so through restructining we reuire only a single line for all listing related code in app.js 


//lecture 2:now we do restructining for reviews
//so we cut the all(two) routes of reviews and change app.__ into router.__ and remove the common parts form the routes(i.e listings/:id/reviews ) also export it 
//and require review.js and write it in app.js app.use("/listings/:id/reviews",reviews);
//al functionality will work but when we add a review it give error beacuse in  =>app.use("/listings/:id/reviews",reviews) only the last partis send i.e. reviews ,id will not send 
// so to send id  => we have to change  => const router=express.Router(); into  const router=express.Router({mergeParams :true});     in reviews.js

//so we restructure our project into  two diff-diff file .


//lecture 3: go to classroom folder where we have study till lectuer 8(last).
*/
























/*
//PROJECT PHASE 2:PART C(from 1 to 6 in server.js in classroom)
//lecture 7 :we implements flash message
//fisrt we install express-session and require it and then define sessionOptions
//to check this is working or not =>open it go to inspect on cookies part then if there is a session_id then it work.

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");

const session=require("express-session");//reuire session
const flash=require("connect-flash");//reuire flash (lecture 9)

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

const sessionOptions={//defining session options
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    //lecture 8:cookies in Session =>setting the expries of the cookies of the session
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,//millisecond
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true//for security purpose(like cross scripting attack )
    }
};

app.use(session(sessionOptions));//using session
app.use(flash());//use flash(lecture 9)//it should must be above the routes

main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{//created a middleware to access the message from flash(lecture 9) 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");//lecture 11
    next();
})


app.use("/listings",listings); //uske jaghe pe
app.use("/listings/:id/reviews",reviews);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


 //lecture 9:
 //now upto here sehave used the session in lecture 7 and 8 NOW WE ARE USING FLASH
 //so for this first install flash and require it in app.js and then use it
 //then in listing.js in "/" route we added a flash message so the it show a message before redirect
 //and then we have created amiddleare for flash to access message and then <%=success%> is written in index.js at top
 //then a message is displayed after we created a new listing


 //lecture 10:now we give styling to the message of flash through bootstrap
 //so for this we have to removes the <%-success%> from index.js and place it in boilerplate for styling
 //then we creted a flash.ejs in includes and then we include it in container class of boilerplate
//after this we have now use the flash for every route


//lecture 11:now when we delete a lisiting and we we reenter the url link that u deleted then it give an error 
//so we want when a lsiting is deleted and hen re sheck for the specific lisitng by searching it again on browser then it should show a flash message of error then redirect to listings page not to go to show.ejs page
//so for this go to show route in listing.js write the conditonal code  and include it in app.js for error in app.use
//and also we have added code  for error  in flash.ejs as we rrite for success
*/


























/*
//PROJECT PHASE 2 PART D
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const userRouter=require("./routes/user.js");//lecture 9 reuire user.js for signup

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

//lecture 7
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

  
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));
app.use(flash());


//lecture 7:(all 5 lines)//ye sessionOption ke baad hona chaiye because passport used session for baar-baar login nahi karna padhe
app.use(passport.initialize());// Initializes Passport for authentication.
app.use(passport.session());//Enables persistent login sessions using Express sessions.
passport.use(new LocalStrategy(User.authenticate()));//Tells Passport to use the username/password strategy defined by your User model.
passport.serializeUser(User.serializeUser());//Defines how user data is stored in the session (usually user ID).
passport.deserializeUser(User.deserializeUser());// Defines how to retrieve full user details from session data.


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

//lecture 8:
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     }); 

//     //Registers the user using Passport's User.register() which handles password hashing.
//     //Registers the user with the password "helloworld", hashing it securely using Passport's register() method.
//     let registerUser=await User.register(fakeUser,"helloworld");//in this function fisrt para contain userdetails second=password and also we can have third which will be a callback.
//     res.send(registerUser);// Sends the newly registered user as the response (in JSON format).
// });
//comment it in lecture 10.as it is not require but its code used in user.js of routes


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);//lecture 9

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


//lectrure 1:
//#AUTHENTICATION:is the process of verifying who someone is =>login/signup
// matlab kon hai (malik)=>identify karta hai ki ye valid user hai ya invalid  users
//#AUTHORIZATION:is the process of verifying what specific applications.files.and data a user has access to
//isse ye pata chalta hai ki ye valid user kon-kon se hisse ko use kar payega

//lecture 2:
//Storing Passwords:we never store the passwords as it is.We store their hashed form.
//i.e. password("hellopwd")->hashing function -> how it is stored("fsf33sdfr23df" =>str1)(store in strring form)
//so when a user login then his entered password in concerted into STRING and then it will compare with the
//Str1(store in database which has been set during signup)and when these both string match then users can access
//page otherwise he will be denenied

//lecture 3:
//Hashing(what we need to known?)
//#for every input,there  is a fixed output=>for each string have same length when they are in hased form( in string)
//#they are one-way functions,we can't get input from output=>as like we can't determine LHS of mod,modulus operation form output
//#for a different input,there is a different output but of same length(i.e. hello ,hellopws=>same lenght but diff string)
//#samll chnage in input should bring large changes in output

//there are various types of hashing functoin=>SHA256(not prefer=>very fast thatwhy not good ,good for attacker),
//                                             MD5,CRC,BCRYPT


//lecture 4:
//Salting:(another way to secure our password)
//Password salting is a technique to protect passwords stored in databases by ading a string of 32 or more characters and thenhashing them.
//there are some inbuilt tools that automatically do salting and hshing for ourself we don't require to write authentiation form scresh(form inital point)
//like passport tool is one of them.


//lecture 5:
//Passport:is a libary which helps in authentication especially it is Express compatible authentication middleware for Nodejs
//so for authentaction there are various authentaction ways like through google,facebook,github,etc  along with simple user and password
//so we use passport-local here for authentication purpose
//to do so we have to fisrt install npm i passport and then we have to install npm i passport-local whic is
// a Passport strategy for authenicating with a username and password and also we have to install npm i passport-local-mongoose which
//is a MOngoose Plugin that simplifie sbuilding username and password login with Passport.
//so here we use only local strategies but we can use multiple strategies like google,github,facebook but here we use only local strategies.


//lecture 6:
//to implementation strategies before we have to implement USER  MODEL
//user:username ,password,email
//you r free to define your User how you like.Passport-Local Mongoose will ass a username,hash ans salt field to store the 
//username.the hashed password ansd the salt value. i.e. it automatically add(or saved) userschema a salt value a hased passwordand (as written above)
//Additionaly ,passport-Local Mongoose adds some methods to your Schema(such as set password ,authenticate password etc ).See the API.

//so we crete a user.js in models


//lecture 7:
//in this we just  require the passport and passport-local and our user model that we created
//and write some lines that helps in All together: these lines enable login/logout and session-based authentication in your app.


//lecture 8:Demo User
//This route (/demouser) creates a test user with a fixed email and username. 
// It registers the user with the password "helloworld" using Passport,
//  which saves the user in the database with a hashed password. Then, it sends back the user details as a response
//to run:localhost:8080/demouser


//lectuer 9:now we are going to create the functionality for singup so,basily we gonna to create two routes=>
// 1.GET /signup(signup form) =>created a signup form and seeting the action ans post in it for second route 
// 2.POST /signup(register the user in db after submition)
//so we created a user.js in routes folder and write out code and require it in app.js and 
//  then acreated a users folder in views then created a signup file in it

//lecture 10: setting up for second route:storing user data in user.js
//so we fisrt write the code in user.js and acquiring the user.js of models for user data to store in it 
//and also we can comment on demoUser in app.js(used here app.js and user.js)

//lecture 11:Login user
//i.e. it will authenticate that is user exist in database or not
//to do so we write the code in user.js and we have created a login.ejs for login form in users and
//create a get route for login and to check that whether a user exist in db or not =>is done by passport middleware
//so we have to include in our router.post as shown in user.js 
*/




















/*
//PROJECT PHASE 2 PART D
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const userRouter=require("./routes/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

  
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");

    res.locals.currUser=req.user;//pahse 2 part e L3

    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//lecture 1:Connecting Login Route
//How to check if User is Logged in? =>done by a passport method i.e. req.isAuthenticate()  method.
//i.e. if user is on /listing and he want to create new lisitng before creation we should have to check whether he is logged in or not
//so to do so ,go to listing(of route) on NEW ROUTE and write the code before redirect.
//so instead of writing this code we have created a middleware for this and use it(middleware.js file) and also we have to acquire it(middleware.js) in listing.js


//lecture 2:
//now we r going to create a  logout route(only as a method) so to do so go to user.js(in routes) and 
//write the code for logout there and to logout we have to enter as localhost:8080/logout when u r already login 


//lecture 3:
//now we are got to add all 3(login,logout,signup) option in navbar so fisrt go to navbar.js and write the code
//after adding all 3 in navbar these will appers all the times BUT we want when a user is login only logout show and when not then login and signup should show
//so as we known that if user is not logged in then res.user=undefine so by using this we can create our condition
//but in ejs res.user cannot accessed so for this we have created a local in app.js 

//lecure 4:
//now we want automatically login when we signup so to do so we have to add => req.login(registeredUser,())    in /signup in user.js of routes

//lecture 5:
//post-login Page=>means when u click add new listing then u go to login page and after u logged in u will redirest to /listing
//BUT we want the after logged in it should redirect to /listing/new(to where user has click and login page arrive)
//as we known that req.path(conntain destination=>/new) and  req.originalUrl(contain destination url=>/listing/new)
//so by using this we can go to  our  post login page by storing it in "req.session.redirectUrl" in middleware.js and in /login in user.js we use this for redirect.
//but error come as when we login and when passport  authenticate then it reset the details of the session ,so fir this we have to store (req.session.redirectUrl) in 
//local so that the destination page address will be saved 
//we store the url in middleware in local form(in middleware.js) and call it before authencation in /login in user.js
//but also there is point when u directly try to login on /listings.js then after logged in it show "page not found" error it will not redirect ot /listing beacuse is loggedIn is not trigger
//thatwhy redirectUrl is empty so we have to add this line "let redirectUrl=res.locals.redirectUrl || "/listings";" 


//lecture 6:
//Listing Owner:so we have to add some owner so that only thry can change something that is important on website
//so to so first we have to add a owner section in our schema(listing.js) but in our initialize database their owner section is empty
//so there are two method for it ,first add a owner (copy a object id from db.users.find() ) and paste it in owner section in data.js for each listing(we have to repeat this for all) or
//second way to add a owner is to add this("initData=initData.data.map((obj)=>({...obj,owner:"6853bfcfc5ef0c3c84d0eb9b"}));") line in index.js (of init folder), so that it will add a owner to data before it insert in listing 
//so first run node index.js in init folder throughwhich our db is reset and then comes out and then run app.js our website work as like previous
//and to show owner in terminal we have to add populte("owner") in show route of listing.js in routes and to show in show.ejs page go to it add add listing.owner.username
//and also we have set the owner of new lsiting itself who has created in create route of listing.js of route



//lecture 7:
//after setting the owner for listing Starting with Authorization
//so first we wnt to hide the delte and edit button for those who where not the owner of the listining
//to do this we have to compare the listing.owner._id(the owner of the listing) and currUsers._id(user who has opened the listing stored in locals)
//to implements this go the shoe.ejs  in button class write the conditional for this


//lecture 8:now for setting authentication we have remove the edit and delete button form page who they don'r owned
///but we want to give a message to them on editing a page which is not owned by them so for this we have to commnet out condition in button class 
//and write the code for authentaction in update route of lisitning folder 
//so now to use authentactoin for all istead of write the code in all routes ,we createda middleware(isOwner) for it and use it in the routes
//also we have change validateListing and validateReview into middleware for this cut and paste in middleware/js(add module.exports in it ) and 
//include expresserror and listingSchema and reviewSchema in middleware.js and remove these form their previous file
// acquire the validateListing in listing.js and validateReview in review.js


//lecture 9:
//now we are going to set authorization for review
//so for review first we have to add author in schema in of review i.e. review.js in model
//then we want that the before creating a review user must be logged in for that we have to add condition code in show.ejs of listing of views
//here we also comment out the condition code for edit and delete btn that we have comment out eariler.
//so now we have porotected the the fronted part and for backend we have added  isloggedIn middlewae in post Review route in review.js of routes 
//and also add this user who has logged in as author and we also printeditin terminal

//lecture 10:
//now we gonna to create the display the user name on review that has been created
//for this:go to listing.js in routes we add a nested populate in show route and also add a username in card-title 
//and also we want the review can be delted by those who has created it
//for this we have creatrd a middleware in middleware.js and use this middleware in
*/




















/*
//PROJECT PHASE 3 PART A

//lecture 8 part a phase 3
if(process.env.NODE_ENV!="production"){//contion is that if we are not inproductionphase then only the variable value can print
    require('dotenv').config();//requiring the dotenv that log the env. variable into process.env 
}
// console.log(process.env.SECRET);//printing the varbles that the store in process.env
//after this we have showed that howdot.enve file worl i.e, it just helps to hide our credential forom other ,so now we store env variable of credential
 


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const userRouter=require("./routes/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

  
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


//lecture 1:now upto here wee have built our core functionality that can be used in own other project (i.e. frontend and backened) 
//so in this phase 3 we add some extra functionality(mainly it is can diff from project ot project )
//MVC:Model,view,Controller=>it is basically a framework that tells how to write code for a full stack project.
//Implements Design Pattern(a kind of framework) for Listings 
//i.e. in Model(used for our database),View(used for frontened that we render) and Controller(backened that we control)
//mvc framework for listings
//so we have created a controllers folder and in it we create a listing.js
//so in this we have cut all the code from the index route(listing.js of routes) and paste it in listing.js of controller
//means in routes index route only track the request comes or not and all the work willnow done by index of listing of controller
//from this code look simple and understanable and it is according to the standard

//lecture 2: 
//in this we have do this reformatting in whole code of listing.js of routes to the listing.js of controller 
//by which all the work will done in the controller


//lecture 3:
//now we implements MVC for Reviews and Users
//for this first cretate review.js in controller can cut all the code and paste it in review.js of controller
//also reuire the things that are used in review.js of controller
//and in review.js of routes just write this line=>"const reviewController=require("../controllers/reviews.js");"

//similary we di this for user.js of routes restructre it with user.js of controlller


//lecture 4:
//Router.route:A Way to group together routes with different verbs but the same paths
//so we have restructure it in listings .js   and user.js

//lecture 5:Re-style Ratings
//for rating we want star like to do so we have to use a library starability(lunar logic)
//in this there are varous kind of styling but we implments starability_slot.css to use this fisrt import(copy  the  file and import into css folder in new file(rating.css))
//and then include it in our boilerplate and then include the code from the starability in LEAVE A REVIEW FORM (class stability-slot)  and then to so 
//star in posted review we have to also add a code fromstability that showing static-rating-result  after the ALL REVIEWS just after the data-rating
//by this the default value for star is 3 so we have to replace it with review.rating and remove the review.rating line and add a card-test class to this para.


//lecture 6:
//Image Upload
//problem in uploading in file(img) from a form=> 1.the file won't be sent to the server,(we have to add Add enctype="multipart/form-data" to the <form> tag)
                                                //2.Don’t store big files in MongoDB. Store the file outside, and save only the link in the DB.(through thirdparty)
//i.e.form ko capable banane ke baad(matlab sent file to server) then hum user se file upload karre ge fir kisi third-party(cloud) se url-link genertate karre ge aur isko mongo db me save kara ge.
//so it include 3 step(make capable,generte url, save it to db)


//lecture 7:now we are gonna to maniplute our form (during creating a listing)i.e. it should upload our files to the server 
//the reason that is can't send the form to sever beacause it send the url encoded data in files
//so to send files to  server we have to  include "enctype=multipart encoded data" in the form in new.ejs in listings and in img tag just change the image tag type="file". 
//and we we create a listing then on submiting we get a null data for this listing(in req.body) because we are not sending the url-encodeed data we are sendiing itin multipart encoded data
//so to encode it  we have to use multer package (it process only multipart) so , first install it(npm in multer) and reuire and initialize it in listing.js and now writet the upload.single in .post in listing.js
//after this wehave seen a pload foler is created by multer in majorproject



//lecture 8:
//until here we have save ourfiles in local stirage by modifying out form now we wnt to save it in could storage for this 
//first go toCLOUDINARY and sirnup it and then we got our credential's (i.e. cloud name ,api key,api secret api environment variable) and we never show or share our credential to other's and to protect this
//we store in other file that is .env file used to store environmental variable so we created this file and in this we store environmental variable in   KEY=VALUE(no space,quotes in value)  form and require it in top of app.js
//but these env variabel can't accessed directly we have to used a another package i.e., dotenv used to  loads environment variable from a .envfile  into process.env(means  current environment variable running files )
//so forst install dotenv and then require the dotenv file and we print the process.env where the env. variable is loaded



//lecture 9:
//now we are going to store files(where we are going to use multer and Cloudinary)
//so use use 2 packages for it(npm i cloudinary and multer-storage-cloudinary)
//we ahve got a conflict so we use "npm install multer-storage-cloudinary --legacy-peer-deps "
//now to use these library we have created a cloudConfig.js file  and we do here all the configuration part
//


//lecture 10:to save the link in mongodb
//changing the image schem and svae the name of the schmema in listing.js i n controller in create route creatinf filename and
//url abd create  a new listing and in model in listing.js we ahve modified the .post method

//lecture 11:Display Image:
//here we have reinitialize the database(cd init and then node index.js) and then we add .url after listing.image at respective case
*/



















/*
//PROJECT PHASE 3 PART B
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const userRouter=require("./routes/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

  
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

app.get("/",(req,res)=>{
    res.send("hi, i am root");
})

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


//lecture 1:now we want to edit or upload a new  image in edit form by replacing the new image into it
//so for first we have to modify the edit.ejs form by adding enctype="multipart/form-data" in form then in image div we have remove the valuse and placeholder and change the type from text to file
//and then we have also remove the message .from this now we can upload a image butnoe we have to modified the code so that backened will hanadle the file
//so for this go to listing.js of router and in update route(.put) write this(upload.single("listing[image]")) before the validate listing so the multer will access it before validating and then go to 
//listing.js of controller in update route we have a conditional code work only when we have upload a file in edit .js form ,,write required in new new.ejs and remove it from edit.ejs


//lecture2:NOw we want a Image Preview option in edit.ejs so that user have an idea about the previous image before it goes for editing
//so for this we can create a div which display the img before the  upload a new image option in edit.ejs of listings but through this we will se the whole img with high quality in edit.ejs 
//but we want a preview of img in small quality so do this we use the properties of cloudinary i.e. adding some parameter after the uploads in api as shoen in listing.js of controller in render.Edit option 
//add heigth option also in render,Edit option in api


//lecture3:now we want to add a map on show.ejs so use we mapLibre instead of map.box
//because it now requires cc details

//lecture4:
//so for this go to map gl js and in it go to ADD A DEFAULT MARKER and then add a css and js link in boilerplate.js in head and to display map we have to be a div in body tag with id=map which is added in show.ejs
//and also add script tag in it from docs and we must have to add a style about height and width of the map in style.css in css folder
//we can also can tha longitutde and latitude in our map
//untill now we have render a map in all lisitng on their show..ejs page and now we have write the script code in map.js in public file
//so for if u have a token (in map.box) then it can't be access form the public file as it is in ejs file so we have to fisrt write the save environmental variable(i.e process.env.variable) in script tag in show.ejs before renderining the map.js file(public)
//but in mapLiber we don't neeed to do it so we just paste the script tag in map.js and write the address of the code in the script tag in show.ejs


//lecture5:untill now we have same location in all the listings for different location first we have to study about geocoding
//GEOCODING:is the process of converting address(like a street address) into geographic coordinates(like latitude and longitude),which u can use to plae markers in a map,or position the map.
//so for this we have the includes something as shown in the listing.js of controller and also we have made a forward geocding function in it


//lecture 6:now after converting the address into coordintes through function NOW WE ARE GONING TO STORE THESE COORDINATRES(GeoJSON)

//lecture 7 and 8 we have implemented the code using maptiler for  geocoding and write the code eith chatgpt.

*/



















//PROJECT PHASE 3 PART C
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');//lecture 1 part d
const flash=require("connect-flash");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");

const userRouter=require("./routes/user.js");

//lecture 1 phase3 part d:we use altas for deployment of database to cloude instead of database.
// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dburl=process.env.ATLASDB_URL;


const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,//if nothing change then update will be in 24 hours.
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

 

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main( )
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(dburl);//instead of MONGO_URL(LECTURE1 PHASE 3PARTD)
}   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 

// app.get("/",(req,res)=>{
//     res.send("hi, i am root");
// })

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let { statusCode=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//lecture 1:Now we are changing our home page 
//so first we first we remove home option from the navbar.ejs and chage the "/" into "/listings" and then add new listing option to the right side and then we bold  signup and login option
//and then we remove the  "/" route from app.js also

//lecture 2:
//in this we have add filters option in index.ejs of lisitngs(views) 
//now after the dispalying the filter on the pages we are now going to make it functional so for this we have to add a category option in listing.js of models 
//and in new.ejs we have created a dropdown option for category
// now to save the category to the database go to routes/listing.js(add a get route for category) and in Controller/listing.js(do nothing)
//and then index.ejs/listing/views we have to add the categroy in anchor tag and make the link in black color 
//and also we have to add category part in Schema.js (joi:validate data)



//lecture 3:
//now we r going to add tax-toogle button
//we use bootstrap toggle button ,we add a swtich into index.ejs/listings


//lecture 4:
//in this we show +18% taxes on cliking and remove on double click in script tag in index.js
//we add an eventListerner to it and set the it displey:none for it aperas when it click(on) 

//lecture 5:
//now we add a search option in the navbar using bootstrap and then we create the backened part for it in routes/listing.js
// created a get route,in routes of lisitng and in controller listing.js file and then in index.ejs



//phase 3 part d 
//lecture 1:
//in this lecture we are now going to put the database on the cloud (deployment=>access through internet) for this we use MONGO ATLAS(also because its free)
//go to: mongodb.com/atlas/database then signup then create it and then create a user database =>username:deltaStudent and password:w3S58aaKwSLvS17V (on security ,quickstart) and create.
//now go to connect and select connect to application: then get the link(mongodb+srv://deltaStudent:<PASSWORD>@cluster0.yiok1uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)
//and now in this link remove bracket and password and paste the password here=>mongodb+srv://deltaStudent:w3S58aaKwSLvS17V@cluster0.yiok1uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//now we save this link in .env with ATLASDB_URL and in app.js we remove the old mongodb link which connect the localhost and we use this atlas link.
//now all thelisting are remove and now we signup(create) with demo (on altas=>cloud) and then go to altas then database then on cluster0 go to collections then go to users we see our demo user in the cloude database and simily we can create listing


//lecture 2:
//Now we are going to use mongo express session store because express session store is not scalable,and it has local storage i.e. not desined for production itis for development environment and it only  meant for debugging and error detection.
//so we use CONNECT MONGO in which we store session related information i.e cookies,user related token ,etc.
//so first install this:npm i connect-mongo and then aquire it i.e. "const MongoStore = require('connect-mongo');" write after express session require statement
//and then we created store variabe that helps tosets up session storage in MongoDB using connect-mongo. It:Connects using the mongoUrl (dburl).Encrypts session data with a secret.Uses touchAfter to reduce unnecessary DB writes.Logs any session store errors.


//lecture 3:
//Deployment:we use render for deployment.
//we signup on render then use create a engine in package.json and write the node version in it
//so that project from local storage we store(or push) on github in private/public repo then render can use this repo for deployment.


//lecture 4:
//now we connect render with github
//so fot this we have copy the majorproject and created a WanderLust folder and keep only the code.
//so when we r uploading project then we do not upload the our .env file and node_modules file
//NOW WE WRITE git init and then git status(see all the file )
//and to not upload the file in repo (i.e. .env and node_modules) we use first "touch .gitignore" and in this file write the file name (i.e .env ,node_modules/) that we want to ignore and after this we see the color changes
//we see we u write again "git status" now we see only the essential one
//now to add write (git add .) and  to commit write(git commit -m "Add Project Files")

//lecture 5:
//connect github with render
//so now until here we have add and commit the files in git so before push we have to make connection between the render and github
//so for this open render then click connect with github and then click only select repositories on Repository access and in advance option deployment=manual not automatically for now
//after all this whwn we deploy then our deployment is fail beacuse of .env file we dont push this due to use our repo cant access it.


//lecture 6:
//For successful deployment we have to fix two thing first ENVIRONMET VARIABLE access(for .env file) and second CONFIG ATLAS(as it store the ip of local system but now the project is on cloud-render so we have to render ip).
//so for first :go to render then our project ->environment(in left) then go to environment variable and add all(must) variable in this and their respective value from .env file as it is.
//now for second:on render got o logs then select all the ip one by one and paste in altas in network access ->add ip one by one .
//after that we give http link for our project .