const {createUser,getUser,getByID,deleteUser} = require("../controller/userRegister.controller")
const router = require("express").Router();
router.post("/",createUser);
router.get("/",getUser);
router.get("/:ID",getByID);
router.delete("/:ID",deleteUser);
module.exports = router;