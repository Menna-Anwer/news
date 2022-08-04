require("dotenv").config()
require("./app/db/connect")
const express =require ("express")
const cors = require("cors")
const formData = require("express-form-data");

const reporterRoutes = require("./app/routes/reporter.routes")
const newsRoutes = require("./app/routes/news.routes")
const helper = require("./app/helper/methods")

const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/reporter",reporterRoutes)
app.use("/api/news",newsRoutes)

app.all("*",(req,res)=>{
    helper.resGenerator(res, 404, "Invalid url", "not found")
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`we are one http://localhost:${PORT}`))