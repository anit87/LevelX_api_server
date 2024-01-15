const {saveUpdateMatchRouter,GetMatchrouter,GetSingleMatchrouter,DeleteMatchRoute,GetSingleFormMatchrouter} = require("../controller/Match.controller")
const router = require("express").Router();
router.post("/",saveUpdateMatchRouter);
router.get("/",GetMatchrouter);
router.get("/:MatchId",GetSingleMatchrouter);
router.get("/Updatematchform/:MatchId",GetSingleFormMatchrouter);
router.delete("/:MatchId",DeleteMatchRoute);
module.exports = router;