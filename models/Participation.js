const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const participationSchema= mongoose.Schema({
    registrationDate:{
        type:Date,
        required:[true,"Please provide start date"],
        default: new Date() //start tomorrow 
    },
    emolpyeeId:{
        type: ObjectId,
        required:[true,"Please provide employee ID"],
    },
    hackathonId:{
        type: ObjectId,
        required:[true,"Please provide hackathon ID"],
    },
    status:{
        type:String,
        enum:["Active","Closed","Upcoming"],
        default: "Upcoming"
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

const Participation= mongoose.model("Hackathon",participationSchema)
module.exports= Participation;