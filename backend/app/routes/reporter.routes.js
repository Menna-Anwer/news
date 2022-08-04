const router = require("express").Router()
const reporter = require("../controller/reporter.controller")
const auth= require("../middleware/auth")
router.post("/signup", reporter.signup)
router.post("/login", reporter.login)
router.get("/profile",reporter.profile)
router.get("/me", auth, reporter.me)
router.patch("/update", auth, reporter.update)
router.get("/all",reporter.all)
router.post("/logout", auth, reporter.logout)

module.exports=router