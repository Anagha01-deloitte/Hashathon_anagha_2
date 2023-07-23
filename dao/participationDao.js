const Participation = require("../models/Participation");

exports.createParticipation = async (body) =>{

    let {participant, hackathon, techStack, experienceLevel} = body;

    const registrationDate = new Date();
    //check deadline
    if(hackathon.registrationEndDate < new Date()){
        return {error:"Registraton date has passed"}
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
        return await Participation.create({
            participant, hackathon, techStack, experienceLevel
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