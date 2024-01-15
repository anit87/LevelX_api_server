const {searchFriends} = require("../controller/searchFriend.controller")
const router = require("express").Router();

router.post("/",searchFriends);
//router.get("/",searchFriends);
module.exports = router;