const db = require("../database/db")
const io = require('socket.io-client')
const ioClient = io.connect('http://localhost:8001' , {rejectUnauthorized : false})

let isBlocked = async(user_id , second_user_id)=>{
	try{
   let checkEmail = await db.exe_qry(`select user_id  from blocked_user where user_id = ${user_id} and second_user_id = ${second_user_id} and status = 1`)
   		return checkEmail.length;
	}catch(err){
		return 1;
	}
}

let isUnBlocked = async(user_id , second_user_id)=>{
	try{
   let checkEmail = await db.exe_qry(`select user_id  from blocked_user where user_id = ${user_id} and second_user_id = ${second_user_id} and status = 0`)
   		return checkEmail.length;
	}catch(err){
		return 1;
	}
}

let isUserExist = async(second_user_id)=>{
	try{
        let checkEmail = await db.exe_qry(`select user_id  from users where user_id = ${second_user_id} `)
   		return checkEmail.length;
	}catch(err){
		return 1;
	}
}


let blockUser = async(user_id , second_user_id)=>{
    try{
        let insertBlockedUser = await db.exe_qry(`insert into blocked_user(user_id , second_user_id , status ) values(${user_id} , ${second_user_id} , 1)`)
        return "Success"
    }catch(err){
        return err;
    }
}

let unblockUser = async(user_id , second_user_id)=>{
    try{
        let insertBlockedUser = await db.exe_qry(`update  blocked_user set status = 0  where  user_id = ${user_id}  and second_user_id = ${second_user_id}`)
        return "Success"
    }catch(err){
        return err;
    }
}
let insertPicture = async(user_id , url)=>{
    try{
        let insertPic = await db.exe_qry(`insert into images (user_id , image , status) values(${user_id} , '${url.file}' , 1)`)
        return "Success"
    }catch(err){
        return err;
    }
}


let isImageExist = async(image_id)=>{
    try{
        let checkImage = await db.exe_qry(`select * from images where image_id = '${image_id}' and status = 1`)
        return checkImage.length
    }catch(err){
        return 0
    }
}
//to emit by socket

let sendSocketNotification = async(type , user_id , image_id)=>{
    try{

        let selLiker = await db.exe_qry(`select * from users where user_id = '${user_id}'`)
        let getOwner = await db.exe_qry(`select user_id,image  from images where image_id = '${image_id}'`)
        let likeObj = {}
        likeObj.type = 'like'
        let payload = {}
        payload.user_name = selLiker[0].name 
        payload.owner_id = getOwner[0].user_id
        if(type == 'superlike')
        payload.picture = selLiker[0].image 


        likeObj.payload = payload 
        ioClient.emit("pictureLike" , (likeObj))

    }catch(err){
        console.log(err)
    }

}

let likeUnlikeImage = async(user_id , image_id , type )=>{
    try{
        let selLiker =await db.exe_qry(`select * from likes where image_id = ${image_id} and user_id = ${user_id}`)
        if(selLiker.length > 0){
            let status = 1;
            if(selLiker[0].status == 0)
            status = 1
            else
            status =0 
            let updateLike = await db.exe_qry(`update likes set status = ${status},type ='${type}' where image_id = ${image_id} and user_id = ${user_id}`)
        }else{
            sendSocketNotification(type , user_id , image_id)
            let insertLike = db.exe_qry(`insert into likes (owner_id , user_id , image_id , status ,type) values((select user_id from images where image_id = '${image_id}' limit 1),${user_id}, ${image_id} , 1 , '${type}')`)
        }
    }catch(err){

    }
}

let getHomePage = async(user_id)=>{
    try{
        let homePageArr = []
        let getAllPosts = await db.exe_qry(`select *,(select count(*) from likes where image_id = images.image_id and status = 1) like_cnt,(select count(*) from likes where image_id = images.image_id and user_id = ${user_id} and status = 1) is_personal_like from images left join users on images.user_id = users.user_id where images.status = 1 and users.status = 1 order by images.created_at desc`)
        for(data of getAllPosts){
            let checkIsBlock = await db.exe_qry(`select * from blocked_user where user_id = '${user_id}' and second_user_id = ${data.user_id} and status = 1`)
            if(checkIsBlock.length == 0){
            homePageArr.push(data)
            }
        }
            return homePageArr 
    }catch(err){
        return err;
    }
}
module.exports ={
    isBlocked,
    isUserExist,
    blockUser,
    isUnBlocked,
    unblockUser,
    insertPicture,
    isImageExist,
    likeUnlikeImage,
    getHomePage
}