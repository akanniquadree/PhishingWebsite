const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    isAdmin:{
        type:Number,
        default:0
    }
},
{timestamps:true}
)


const UserModel = mongoose.model("Users", userSchema)

module.exports = UserModel