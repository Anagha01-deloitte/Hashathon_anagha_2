const express = require("express");
const participationController= require("../controllers/participationController");

const router=express.Router();

router
    .route("/")
    .get(participationController.getAllParticipants)
    .post(participationController.createParticipation);

    router
    // .route("/:_id")
    // .get(hackathonController.getHackathon)
    // .patch(hackathonController.updateHackathon)
    // .delete(hackathonController.deleteHackathon)


module.exports=router;