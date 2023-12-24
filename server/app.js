const express = require('express')
const error = require('./middleware/error')
const connectTODatabase = require('./config/dataBase')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors  = require("cors")
const app = express()


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
  }

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

 

//connection to the data base 
connectTODatabase()


const userRouter = require('./router/userRouter') 
 

app.use("/api/v1", userRouter)
 

 
 
 
 app.use(error)
module.exports = app
