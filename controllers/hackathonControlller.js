
const hackathonService = require("../service/hackathonService");

exports.getAllHackathons = async (req,res) =>{

    let result;

    if(req.query){
        result = await hackathonService.hackathonSearchService(req.query);
    }
    else{
        result = await hackathonService.getAllHackathonsService();

    }


    if(result.error){
        res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    res.status(200).json({
        status:"Success",
        data:result
    })
    
}

exports.createHackathon = async (req,res) =>{

    const result = await hackathonService.createHackathonService(req.body);

    if(result.error){
        res.status(400).json({
            status:"Failed",
            error:result.error
        })
    }

    res.status(200).json({
        status:"Success",
        data:result
    })
    
}


exports.updateHackathon = async (req,res) =>{
    const result = await hackathonService.updateHackathonService(req.params, req.body);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Hackathon with that ID doesn't exist"
        })
    }

    if(result.error){
        return res.status(404).json({
            status:"Failed",
            message: result.error
        })
    }
    return res.status(200).json({
        status:"success",
        data: result
    })
}

exports.getHackathon = async (req,res) =>{
    const result = await hackathonService.getHackathonService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Hackathon with that ID doesn't exist"
        })
    }
    return res.status(200).json({
        status:"success",
        data: result
    })
}

exports.deleteHackathon = async (req,res) =>{
    const result = await hackathonService.deleteHackathonService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Hackathon with that ID doesn't exist"
        })
    }
    await hackathonService.deleteHackathonService(req.params);
    return res.status(204).send();
}
