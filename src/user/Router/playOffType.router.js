
const {playOffType} = require("../controller/playOffType.controller")
const router = require("express").Router();

router.get("/",playOffType);


module.exports = router;