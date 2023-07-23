const express = require("express");
const participationController= require("../controllers/participationController");

const router=express.Router();

router
    .route("/")
    .get(participationController.getAllParticipants)
    .post(participationController.createParticipation);

    router
    .route("/hackathon/:hackathonId")
    .get(participationController.getParticipantsOfHackathon)

    router
    .route("/employee/:employeeId")
    .get(participationController.getHackathonsOfEmployee)
   

module.exports=router;