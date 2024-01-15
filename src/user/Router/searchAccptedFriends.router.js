const {searchFriends} = require("../controller/searchAcceptedFriends.controller")
const router = require("express").Router();

router.post("/",searchFriends);

module.exports = router;