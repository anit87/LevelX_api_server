const {GernateToken,verifyToken,Gernate} = require("../Login/Loginuser.controller")
const router = require("express").Router();
router.post("/",GernateToken);
router.put("/",verifyToken);
router.post("/Gernate",Gernate);
//router.delete("/:ID",deleteTeam);
module.exports = router;