const {fileUpload} = require("../controller/fileUpload.controller")
const router = require("express").Router();

router.post("/",fileUpload);


module.exports = router;