const jwt = require( "jsonwebtoken")
const UserModel = require( "../Model/UserModel.js")
const dotenv = require( "dotenv")

dotenv.config()


const Login = async (req, res, next) =>{
    try {
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({error:"You are not authorized to carry out this operation, Please Log In "})
        }
        const token = authorization.replace("Bearer ", "")
        if(!token){
            return res.status(401).json({error:"You are not authorized to carry out this operation, Please Log In again, Session destroyed"})
        }
        jwt.verify(token, process.env.JWT_HEADER, (err, payload)=>{
        if(err){
            return res.status(401).json({error:"You are not authorized to carry out this operation, Please Log In again, Session destroyed"})
        }
        const {_id} = payload
         UserModel.findById(_id).then(result=>{
            req.user = result
            next()
        })
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
    
}

module.exports = Login