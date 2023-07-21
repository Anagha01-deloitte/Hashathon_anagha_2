const hackathonDao = require ("../dao/hackathonDAO");

exports.getAllHackathonsService = async (body) =>{
   return await hackathonDao.getAllHackathons(body);
}

exports.createHackathonService = async (body) =>{
    return await hackathonDao.createHackathon(body);
 }

 exports.updateHackathonService = async (params, body) =>{
   return await hackathonDao.updateHackathon(params, body);
}

exports.getHackathonService = async (params) =>{
   return await hackathonDao.getHackathon(params);
   
}

exports.deleteHackathonService = async (params) =>{
   return await hackathonDao.deleteHackathon(params);
}