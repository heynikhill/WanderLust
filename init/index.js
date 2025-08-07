const mongoose=require("mongoose");//requiring moongoose to use connect to db
const initData=require("./data.js");//requiring data to use sample data
const Listing=require ("../models/listing.js");//requiring lisitng to use schema
//now making this index.js  connected to the db
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
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

const initDB=async ()=>{
    await Listing.deleteMany({});//deleting all the previos data

    //project phase 2 part e lecture 6;:adding a owner to all the lisintg
    initData.data = initData.data.map((obj)=>({...obj , owner:"6853bfcfc5ef0c3c84d0eb9b" , }));

    await Listing.insertMany(initData.data);//data is key for sample data when we r imorting it in obj form
    console.log("data was initialize");
} 

initDB();