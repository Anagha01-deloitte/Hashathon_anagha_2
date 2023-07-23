const participationService = require("../service/participationService");

exports.getAllParticipants = async (req,res) =>{

    const result = await participationService.getAllParticipantsService();

    if(result.error){
        return res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    return res.status(200).json({
        status:"Success",
        data:result
    })
    
}

exports.createParticipation = async (req,res) =>{

    const result = await participationService.createParticipationService(req.body);

    if(result.error){
        return res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    return res.status(200).json({
        status:"Success",
        data:result
    })
    
}

exports.getParticipantsOfHackathon = async (req,res) =>{
    const result = await participationService.getParticipantsOfHackathonService(req.params);

    if(result.error){
        return res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    return res.status(200).json({
        status:"Success",
        data:result
    })
} 

exports.getHackathonsOfEmployee = async (req,res) =>{
    const result = await participationService.getHackathonsOfEmployeeService(req.params);

    if(result.error){
        return res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    return res.status(200).json({
        status:"Success",
        data:result
    })
}

exports.getHackathonsOfOrganizer = async (req,res) =>{
    const result = await participationService.getHackathonsOfOrganizerService(req.params);

    if(result.error){
        return res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    return res.status(200).json({
        status:"Success",
        data:result
    })
}
