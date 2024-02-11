import express from "express";
import {refreshServer  } from "../controller/userContoller";
  

const Router = express.Router()

Router.route("/refreshServer").get(refreshServer)
 
 

export default Router