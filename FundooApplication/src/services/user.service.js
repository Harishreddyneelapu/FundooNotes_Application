import User from '../models/user.model';
import bcrypt from 'bcrypt'



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