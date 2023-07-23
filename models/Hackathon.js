const mongoose = require("mongoose");
const EmployeeSchema = require("./Employee").schema;

const hackathonSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide username"]
    },
    startDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    endDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    registrationStartDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    registrationEndDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    organizer:{
        type: EmployeeSchema,
        required:[true,"Please provide organizer"],
    },
    maxSlots:{
        type:Number,
        required:[true,"Please provide maximum number of slots"],
    },
    slotsRemaining:{
        type:Number,
        default:this.maxSlots,
        required:[ true, "Please provide remaining slots"]
    },
    description:{
        type: String,
        required:[ true, "Please provide description"]
    },
    techStack:{
        type:String,
        required:[ true, "Please provide tech stack required for hackathon"]
    },
    experienceLevel:{
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"],
        required:[ true, "Please provide experience required for hackathon"]
    },
})

const Hackathon= mongoose.model("Hackathon",hackathonSchema)

module.exports= Hackathon;