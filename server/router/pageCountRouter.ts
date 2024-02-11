import express from "express";
import {getSetpageCount  } from "../controller/pageCountController";
  

const Router = express.Router()

Router.route("/pagedViewed").get(getSetpageCount)
 
 

export default Router