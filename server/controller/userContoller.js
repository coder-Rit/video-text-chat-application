const catchAsyncErorr = require("../middleware/catchAsyncErorr");
 
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwt = require("../utils/sendJwt");


// signUp
exports.signUp = catchAsyncErorr(async (req, res, next) => {  
  let a  = req.body
  delete a.OTP
    const newAcc = await userModel.create(a);
    sendJwt(newAcc, res, "Account is crated successfully", 201, req);
  
}); 
// signUp
exports.signUpFaculty = catchAsyncErorr(async (req, res, next) => {  
  let a  = req.body
     const newAcc = await userModel.create(a);

     res.status(201).json({
      status: "Account is crated successfully",
      newUser:newAcc
     });
   
}); 
 
// loged in
exports.login = catchAsyncErorr(async (req, res, next) => {
  // const { email, password } = req.body;
  
  // if (!email || !password) {
  //   return next(
  //     new ErrorHandler("Please enter your email or password", 400)
  //   );
  // } 
  // const user = await userModel.findOne({ email }).select("+password"); 
  // console.log(user);
  // if (!user) {
  //   return next(new ErrorHandler("User does not exist", 400));
  // }
  // const isPasswordMatched = await user.comparePassword(password);

  // if (!isPasswordMatched) {
  //   return next(new ErrorHandler("Wrong Password", 404));
  // }
  // console.log(user); 
 let  user ={
    _id: new ObjectId("64a17f6a046522ec417c8c99"),
    username: 'faculty',
    email: 'faculty@gmail.com',
    role: 'teacher',
    clgShortName: '',
    status: 'unBand',
    settings: { theme: 'light_theme' },
    __v: 0
  }
  sendJwt(user, res, "LogeIn Successfully", 200, req);
});
 
// log out
exports.logOut = catchAsyncErorr((req, res, next) => {
  res
    .clearCookie("token", {
      expire: new Date(Date.now() - 1000),
      httpOnly: true,
    })
    .json({
      msg: "logout successfully",
      logOut:true
    });
});

 