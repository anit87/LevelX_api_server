const {getCountry} = require("../controller/country.controller")
const router = require("express").Router();

router.get("/",getCountry);
//router.get("/:ID",getByID);
//router.delete("/:ID",deleteTeam);
module.exports = router;