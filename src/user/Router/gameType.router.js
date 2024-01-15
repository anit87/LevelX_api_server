const {gameType} = require("../controller/gameType.controller")
const router = require("express").Router();

router.get("/",gameType);

module.exports = router;