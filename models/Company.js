const mongoose = require("mongoose");

const companySchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Company must have a name"]
    }
})

const Company= mongoose.model("Company",companySchema)

module.exports= Company;