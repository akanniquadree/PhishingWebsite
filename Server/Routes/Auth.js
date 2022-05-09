const express = require("express")
const UserModel = require("../Model/UserModel")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Login = require("../MiddleWares/RequireLogin")
const admin = require("../MiddleWares/Admin")


const authRouter = express.Router()
dotenv.config()


authRouter.post("/register", Login,async(req, res)=>{
    try {
        const {email, password, name, isAdmin} = req.body
        if(!email || !password || !name){
            return res.status(422).json({error:"Please fill all fields"})
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(422).json({error:"Invalid Email"})
        }
        const existEmail = await UserModel.findOne({email:email})
        if(existEmail){
            return res.status(403).json({error:"Email already exist in our record"})
        }
        const salt = await bcrypt.genSalt(13)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new UserModel({
            email,password:hashedPassword, name, isAdmin
        })
        const savedUser = await user.save()
        if(savedUser){
                return res.status(200).json({message: "User has been created successfully"})
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error})
    }
})

authRouter.post("/signin", async(req, res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(422).json({error:"Please fill all fields"})
        }
        const user = await UserModel.findOne({email:email})
        if(!user){
            return res.status(422).json({error:"You have entered a wrong credentials"})
        }
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.status(422).json({error:"You have entered a wrong credentials"})
        } 
        else{
            const tokenHeader = jwt.sign({_id:user._id},process.env.JWT_HEADER,{expiresIn:"3600000"})
            const {password, ...others} = user._doc
            return res.status(200).json({others, tokenHeader})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error})
    }
})

authRouter.get("/user",Login,admin,async(req, res)=>{
    try {
        const user = await UserModel.find().sort("-createdAt")
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})
authRouter.get("/users/:id",async(req, res)=>{
    try {
        const user = await UserModel.findOne({_id:req.params.id})
        if(user){
                res.status(200).json(user)
        }
        return res.status(422).json({error:"Cannot find the user on our database"})
    } catch (error) {
        return res.status(500).json(error)
    }
})


authRouter.put("/user/:id",Login,async(req, res)=>{
    try {
        const user = await UserModel.findOne({_id:req.params.id})
        if(user){
            const updateuser = await user.updateOne({$set:req.body})
            if(updateuser){
                res.status(200).json({message:"user Successfully Updated"})
            }
            return res.status(422).json({error:"Error in updating user"})
        }
        return res.status(422).json({error:"Cannot find the user on our database"})
    } catch (error) {
        return res.status(500).json(error)
    }
})
authRouter.delete("/deleteuser/:postId",Login,async(req, res)=>{
    try {
        const user = await UserModel.findOne({_id:req.params.postId})
        if(user){
            const updateuser = await user.deleteOne()
            if(updateuser){
                res.status(200).json({message:"user Successfully deleted"})
            }
            return res.status(422).json({error:"Error in deleting user"})
        }
        return res.status(422).json({error:"Cannot find the user on our database"})
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = authRouter