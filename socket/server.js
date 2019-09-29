const io = require("socket.io")
const server = io.listen(8001)


server.on("connection",async function(socket){
    console.log(`client connected [id = ${socket.id}]`)
    socket.join("dating-app")

    // the connected user will listen to his/her own user_id
    socket.on("pictureLike" , (data)=>{
       socket.in("dating-app").emit(data.payload.owner_id , (data))
     })


    socket.on("disconnect", ()=>{
        console.log(`client gone [id = ${socket.id}]`)
    })


})