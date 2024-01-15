
const {getPlayerAttribute} = require("../controller/getPlayerAttribute.controller")
const router = require("express").Router();
//router.get("/",getPlayerAttribute);
router.get("/:playerID_1/:playerID_2",getPlayerAttribute);
module.exports = router;