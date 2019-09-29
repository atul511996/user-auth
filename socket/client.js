const io = require('socket.io-client')
const ioClient = io.connect('http://localhost:8001' , {rejectUnauthorized : false})

ioClient.on("7", (data)=>{
    console.log(data)
})