/*
//project pahse 2 part d
//lecture 9

const express=require("express");
const router=express.Router();

const User=require("../models/user.js");//lecture 10 :requiring user.js (where user data store which is form in models)
const wrapAsync = require("../utils/wrapAsync");
const { authenticate } = require("passport");
 
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");//signup.ejs form  created for enterining details
});


//lecture  10(project pahse 2 part d)
router.post("/signup", wrapAsync (async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        //project phase 2 lecutre 4 for automaticallt login when we signup
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
}));
//here if u dont use try catch then error will come in alert in some random page but
//if u want that the error will come in flash form  in signup form

//lecture 11
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");//login.ejs form  created for enterining details for login
});

// this will verify that user exit or not with the help of passport middleware
router.post("/login",

    saveRedirectUrl,//middleware that store the url of post -login page(L5 part e phase 2)

    passport.authenticate("local",{//passport middleware
        failureRedirect:"/login",//if corrected then it redirected
        failureFlash:true,
    }),
    async(req,res)=>{
        req.flash("success","Welcome back to WanderLust");
        // res.redirect("/listings");
        //lecture 5 part e phase 2
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

//project phase 2 part e lecture 2
//creates a logged out route
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
});


module.exports=router;
*/






//PROJECT PHASE 3 PART A 
/*
// LECTURE 3
const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { authenticate } = require("passport");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

router.get("/signup",userController.renderSignupForm);

router.post("/signup", wrapAsync (userController.signup));


router.get("/login",userController.renderLoginForm);

router.post("/login",

    saveRedirectUrl,

    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    userController.login
);
router.get("/logout",userController.logout);


module.exports=router;
*/

//lecture 4:
const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { authenticate } = require("passport");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post( wrapAsync (userController.signup)
);

router  
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    userController.login
);
    

router.get("/logout",userController.logout);


module.exports=router;