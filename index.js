const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const app = express();
const port = 8007

const user = require("./route/user")
const auth = require("./auth/auth")

const db = require("./database/db")

app.use(cors())
app.use(body_parser())

app.use("/user" , user)

app.use("/api" , auth)

app.listen(port , ()=>{
})
