const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = require("mongodb");

const employeeSchema= mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please provide username"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        unqiue: true,
        lowercase: true,
        validate:[ validator.isEmail,"Please provide valid email"]
    },
    password:{
        type: String,
        required:[true,"Please provide password"],
        minlength:8
    },
    companyId:{
        type: ObjectId,
        required:[true,"Please provide company ID"],

    }
})

const Employee= mongoose.model("Employee",employeeSchema)

module.exports= Employee;