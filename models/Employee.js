const mongoose = require("mongoose");
const validator = require("validator");
const CompanySchema = require("./Company").schema;
const bcrypt = require("bcryptjs")
const employeeSchema= mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please provide username"],
        unique:true
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
    company:{
        type: CompanySchema,
        required:[true,"Please provide company"],

    }
})

employeeSchema.pre("save",async function(next){
    //hashing password
    this.password = await bcrypt.hash(this.password,12)
    next();
})

employeeSchema.methods.checkPassword= async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const Employee= mongoose.model("Employee",employeeSchema)

module.exports= Employee;