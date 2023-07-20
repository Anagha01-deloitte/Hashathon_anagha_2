const app= require("./app");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path: './config.env'})

//connect to database 
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then((con)=>{
    console.log("Connected to database !!")
}).catch(err=>{
    console.log(err.message);
})

//start the server
app.listen(process.env.PORT,()=>{
    console.log("App running on port ", process.env.PORT);
})