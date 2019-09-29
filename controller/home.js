const helper = require("../utils/helper")
const home = require("../model/home")
let uploadImage = async(req, res)=>{
    try{
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }

          //we can prode restriction here how many  images user can upload 

          let picture = req.files.picture;
          picture.mv(`C:/Users/Atul/Desktop/node/dating-app/files/${picture.name}`,async (err) =>{
            if (err)
              return res.status(500).send(err);
        let file = {}
        file.file = `C:/Users/Atul/Desktop/node/dating-app/files/${picture.name}`
        let insert_pic = await home.insertPicture(req.user , file)
            res.status(200).send(helper.getMessage(200, "Success" , file))
          });
        }catch(err){
            res.status(500).send(helper.getMessage(500, err))
        }
}

let blockUser = async(req , res)=>{
    try{
        if(!req.user || !req.body.second_user_id ){
            res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
            return;
        }
        if(req.user == req.body.second_user_id ){
            res.status(403).send(helper.getMessage(403, "You cann;t block your self!!"))
            return;
        }
            let is_user_exist = await home.isUserExist(req.body.second_user_id)
        if(is_user_exist == 0){
            res.status(403).send(helper.getMessage(403, "Invalid User"))
            return;
        }
            let is_blocked = await home.isBlocked(req.user , req.body.second_user_id)
            if(is_blocked >  0){
                res.status(403).send(helper.getMessage(403, "This user has been blocked by you!!"))
                return;
            }
            let block_user = await home.blockUser(req.user , req.body.second_user_id)
        res.status(200).send(helper.getMessage(200, "success" ))
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}



let unblockUser = async(req , res)=>{
    try{
        if(!req.user || !req.body.second_user_id ){
            res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
            return;
        }
        if(req.user == req.body.second_user_id ){
            res.status(403).send(helper.getMessage(403, "You cann't unblock your self!!"))
            return;
        }
            let is_user_exist = await home.isUserExist(req.body.second_user_id)
        if(is_user_exist == 0){
            res.status(403).send(helper.getMessage(403, "Invalid User"))
            return;
        }
            let is_blocked = await home.isUnBlocked(req.user , req.body.second_user_id)
            if(is_blocked >  0){
                res.status(403).send(helper.getMessage(403, "This user has been unblocked by you!!"))
                return;
            }
            let unblock_user = await home.unblockUser(req.user , req.body.second_user_id)
        res.status(200).send(helper.getMessage(200, "success" ))
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}


let likeUnlike = async(req, res)=>{
    try{
        if(!req.user || !req.body.image_id ){
            res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
            return;
        }
        let is_image_exist = await home.isImageExist(req.body.image_id)
        if(is_image_exist == 0){
            res.status(403).send(helper.getMessage(403, "Invalid image"))
            return;
        }
        let like_unlike_image = await home.likeUnlikeImage(req.user , req.body.image_id , 'like')
        res.status(200).send(helper.getMessage(200, "success" ))
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}

let superLikeUnlike = async(req, res)=>{
    try{
        if(!req.user || !req.body.image_id ){
            res.status(403).send(helper.getMessage(403, "Invalid Inputs"))
            return;
        }
        let is_image_exist = await home.isImageExist(req.body.image_id)
        if(is_image_exist == 0){
            res.status(403).send(helper.getMessage(403, "Invalid image"))
            return;
        }
        let like_unlike_image = await home.likeUnlikeImage(req.user , req.body.image_id , 'superlike')
        res.status(200).send(helper.getMessage(200, "success" ))
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}



let getHomePage = async(req,res)=>{
    try{
        let get_home_page = await home.getHomePage(req.user)
        res.status(200).send(helper.getMessage(200, "success"  , get_home_page))  
    }catch(err){
        res.status(500).send(helper.getMessage(500, err))
    }
}
module.exports ={
    uploadImage,
    blockUser,
    unblockUser,
    likeUnlike,
    superLikeUnlike,
    getHomePage
}