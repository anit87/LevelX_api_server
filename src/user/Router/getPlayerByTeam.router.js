const {searchPlayers} = require("../controller/getPlayerByTeam.controller")
const router = require("express").Router();

router.post("/",searchPlayers);

module.exports = router;