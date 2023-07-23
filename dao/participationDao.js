const Participation = require("../models/Participation");
const Hackathon = require("../models/Hackathon");
const hackathonDao=require("./hackathonDAO")

exports.createParticipation = async (body) =>{
    let {participant, hackathon, techStack, experienceLevel} = body;

    //check deadline
    if(new Date(hackathon.registrationEndDate).toDateString()< new Date().toDateString()){
        return {error:"Registraton date has passed"}
    }

    //check if registration has started
    if(new Date(hackathon.registrationStartDate).toDateString() > new Date().toDateString()){
        return {error:`Registrations are going to be starting on ${hackathon.registrationStartDate}`,}
    }

    //check if skills match
    const requiredTechstacks = hackathon.techStack.split(",");
    const techStackArray=techStack.split(",")

    let flag=0;

    for ( var i=0 ;i <requiredTechstacks.length; i++){
        for (var j=0; j< techStackArray.length; j++)
        {
            if (requiredTechstacks[i] == techStackArray[j])
            {
                flag=1;
                break;
            }

        }
        if(flag==1)
            {
                break;

            }
    }

    
    if(flag == 0){
        return {error:"Your skills set doesn't match with required tech stack for this hackathon"}
    }

    //max slots
    const participationsOnHackathon = await Participation.find({"hackathon._id":hackathon._id});

    if(participationsOnHackathon.length == hackathon.maxSlots){
        return {error:"Sorry! All slots are filled!!"}
    }


    //experience level
    const levels = {
        "Beginner": 1,
        "Intermediate":2,
        "Expert":3
    }

    const requiredLevel = levels[hackathon.experienceLevel];
    const givenLevel = levels[experienceLevel];

    if(requiredLevel>givenLevel){
        return {error:"your level of experience does not match with requirements"}
    }
    

    try {
        const slotsRemaining=hackathon.slotsRemaining-1
        await hackathonDao.updateHackathon({_id:hackathon._id},{slotsRemaining});
        return await Participation.create({
            participant, hackathon:{...hackathon,slotsRemaining}, techStack, experienceLevel
        })

    }catch(err){
        console.log(err)
        return {error:err}
    }
}

exports.getAllParticipations = async () =>{
    try {
        return await Participation.find();

    }catch(err){
        return {error:err};
    }
}

exports.getParticipantsOfHackathon = async (params) =>{
    try {
        const participations = await Participation.find({"hackathon._id":params.hackathonId});

        const participants = participations.map((participation)=>{
            return participation.participant;
        })

        return {totalParticipants: participants.length,participants};

    }catch(err){
        return {error:err};
    }
}

exports.getHackathonsOfEmployee = async (params) =>{
    try {
        const participations = await Participation.find({"participant._id":params.employeeId});

        const hackathons = participations.map((participation)=>{
            return participation.hackathon;
        })

        return {totalHackathonsParticipated:hackathons.length, hackathons}
    }catch(err){
        return {error:err}
    }
}

exports.getHackathonsOfOrganizer = async (params) =>{
    try {
        const hackathons = await Hackathon.find({"organizer._id":params.employeeId});

        return {totalHackathonsOrganized:hackathons.length, hackathons}
    }catch(err){
        return {error:err}
    }
}