const Hackathon = require("../models/Hackathon");
const moment = require("moment");
const Employee = require("../models/Employee");

exports.createHackathon = async (body) =>{

    let {name, startDate, endDate, registrationStartDate, registrationEndDate,
    organizerId, maxSlots, description, techStack, experienceLevel} = body;

    const slotsRemaining= maxSlots;

    startDate = moment(new Date(startDate)).add(1,"days");
    endDate =moment(new Date(endDate)).add(1,"days");
    registrationStartDate = moment(new Date(registrationStartDate)).add(1,"days");
    registrationEndDate = moment(new Date(registrationEndDate)).add(1,"days");

    const organizer = await Employee.findOne({_id:organizerId});

    try {
        return  await Hackathon.create({
            name, startDate, endDate, registrationStartDate, registrationEndDate,
            organizer, maxSlots, slotsRemaining, description, techStack, experienceLevel
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
            if (new Date(hackathon.registrationStartDate).toDateString() > new Date().toDateString())
            {   
                 hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Upcoming"}
            }
            else if (hackathon.slotsRemaining<=0){
                hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Closed"}
            }
            else if(
                (new Date(hackathon.registrationStartDate).toDateString() <= new Date().toDateString() 
                && new Date(hackathon.registrationEndDate).toDateString() > new Date().toDateString()))
            {   
                hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Active"}
            }
            else{
                hackathon= {...hackathon}
                 hackathon= hackathon._doc
                return {...hackathon,status:"Closed"}
            }
        })
        return hackathonsStatus;

    }catch(err){
        console.log(err)
        return {error:err};
    }
}

exports.updateHackathon = async (params, body) =>{

    let hackathon = await Hackathon.find(params);
    
    if(hackathon.length>0){
        hackathon = hackathon[0];
        if(body.slotsRemaining!=0 && !(body.slotsRemaining) && new Date(hackathon.registrationStartDate).toDateString() <= new Date().toDateString()){
            return {error:"Hackathon cannot be edited once the registration starts"}
        }
        return await Hackathon.findOneAndUpdate(params, body);
    }
    else{
        return 
    }

}

exports.getHackathon = async (params) =>{
    let hackathon = await Hackathon.findOne(params);
    if (new Date(hackathon.registrationStartDate).toDateString() > new Date().toDateString())
    {   
         hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Upcoming"}
    }
    else if (hackathon.slotsRemaining<=0){
        hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Closed"}
    }
    else if(
        (new Date(hackathon.registrationStartDate).toDateString() <= new Date().toDateString() 
        && new Date(hackathon.registrationEndDate).toDateString() > new Date().toDateString()))
    {   
        hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Active"}
    }
    else{
        hackathon= {...hackathon}
         hackathon= hackathon._doc
        return {...hackathon,status:"Closed"}
    }
}

exports.deleteHackathon = async (params) =>{
    return await Hackathon.findOneAndDelete(params);
}

exports.hackathonSearch= async (query) =>{

    try {
        return await Hackathon.find(query);

    }catch(err){
        console.log(err);
        return err
    }
}