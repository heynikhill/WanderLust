module.exports= (fn)=>{
    return (req,res,next)=>{//arrow function
        fn(req,res,next).catch(next); 
    };
};