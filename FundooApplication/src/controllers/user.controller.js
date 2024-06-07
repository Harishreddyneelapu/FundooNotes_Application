import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';

export const newUserRegister = async (req, res) => {
  try {
    const data = await UserService.newUserRegister(req.body);
    const { FirstName, LastName, Email } = data;

    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      success: true,
      message: 'User created successfully',
      data: {
        FirstName,
        LastName,
        Email
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    const { _id, FirstName, LastName, Email } = data;
    const token = jwt.sign({ Email: data.Email }, process.env.SECRET_KEY, {
      expiresIn: '2h'
    });
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'User Found in our dataBase',
      data: {
        _id,
        FirstName,
        LastName,
        Email,
        token
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Link for the reset password is send through the email',
      data: data
    });
  } catch (error) {
    if (error.message === 'User not exist in database') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        code: HttpStatus.BAD_REQUEST,
        message: `User not found`
      });
    }
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await UserService.resetPassword(
      res.locals.user._id,
      res.locals.user.Email,
      req.body
    );
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Password updated successfully in the database'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};
