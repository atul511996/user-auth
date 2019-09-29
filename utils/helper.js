let getMessage = (code , message , data)=>{
	let msg = {};
	msg.code = code ;
	msg.status = message;
	if(data)
	msg.data = data;
	return msg;

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




module.exports={
	getMessage,
	validateEmail
}
