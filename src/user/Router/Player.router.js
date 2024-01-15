const {createPlayer,getPlayer,getByID,deletePlayer} = require("../controller/Player.controller")
const router = require("express").Router();
router.post("/",createPlayer);
router.get("/",getPlayer);
router.get("/:ID",getByID);
router.delete("/:ID",deletePlayer);
module.exports = router;