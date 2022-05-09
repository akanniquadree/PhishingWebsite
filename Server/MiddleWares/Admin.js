


const admin = (req, res, next) =>{
        if(req.user.isAdmin === 0){
                return res.status(401).json({error:"You are not authorized to perform this action"})
        }
        next()
}

module.exports = admin