import User from '../models/user.model';
import bcrypt from 'bcrypt'


//create new user registration
export const newUserRegister = async (body) => {
  let res =await User.findOne({Email:body.Email}).then()
  if(res!==null){
    throw new Error('email already exist')
  }
  body.Password=await bcrypt.hash(body.Password,10);
  body.ConfirmPassword = await bcrypt.hash(body.ConfirmPassword,10);
  const data = await User.create(body);
  return data;
};

// service for login
export const userLogin = async(body)=>{
  let userObj = await User.findOne({Email:body.Email}).then()
  if(userObj===null){
    throw new Error('Invalid Email')
  }
  const result = await bcrypt.compare(body.Password,userObj.Password);
  if(result){
    return userObj;
  }else{
    throw new Error('Invalid password')
  }
};