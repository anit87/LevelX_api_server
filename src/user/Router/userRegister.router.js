const {createUser,getUser,getByID,deleteUser} = require("../controller/userRegister.controller")

const router = require("express").Router();
router.post("/",createUser);
router.get("/:ID",getByID);
router.get("/",getUser);
router.delete("/:ID",deleteUser);
module.exports = router;