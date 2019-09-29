const db = require("../database/db")

let isEmailExist = async(email)=>{
	try{
   let checkEmail = await db.exe_qry(`select user_id from users where email = '${email}'`)
   		return checkEmail.length;
	}catch(err){
		return 1;
	}
}

let signUp = async(email , password , name )=>{
	try{
  	let insertUser = await db.exe_qry(`insert into users(email , name , password , status ) values('${email}' , '${name}' , '${password}' , 1)`)
		return "";
	}catch(err){
		return err;
	}
	
}

let getUserInfo = async(email)=>{
	try{
		let checkEmail = await db.exe_qry(`select user_id , email , password from users where email = '${email}'`)
		return checkEmail;
	}catch(err){
		return err;
	}
}


module.exports={
	signUp,
	isEmailExist,
	getUserInfo
}
