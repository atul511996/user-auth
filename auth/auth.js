const jwt = require("jsonwebtoken")
const jwt_key = 'dating_app'
const helper = require("../utils/helper")
const jwt_verify = require("../utils/jwt")


module.exports = (req , res , next)=>{
    try{
        let token ;
        if(req.headers['x-access-token']){
            token = req.headers['x-access-token']
            let token_info = jwt_verify.verifyToken(token)
            req.user = token_info.data 
            next()
        }else{
            res.status(401).json(helper.getMessage(401, "Invalid Token"))
        }
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}