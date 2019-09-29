const express = require("express")
const router = express.Router()
const home = require("../controller/home")

router.post("/uploadImage" , home.uploadImage)

router.post("/blockUser" , home.blockUser)

router.post("/unblockUser" , home.unblockUser)


router.post("/likeUnlike" , home.likeUnlike)

router.post("/superLikeUnlike" , home.superLikeUnlike)

router.get("/getHomePage" , home.getHomePage)






module.exports = router
