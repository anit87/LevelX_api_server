const {createTeam,getTeam,getByID,deleteTeam} = require("../controller/Team.controller")
const router = require("express").Router();
router.post("/",createTeam);
router.get("/",getTeam);
router.get("/:ID",getByID);
router.delete("/:ID",deleteTeam);
module.exports = router;