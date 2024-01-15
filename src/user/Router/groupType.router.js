const {groupType} = require("../controller/groupType.controller")
const router = require("express").Router();

router.get("/",groupType);

module.exports = router;