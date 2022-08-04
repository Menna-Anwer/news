const newsModel = require("../models/news.model")
const {resGenerator} = require("../helper/methods")

class News{
    static addnews= async(req, res) =>{
        try{
            const newsdata = new newsModel({...req.body, addedby:req.reporter._id})
            await newsdata.save()
            resGenerator(res,200,newsdata, "message")
        }
        catch(e) {
            resGenerator(res, 500, e.message, "invalid")
        }
    }
    static shownews= async(req, res) =>{  
        try{
            await req.reporter.populate("shownews")
            resGenerator(res,200,newsdata, "message")
        }
        catch(e){
            resGenerator(res, 500, e.message, "invalid")
        }
    } 
    static update = async(req, res) =>{
        try{
            const _id = req.params.id
            const news = await newsModel.findOneAndUpdate({_id,addedby:req.reporter._id},req.body,
                {
                new:true
              })
            if(!news){
               return res.status(500).send('Not found')
            }
            resGenerator(res,200,newsdata, "message")
        }
        catch(e){
            resGenerator(res, 500, e.message, "invalid")
        }

    }


    static single = async(req, res) =>{
        try{
            const newsdata = await newsModel.findById(req.params.id) 
            if(!newsdata) throw new Error("post not found")
            resGenerator(res,200, newsdata , "message")
           
        }
        catch(e){
            resGenerator(res, 500, e.message, "invalid")
        }
    } 
    
    static delete = async(req, res) =>{
        try{
            const newsdata = await newsModel.findOneAndDelete({
                _id:req.params.id, addedby: req.reporter._id })
            if(!postData) throw new Error("invalid post data")
            resGenerator(res,200, newsdata , "message")
        }
        catch(e){
            resGenerator(res, 500, e.message, "invalid")
        }
    } 
}
module.exports=News