import { NextFunction } from "express";
import { counterModel } from "../model/pageCountModel";
import { Request, Response } from 'express';
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
 


// signUp
export const getSetpageCount = catchAsyncErorr(async (req:Request, res:Response, next:NextFunction) => {  
    let lastCount = await counterModel.findOne({})
    let newCount  = 1;
      if (lastCount) {
        await counterModel.findByIdAndUpdate(lastCount._id, { count: lastCount.count + 1 })
         
        newCount =lastCount.count + 1
      } else {
        await counterModel.create({ count: 1 })
      }


      res.status(200).json({
        count: newCount

      })

});  