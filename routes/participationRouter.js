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
   

module.exports=router;