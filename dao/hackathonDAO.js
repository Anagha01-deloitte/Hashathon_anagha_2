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
        return err;
    }

}

exports.getAllHackathons = async() =>{
    try {
        return await Hackathon.find();

    }catch(err){
        return {error:err};
    }
}

exports.updateHackathon = async (params, body) =>{
    const result = await Hackathon.findOneAndUpdate(params, body,{new:true});
    return result;
}

exports.getHackathon = async (params) =>{
    const result = await Hackathon.findOne(params);
    return result;
}

exports.deleteHackathon = async (params) =>{
    return await Hackathon.findOneAndDelete(params);
}
