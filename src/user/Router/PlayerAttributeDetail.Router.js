const {saveUpdatePlayerAttributeDetailRouter,GetAllPlayerAttributeDetailrouter,GetSinglePlayerAttributeDetailrouter,DeletePlayerAttributeDetailRoute,} = require("../controller/PlayerAttributeDetail.controller")
const router = require("express").Router();
router.post("/",saveUpdatePlayerAttributeDetailRouter);
router.get("/getForUpdate/:ID",GetAllPlayerAttributeDetailrouter);
router.get("/:ID",GetSinglePlayerAttributeDetailrouter);
router.delete("/:ID",DeletePlayerAttributeDetailRoute);
module.exports = router;