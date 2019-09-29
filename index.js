const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const fileUpload = require('express-fileupload');

const app = express();
const port = 8007

const user = require("./route/user")
const auth = require("./auth/auth")
const home = require("./route/home")
const db = require("./database/db")
app.use(fileUpload());
app.use(cors())
app.use(body_parser())

app.use("/user" , user)

app.use("/api" , auth)

app.use("/api/home" , home)

app.listen(port , ()=>{
})
