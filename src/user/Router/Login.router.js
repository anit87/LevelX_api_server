const {GernateToken,verifyToken} = require("../Login/Loginuser.controller")
const router = require("express").Router();
router.post("/",GernateToken);
router.put("/",verifyToken);
//router.get("/:ID",getByID);
//router.delete("/:ID",deleteTeam);
module.exports = router;