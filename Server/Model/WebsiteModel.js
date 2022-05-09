const mongoose = require("mongoose")

const websiteSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
    },
    url:{
        type:String,
        required:true,
        unique:true
    },
},
{timestamps:true}
)


const WebsiteModel = mongoose.model("Website", websiteSchema)

module.exports = WebsiteModel