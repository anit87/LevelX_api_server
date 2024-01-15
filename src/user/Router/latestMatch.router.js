const {getLatestMatch} = require("../controller/latestMatch.controller")
const router = require("express").Router();

router.get("/",getLatestMatch);

module.exports = router;