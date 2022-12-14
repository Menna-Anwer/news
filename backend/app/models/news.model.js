const  mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    addedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reporter"
    }
})
const News = mongoose.model("News",newsSchema)
module.exports = News