const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const hackathonSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide username"]
    },
    startDate:{
        type:Date,
        required:[true,"Please provide start date"],
        default: new Date(new Date().getDate() + 8) //one week's time for particpants to register (default behaviour)
    },
    endDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    registrationStartDate:{
        type:Date,
        required:[true,"Please provide start date"],
        default: new Date(new Date().getDate() + 1) //start tomorrow 
    },
    registrationEndDate:{
        type:Date,
        required:[true,"Please provide start date"],
    },
    companyId:{
        type: ObjectId,
        required:[true,"Please provide company ID"],
    },
    organizerId:{
        type: ObjectId,
        required:[true,"Please provide organizer ID"],
    },
    status:{
        type:String,
        enum:["Active","Closed","Upcoming"],
        default: "Upcoming"
    },
    maxSlots:{
        type:Number,
        required:[true,"Please provide maximum number of slots"],
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