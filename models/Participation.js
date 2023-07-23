const mongoose = require("mongoose");
const EmployeeSchema = require("./Employee").schema;
const HackathonSchema = require("./Hackathon").schema;


const participationSchema= mongoose.Schema({
    registrationDate:{
        type:Date,
        required:[true,"Please provide start date"],
        default: new Date()
    },
    participant:{
        type: EmployeeSchema,
        required:[true,"Please provide employee"],
    },
    hackathon:{
        type: HackathonSchema,
        required:[true,"Please provide hackathon"],
    },
    techStack:{
        type:String,
        required:[ true, "Please provide tech stack required for hackathon"]
    },
    experienceLevel:{
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"],
        required:[ true, "Please provide experience required for hackathon"]
    }
})

const Participation= mongoose.model("Participation",participationSchema)
module.exports= Participation;