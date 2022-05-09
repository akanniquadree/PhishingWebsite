const express = require("express")
const Login  = require("../MiddleWares/RequireLogin")
const WebsiteModel = require("../Model/WebsiteModel")


const websiteRouter = express.Router()

//Create Website
websiteRouter.post("/create", Login , async(req, res)=>{
    try {
        const {name, url} = req.body
        if(!name || !url){
            return res.status(422).json({error:"Please fill all fields"})
        }
        if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url)){
           return res.status(422).json({error:"Make sure your url start with www. and end with .com"})
       }
        const existUrl= await WebsiteModel.findOne({url:url})
        if(existUrl){
            return res.status(422).json({error:"Url already Created"})
        }
        const website = new WebsiteModel(req.body)
        const savedWebsite = await website.save()
        if(savedWebsite){
            res.status(200).json({message:"Website Successfully added"})
        }
        return res.status(422).json({error:"Error in Creating Website"})
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Update website
websiteRouter.put("/update/:id", Login ,async(req, res)=>{
    const {url, name} = req.body
    try {
       if(!req.body){ return res.status(422).json({error:"Please Fill all fields"})}
       if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url)){
           return res.status(422).json({error:"Make sure your url start with www. and end with .com"})
       }
        const website = await WebsiteModel.findById(req.params.id)
        if(website){
            const updateWebsite = await website.updateOne({$set:req.body})
            if(updateWebsite){
                res.status(200).json({message:"Website Successfully Updated"})
            }
            return res.status(422).json({error:"Error in Updating Website"})
        }
        return res.status(422).json({error:"Cannot find the website on our database"})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

//delete website
websiteRouter.delete("/delete/:postId",Login, async(req, res)=>{
    try {
        const website = await WebsiteModel.findOne({_id:req.params.postId})
        if(website){
            const updateWebsite = await website.deleteOne()
            if(updateWebsite){
                res.status(200).json({message:"Website Successfully deleted"})
            }
            return res.status(422).json({error:"Error in deleting Website"})
        }
        return res.status(422).json({error:"Cannot find the website on our database"})
    } catch (error) {
        return res.status(500).json(error)
    }
})


//get all website
websiteRouter.get("/website", async(req, res)=>{
    try {
        const website = await WebsiteModel.find().sort("-createdAt")
        res.status(200).json(website)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//get single website
websiteRouter.get("/website/:id", async(req, res)=>{
    try {
        const website = await WebsiteModel.findById(req.params.id)
        res.status(200).json(website)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Search for website
websiteRouter.post("/search",async (req, res)=>{
    try {
        const {url} = req.body
        if(!url){return res.status(422).json({error:"Please fill all fields"})}
        if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url)){
           return res.status(422).json({error:"Make sure your url start with www. and end with .com"})
       }
        const website = await WebsiteModel.findOne({url:url})
        if(website){
                res.status(200).json({website,message:"Website found", messagetwo:"This is not a Phishing Website"})
        }
        return res.status(404).json({error:"Ooops no record found"})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})
module.exports = websiteRouter