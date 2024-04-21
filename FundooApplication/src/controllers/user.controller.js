import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const newUserRegister = async (req, res, next) => {
  try {
    const data = await UserService.newUserRegister(req.body);
    const{FirstName,LastName,Email}=data;
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: {
        FirstName,
        LastName,
        Email
      },
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

