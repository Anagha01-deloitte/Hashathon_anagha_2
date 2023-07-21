const express= require("express");
const morgan=require("morgan")
const app= express();
const companyRouter= require("./routes/companyRouter")

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/company",companyRouter);

//health check
app.get("/",(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Application loaded succesfully!"
    })
})


module.exports=app;