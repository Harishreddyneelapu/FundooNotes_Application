import User from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from '../utils/user.util';

//create new user registration
export const newUserRegister = async (body) => {
  let res =await User.findOne({Email:body.Email})
  if(res!==null){
    throw new Error('email already exist')
  }
const hashedPassword = await new Promise((resolve, reject)=>{
  bcrypt.hash(body.Password,10,(err, hashedPassword)=>{
    if(err){
      reject(err)
    }
    resolve(hashedPassword);
  })
})

body.Password = hashedPassword


delete body.ConfirmPassword;
  
  const data = await User.create(body);
  return data;
};

// service for login
export const userLogin = async(body)=>{
  let userObj = await User.findOne({Email:body.Email})
  if(userObj===null){
    throw new Error('Invalid Email')
  }
   const result = await new Promise((resolve, reject) => {
      bcrypt.compare(body.Password, userObj.Password, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  if(result){
    return userObj;
  }else{
    throw new Error('Invalid password')
  }
};


export const forgotPassword = async (body)=>{
  const userObj = await User.findOne({Email:body.Email})
  if(userObj === null){
    throw new Error('user not exist in database')
  }

  const token = jwt.sign({_id:userObj._id,Email:userObj.Email}, process.env.SECRET_KEY, { expiresIn: '1h' });
  sendEmail({
    from: process.env.EMAIL,
    to:userObj.Email,
    subject:"Reset Password",
    text:"http://localhost:3000/api/users/forgetPassword"
  });
  return token;
}


