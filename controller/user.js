const user = require("../model/user")
const helper = require("../utils/helper")
const jwt = require("../utils/jwt")

let signUp = async(req, res)=>{
	try{
	if(!req.body.email || !req.body.password || !req.body.name){
		 res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
		 return;
	}
		if(!helper.validateEmail(req.body.email)){
			res.status(403).send(helper.getMessage(403, `Invalid email :${req.body.email}`))
			return;
		}
		let is_email_exist = await user.isEmailExist(req.body.email)
		if(is_email_exist > 0){
			res.status(409).send(helper.getMessage(409 , ` Email "${req.body.email}" already registered!!`))
			return;
		}
		let result = await user.signUp(req.body.email , req.body.password , req.body.name)
		res.status(200).json(helper.getMessage(200, "Success", result))
	}catch(err){
		res.status(500).send(helper.getMessage(500, err))
	}
}


let login = async(req, res)=>{
	try{
		if(!req.body.email || !req.body.password){
			res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
			return;
	   }
	   if(!helper.validateEmail(req.body.email)){
			res.status(403).send(helper.getMessage(403, `Invalid email :${req.body.email}`))
			return;
		}
			let getUserInfo = await user.getUserInfo(req.body.email)
		if(getUserInfo.length == 0){
			res.status(401).send(helper.getMessage(401 , `Email "${req.body.email}" not registered!!` ))
			return;
		}
		if(getUserInfo[0].password !=req.body.password){
			res.status(403).send(helper.getMessage(403, `Password  not matched!!!`))
			return;
		}
		let token = jwt.generateToken(getUserInfo[0].user_id)
		let jwt_token = {}
		jwt_token.token = token
			res.status(200).json(helper.getMessage(200, "Success" , jwt_token))
	}catch(err){
		res.status(500).send(helper.getMessage(500, err))	
	}
}
module.exports = {
	signUp,
	login
}
