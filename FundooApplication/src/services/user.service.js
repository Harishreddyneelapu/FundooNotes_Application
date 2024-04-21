import User from '../models/user.model';



//create new user registration
export const newUserRegister = async (body) => {
  let res =await User.findOne({Email:body.Email}).then()
  if(res!==null){
    throw new Error('email already exist')
  }
  
  const data = await User.create(body);
  return data;
};

