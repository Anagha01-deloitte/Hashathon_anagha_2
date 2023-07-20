const express= require("express");
const morgan=require("morgan")
const app= express();


//health check
app.get("/",(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Application loaded succesfully!"
    })
})


module.exports=app;