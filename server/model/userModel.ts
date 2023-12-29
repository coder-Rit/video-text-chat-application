const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require("validator")


import mongoose, { Document, Schema } from 'mongoose';

interface User {
  userName: string;
  firstName: string;
  lastName?: string;
  email?: string;
  password?: string;
  profileImageURL?: string;
  token:string;

  comparePassword(password: string): Promise<boolean>;
  getJWTtoken(): string;
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  profileImageURL: { type: String },
});


// converting password into hash
userSchema.pre('save', async function (this: UserDocument, next) {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


// compairing password
userSchema.methods.comparePassword = async function (password:string) {

  console.log(this);
  
    
    return await bcrypt.compare(password, this.password);
  };

//josn web token genrator
userSchema.methods.getJWTtoken =  function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECREATE as string, {
        expiresIn: process.env.JWT_EXPIRE as string
    })
}



const UserModel = mongoose.model<UserDocument>('User', userSchema);

export { User, UserModel, UserDocument };

