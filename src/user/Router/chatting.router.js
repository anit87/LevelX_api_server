const {createMessage,getAll,getByID,deletePlayer} = require("../controller/chatting.controller")
const router = require("express").Router();
router.post("/",createMessage);
router.get("/ChatID/:UserID/:ID",getAll);
router.get("/:ID",getByID);
router.delete("/:ID",deletePlayer);
module.exports = router;