const reporterModel = require("../models/reporter.model")
const{resGenerator} = require("../helper/methods")
class Reporter{
    static signup = async(req, res)=>{
        try{
            const data = new reporterModel(req.body)
            await data.save()
            resGenerator(res,200,data,"signup")
        }
        catch(e){
            resGenerator(res,500,e.message,"cannot signup")
        }
    }
    static login = async(req, res)=>{
        try{
            const reporterData = await reporterModel.login(req.body.email, req.body.password)
            if(!reporterData.status) return resGenerator(res, 500, {otp: reporterData.otp}, "activate first")
            const token = await reporterData.generateToken()
            resGenerator(res, 200, {user:reporterData, token}, "registered")
        }
        catch(e){
            resGenerator(res, 500, e.message, "cannot login")
        }
    }
    static profile = async(req, res)=>{
        try{
            const reporter = await reporterModel.findById(req.params.id)
            if(!reporter) throw new Error("reporter not found")
            resGenerator(res, 200, reporter, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")
        }

    } 
  
   
   
    static me = async(req,res)=>{
        resGenerator(res, 200, req.reporter, "Please Authorization'")
    } 
      
    static edit = async(req, res)=>{
        try{
            const edit = ["name", "age"]
            const bodyKeys = Object.keys(req.body)
            const isMatched = bodyKeys.every(key=> edit.includes(key))
            if(!isMatched ) throw new Error("invalid updates")
            bodyKeys.forEach(k=> req.reporter[k]=req.body[k])
            await req.reporter.save()
            resGenerator(res, 200, req.reporter, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error on update")

        }

    }
    
    static sendOtp = async(req,res)=>{
        try{        
            const otp = await reporterModel.sendOtp(req.body.email)
            resGenerator(res,200, otp, "Otp Generate")
        }
        catch(e){
            resGenerator(res,500, e.message, "err")

        }
    }
    static all = async(req, res)=>{
        try{
            const all = await reporterModel.find().sort({name:1})
            resGenerator(res, 200, all, "data fetched")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")
        }
    }   
    static logout = async(req, res)=>{
        try{
            req.reporter.tokens = req.reporter.tokens.filter(t=> t.token!=req.token)
            await req.reporter.save()
            resGenerator(res, 200, reporterData, "updated")
        }
        catch(e){
            resGenerator(res, 500, e.message, "error")

        }
    }
}
module.exports=Reporter