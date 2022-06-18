const express = require("express");
const router = express.Router();
const tutorialsControllers = require("../controllers/tutoriaslController");

// @route GET && POST - /posts/
router.route("/")
    .get(tutorialsControllers.getAllTut)
    .post(tutorialsControllers.createNewTut);

router.route("/:id").get(tutorialsControllers.getTutById);

module.exports = router;
