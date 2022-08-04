const router = require("express").Router()
const news= require("../controller/news.controller")
const auth = require("../middleware/auth")
router.post("/addnews", auth, news.add)
router.get("/shownews", auth, news.shownews)
router.get("/single", auth, news.single)
router.delete("/delete", auth, news.delete)
router.post("/update/:id", auth, news.update)

module.exports=router