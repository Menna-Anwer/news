const{resGenerator} = require("../helper/methods")
const reporter = require("../models/reporter.model")
const jwt = require("jsonwebtoken")

const auth = async(req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await reporter.findOne({_id: decoded._id, "tokens.token": token})
        if(!user) throw new Error("user not found")
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        resGenerator(res, 500, e.message, 'Please Authorization')
    }
}
module.exports = auth