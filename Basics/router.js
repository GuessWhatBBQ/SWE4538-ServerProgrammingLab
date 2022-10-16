const express = require("express");
const router = express.Router();

const { getCV, getCVForm, updateCV } = require("./controllers/CvController");

const fs = require("fs");

router.get("/", getCV);
router.get("/cv", getCVForm);
router.post("/cv", updateCV);

module.exports = router;
