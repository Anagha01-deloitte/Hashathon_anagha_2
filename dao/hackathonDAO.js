const Hackathon = require("../models/Hackathon");
const moment = require("moment");
const Employee = require("../models/Employee");

exports.createHackathon = async (body) =>{

    let {name, startDate, endDate, registrationStartDate, registrationEndDate,
    organizerId, maxSlots, description, techStack, experienceLevel} = body;

    startDate = moment(new Date(startDate)).add(1,"days");
    endDate =moment(new Date(endDate)).add(1,"days");
    registrationStartDate = moment(new Date(registrationStartDate)).add(1,"days");
    registrationEndDate = moment(new Date(registrationEndDate)).add(1,"days");

    const organizer = await Employee.findOne({_id:organizerId});

    try {
        return  await Hackathon.create({
            name, startDate, endDate, registrationStartDate, registrationEndDate,
            organizer, maxSlots, description, techStack, experienceLevel
        });
    }catch(err){
        console.log(err);
        return err;
    }

}

exports.getAllHackathons = async() =>{
    try {
        let  hackathons = await Hackathon.find();

         const hackathonsStatus = hackathons.map((hackathon)=>{
            if (hackathon.registrationStartDate > new Date())
            {   
                 hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Upcoming"}
            }
            else if(hackathon.registrationStartDate <= new Date() && hackathon.registrationEndDate> new Date())
            {   
                hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Active"}
            }
            else{
                hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Past"}
            }
        })

        return hackathonsStatus;
        

    }catch(err){
        console.log(err)
        return {error:err};
    }
}

exports.updateHackathon = async (params, body) =>{
    const result = await Hackathon.findOneAndUpdate(params, body,{new:true});
    return result;
}

exports.getHackathon = async (params) =>{
    let hackathon = await Hackathon.findOne(params);
    if (hackathon.registrationStartDate > new Date())
    {   
         hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Upcoming"}
    }
    else if(hackathon.registrationStartDate < new Date() && hackathon.registrationEndDate> new Date())
    {   
        hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Active"}
    }
    else{
        hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Past"}
    }
}

exports.deleteHackathon = async (params) =>{
    return await Hackathon.findOneAndDelete(params);
}
