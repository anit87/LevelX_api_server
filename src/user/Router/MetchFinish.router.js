const {saveMatchFinshRouter} = require("../controller/MetchFinish.controller")
const router = require("express").Router();
router.post("/",saveMatchFinshRouter);

module.exports = router;