const express = require("express");
const hackathonController= require("../controllers/hackathonControlller");

const router=express.Router();

router
    .route("/")
    .get(hackathonController.getAllHackathons)
    .post(hackathonController.createHackathon);

    router
    .route("/:_id")
    .get(hackathonController.getHackathon)
    .patch(hackathonController.updateHackathon)
    .delete(hackathonController.deleteHackathon)


module.exports=router;