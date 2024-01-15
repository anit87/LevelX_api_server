const {addFriend} = require("../controller/userFriend.controller")
const router = require("express").Router();

router.post("/",addFriend);

module.exports = router;