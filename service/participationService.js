const participationDao = require("../dao/participationDao");
const hackathonDao = require ("../dao/hackathonDAO");
const employeeDao = require("../dao/employeeDAO");

exports.createParticipationService = async (body) => {
    const { employeeId, hackathonId, techStack, experienceLevel} = body;
    
    const hackathon = await hackathonDao.getHackathon({_id:hackathonId});
    if(!hackathon){
        return {error:"Hackathon with that ID doesn't exist"}
    }
    const participant = await employeeDao.getEmployee({_id:employeeId});
    if(!participant){
        return {error:"Employee with that ID doesn't exist"}
    }

    return await participationDao.createParticipation({
        participant,
        hackathon,
        techStack,
        experienceLevel
    })
}

exports.getAllParticipantsService = async () =>{
    return await participationDao.getAllParticipations();
}

exports.getParticipantsOfHackathonService = async(params) =>{
    return await participationDao.getParticipantsOfHackathon(params)
}

exports.getHackathonsOfEmployeeService = async (params) =>{
    return await participationDao.getHackathonsOfEmployee(params)
}

exports.getHackathonsOfOrganizerService = async (params) =>{
    return await participationDao.getHackathonsOfOrganizer(params)
}