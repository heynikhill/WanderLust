//project phase 2 part d
//lecture 6
const mongoose=require("mongoose");//requiring  mongoose
const Schema=mongoose.Schema;//and schema
const passportLocalMongoose=require("passport-local-mongoose");//requiring passport-local-mongoose

//defining schema
const userSchema=new Schema({
    //username ,a salt value and a hased password automatically stored by our passport-local-mongoose 
    //to implement this we have to pass in as plugin  as written after this
    email:{
        type:String,
        reqired:true,
    }
})

userSchema.plugin(passportLocalMongoose);//for username ,salt value,hased password and autometically implements various method(like authenticate password)
//so we don't have to implements the varoiur athenticate from the screath(from initial) 

module.exports=mongoose.model('User',userSchema);//exporting

