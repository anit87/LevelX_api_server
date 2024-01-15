const {getFriends} = require("../controller/allFriends.controller")
const router = require("express").Router();

router.get("/:ID",getFriends);
module.exports = router;