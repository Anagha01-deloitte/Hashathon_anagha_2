const express= require("express");
const morgan=require("morgan")
const app= express();
const companyRouter= require("./routes/companyRouter");
const authRouter= require("./routes/authRouter");
const employeeRouter= require("./routes/employeeRouter");
const hackathonRouter = require("./routes/hackathonRouter");


app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/employee",employeeRouter);
app.use("/api/v1/hackathon",hackathonRouter);




//health check
app.get("/",(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Application loaded succesfully!"
    })
})


module.exports=app;