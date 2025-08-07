/*
const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("Hi I am rott");
});

//index -users
app.get("/users",(req,res)=>{
    res.send("GET for users");
});
//show -users
app.get("/users/:id",(req,res)=>{
    res.send("GET for user id");
});
//post -users
app.post("/users",(req,res)=>{
    res.send("POST for users ");
});
//delete -users
app.delete("/users/:id",(req,res)=>{
    res.send("DELETE for user id")
});

//posts
//index 
app.get("/posts",(req,res)=>{
    res.send("GET for posts");
});
//show
app.get("/posts/:id",(req,res)=>{
    res.send("GET for post id");
});
//post 
app.post("/posts",(req,res)=>{
    res.send("POST for posts ");
});
//delete 
app.delete("/posts/:id",(req,res)=>{
    res.send("DELETE for post id")
});

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})


//lecture 3:  from here onwards we are going to discuss some miscellanois topics like (#EXPRESS ROUTER ,#COOKIES)
//Restructining code:Express Router (functionality wise chnage nothing)
//Express Routers are a way to organise your Express application such that our primary app.js file does not become bloated(very big-difficult to understand)
//creates new router object=>const router=express.Router()
//so inthis lecture we have created a server for user and post routes,here we take a very small details inside routes but in actually
//the code are big and it's become floated.

*/

/*
//lecture 4:we have cut the user and post code into their respective file
const express=require("express");
const app=express();
const users=require("./routes/user.js");//reuire user,js
const posts=require("./routes/post.js");//requiring post.js


app.use("/users",users);//
app.use("/posts",posts);

app.get("/",(req,res)=>{
    res.send("Hi I am rott");
});

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})

//lecture 4:
//so we try to restructure our code into two files(which is in routes folder)
//we only write a single line for each file in routes in server page through which 
// our programme become simple and understandable through restructurining the code.
//we have created a routes folder and user.js and posts.js files
*/


//lecture 5:
//Web Cookies:
//HTTP cookies are small blocks of data created by a web server while a user is browsing a 
//website and place on the user's computer or other device by the user's web browser.
//cookies used for personalization ,tracking,save our previous content or function.

/*
//lecture 6:
//now how we can send cookies
const express=require("express");
const app=express();
const users=require("./routes/user.js");//reuire user,js
const posts=require("./routes/post.js");//requiring post.js

app.get("/",(req,res)=>{
    res.cookie("greet","hello");
    res.cookie("madeIn","India");
    res.send("sent you some cookies");
});

app.get("/",(req,res)=>{
    res.send("Hi I am rott");
});

app.use("/users",users);//
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
//start the server nodemon server.js (in classroom) then go to browser and enter localhost:3000
//then go to application->storage->cookies ,we will see no cookie is there because we have to send fisrt
//=>localhost:3000/getcookies then after this we will see the cookies on each route in application parts of broweser.
*/


/*
//lecture 7:
//now we see how to parse the cookies means if other page want to access our cookies then how it can be done we will see it
//so we can't directly parse our cookies so we use cookiesP-arser middleware(npm package) 
const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.cookie("greet","hello");//we can add cookies form here like this or also just write the cookies in browser in cookies part 
    res.cookie("madeIn","India");
    res.send("sent you some cookies");
});

app.get("/greet",(req,res)=>{//when we enter localhost:3000'greet if the name cookies is there then it give your name other wise anonymous.
    let { name ="anonymous"}=req.cookies;
    res.send(`Hi ${name}`);
});

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("Hi I am rott");
});

app.use("/users",users);//
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
*/


/*
//lecture 8:
//Signed Cookies
//through this we can get to known is there is same tamper(changes) in our cookies
//here first we delete all our previu scookies and then we add new cokkies of signed ones and
//  also write a middleware to verify it
const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser("seceretcode"));//add seceratecode




app.get("getsignedcookie",(req,res)=>{
    res.cookie("moade-in","India",{signed:true});
    res.send("signed cookie sent");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res,send("verified");
});




// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");//we can add cookies form here like this or also just write the cookies in browser in cookies part 
//     res.cookie("madeIn","India");
//     res.send("sent you some cookies");
// });

// app.get("/greet",(req,res)=>{//when we enter localhost:3000'greet if the name cookies is there then it give your name other wise anonymous.
//     let { name ="anonymous"}=req.cookies;
//     res.send(`Hi ${name}`);
// });

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("Hi I am rott");
});

app.use("/users",users);//
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
    */







//PROJECT PHASE 2:PART C
//lecture 1:What is state?
//#stateful Protocol=>require server to save the status and session information. 
//eg. ftp(file transfer protocol)
//#stateless Protocol>doew not require the server to retain the server information  
//eg. http

/*
//lecture 2:
//Express Sessions=>An attempt to make our session stateful
//matlab routes ko stateful bana de   
//suppose a user go to ecommerce website and not log-in and add some items from electronic
//  into cart and he/she switch the page to clothes so as web is an http protocol  
// (which don't save the content) BUT we want that the details of the cart will be saved ,
//a season  is generted with a  session_id when user go to the server and this session will be stored in server side
// but it is saved in some temporary storage because it store in database unnit payment is done
//we are not saving all the details in cookies as deatils size is very large as compare to cookies and cookies are not secure.
//so we store only the seasion_id  on the cookies(client-side=>browser)

//so express season store our data in temporary form in client-side(browser) and send the session_id in the form of  cookies to the browser
//now we see the practicall implementation:
//first install npm i express-session and require it
//and we use session as middleware and add some secret sting in it then
//  for each and every routes  a session_id (connect_sid) is store in browser in the form of a cookies  

const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");

const session=require("express-session");//requiring express-session

app.use(session({secret:"mysupersecretstring"}));//session as middleware

app.get("/test",(req,res)=>{
    res.send("test successful!");
});


app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
    //run:localhost:3000/test
*/



/*
//lecture 3:
//session_id will same in a browse(when we open the same page in same browser(session is same))  but it is differs in diff-diff browser
const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");

const session=require("express-session");//requiring express-session

app.use(
    session({
        secret:"mysupersecretstring",
        resave:false,//session will resave ,even there si no change
        saveUninitialized:true,//forces a session that is uninitialize to be saved to the store
    }));//session as middleware

app.get("/reqcount",(req,res)=>{
    if(req.session.count){//req.session track a single session and we make a count varivale that give no of times session requested 
        req.session.count++;
    }else{
        req.session.count=1;
    }
    
    res.send(`you sent a request ${req.session.count} times`);
})
//in a single session client and server is same just request number is changed will will bw track by req.session.count
//count is store in temporary store(memory store) but in production we use session store like=> connect-radis etc there are many diff-diff session -store but we use here memory store
//also the session_id same 
app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
    //to run:http://localhost:3000/reqcount
    */


/* 
//lecture 4: now we see how to store information at server-side and how we can use the data or info on browser ( with the help of express-session)
const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");

// app.use(
//     session({
//         secret:"mysupersecretstring",
//         resave:false,
//         saveUninitialized:true,
//     }));//session as middleware
//we can rewrite this  as so in later we cn add more options easily
const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}; 
app.use(session(sessionOptions));

//information saved through req.session
app.get("/register",(req,res)=>{
    let { name ="anonymous"}=req.query;//it take name from the url and if not there  then it use default i.e. anonymous
    // console.log(req.session);//req.session is an obj it has some inbuilt deifine variable now we define name variable i.e.
    req.session.name=name;
    // res.send(name);
    res.redirect("/hello");
});

//information retrives through req.session
app.get("/hello",(req,res)=>{
    res.send(`hello,${ req.session.name}`);
});
//so with the the help of req.session we can save somthing  into a session and we can use these saved info   as shown

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})     

//to run:localhost:3000/register =>hello anonmyous
//      or localhost:3000/register?name=nikhil =>hello shardha

*/



/*
//lecture 5:
//connect-flash:the flash is a special area of the session(i.e. flash store in session) used for storing messages.
//Messages are written to the flash and cleared after being displayed to the user.
//matlab yese message jo single time appear kare aur page ko refresh karte hi message hath jaye
//it is an npm package so we fisrt install it and then require it and write use statements and then
//write flash message ,here we want to show meassage before  user registerd  so we write the flash message.
//but from this line nothinf will show ,so we have to use views for this we have to created a views folder 
// and created a page.ejs  and set the views in our programmme 


const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");


const flash=require("connect-flash");//1.requiring flash
const path=require("path");
app.set("view engine","ejs");4.//acquiring view for to show flash message
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}; 
app.use(session(sessionOptions));
app.use(flash());//2.using flash

//information saved through req.session
//so we want to flash a  message  when user register so we use flash before redirect
app.get("/register",(req,res)=>{
    let { name ="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user registered succssful");//3.this has 2 parameter fisrt is key and second in message.
    res.redirect("/hello");
});

//information retrives through req.session
app.get("/hello",(req,res)=>{
    // res.send(`hello,${ req.session.name}`);
    //now we use to send message beore register then display the hello ,name(either user wala or anonmayous) so
    // res.rend er("page.ejs",{name:req.session.name});
    //5.now we want to display flash so we use key value to show flash message  and store it in msg
    res.render("page.ejs",{name:req.session.name  , msg:req.flash("success")});
});
//so with the the help of req.session we can save somthing  into a session and we can use these saved info   as shown

app.listen(3000,()=>{
    console.log("server is listening to 3000");
}) 
*/


//lecture 6:
//using res.locals for  displaying the mesaages as shown 

const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");


const flash=require("connect-flash");//1.requiring flash
const path=require("path");
app.set("view engine","ejs");4.//acquiring view for to show flash message
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}; 
app.use(session(sessionOptions));
app.use(flash());//2.using flash

app.use((req,res,next)=>{//middleware for flash while using locals 
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})

//information saved through req.session
//so we want to flash a  message  when user register so we use flash before redirect
app.get("/register",(req,res)=>{
    let { name ="anonymous"}=req.query;
    req.session.name=name;

    // req.flash("success","user registered succssful");//3.this has 2 parameter fisrt is key and second in message.

    if(name==="anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered succssful");
    }

    res.redirect("/hello");
});

//information retrives through req.session
// app.get("/hello",(req,res)=>{
//     res.locals.successMsg=req.flash("success");
//     res.locals.errorMsg=req.flash("error");
//     res.render("page.ejs",{name:req.session.name  });
// });//can also used with middleware(better code )
//or also we can use middleware so that if these message are used again and again we can use it easily and 
//also throught this app.get not become very bulky .i.e.
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name  });
});

app.listen(3000,()=>{
    console.log("server is listening to 3000");
}) 




//now from lectre 7 we implemwtns this in our project refer app.js