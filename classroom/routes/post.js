const express=require("express");//requiring express
const router =express.Router();//creating Router obj


//posts
//index 
router.get("/",(req,res)=>{
    res.send("GET for posts");
});
//show
router.get("/:id",(req,res)=>{
    res.send("GET for post id");
});
//post 
router.post("/",(req,res)=>{
    res.send("POST for posts ");
});
//delete 
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id")
});


module.exports=router;