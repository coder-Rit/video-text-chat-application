import { NextFunction } from "express";

const catchAsyncErorr = require("../middleware/catchAsyncErorr");
 


// signUp
export const refreshServer = catchAsyncErorr(async (req:Request, res:Response, next:NextFunction) => {  
   console.log();
});  