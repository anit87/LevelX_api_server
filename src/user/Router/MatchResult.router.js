const {saveMatchResultRouter,GetMatchResultrouter,GetSingleMatchResultrouter,DeleteMatchResultRoute,UpdateMatchResultRouter} = require("../controller/MatchResult.controller")
const router = require("express").Router();
router.post("/",saveMatchResultRouter);
router.get("/",GetMatchResultrouter);
router.get("/:ResultId",GetSingleMatchResultrouter);
router.put("/",UpdateMatchResultRouter);
router.delete("/:ResultId",DeleteMatchResultRoute);
module.exports = router;