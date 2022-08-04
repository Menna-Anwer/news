const  mongoose = require("mongoose");
const validator = require("validator")
const bcryptjs= require("bcryptjs")
const otpGenerator = require('otp-generator')
const jwt = require("jsonwebtoken")

const reporterSchema = mongoose.Schema({
    name:{  
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:24,
    },
    email:{   
        type:String,
        trim:true,
        required:true,
        unique:true,
      /*  validate(value){
            if(!validator.isEmail(value)) {
              throw new Error("Email is invalid")
            }  
           }*/ 
        },
    password:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true,
        length:11,
       /* validate(value){
            var reg = new RegExp("^(01)[0-2,5]{1}[0-9]{8}$")
            if(!reg.test(value)){
                throw new Error('invalid phone number .. ')
            }
        }*/
    },
    type:{
        type:String,
        enum:["admin", "user"],
        default:"user"
    },
    otp:{
        type:String,
        trim:true,
        default: otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets:false 
        })
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    avatar:{
        type:Buffer
    }
})
reporterSchema.methods.toJSON= function(){
    const deleted =["password","tokens",__v]
    const data = this.toObject()
    deleted.forEach(d=> delete data[d])
    return data
}

reporterSchema.pre("save", async function(){
    if(this.isModified("password"))
        this.password = await bcryptjs.hash(this.password, 123)
})


reporterSchema .statics.login = async(email, password)=>{
    const reporter = await Reporter.findOne({email})
    if(!reporter) throw new Error("invalid email")
    const isMatched = await bcrypt.compare(password,reporter.password)
    if(!isMatched) throw new Error("invalid password")
    return reporter
}

reporterSchema.methods.generateToken = async function(){
    const reporter = this 
    const token = jwt.sign({_id: reporter._id}, process.env.JWT_SECRET)
    reporter.tokens = reporter.tokens.concat({token})
    await reporter.save()
    return token
}

reporterSchema.statics.sendOTP = async(email)=>{
    const reporter = await Reporter.findOne({email})
    if(!reporter) throw new Error("invalid email")
    reporter.otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets:false 
    })
    await reporter.save()
    return reporter.otp
}


const Reporter = mongoose.model("Reporter",reporterSchema)
module.exports = Reporter

