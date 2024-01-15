const {createMessage,getAll,getByID,deleteID} = require("../controller/matchChatting.controller")
const router = require("express").Router();
router.post("/",createMessage);
//router.get("/ChatID/:UserID/:ID",getAll);
router.get("/:ID",getByID);
router.delete("/:ID",deleteID);
module.exports = router;