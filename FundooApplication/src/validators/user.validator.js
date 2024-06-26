import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidatorRegister = (req, res, next) => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName: Joi.string().min(2).required(),
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string()
      .regex(passwordPattern)
      .message(
        'password must be at least 8 characters long and contain at least one special' +
          'character, one uppercase letter, one lowercase letter, and one numeric character'
      )
      .required(),
    ConfirmPassword: Joi.string().valid(Joi.ref('Password')).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const loginUser = (req, res, next) => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const schema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string()
      .regex(passwordPattern)
      .message(
        'password must be at least 8 characters long and contain at least one special' +
          ' character, one uppercase letter, one lowercase letter, and one numeric character'
      )
      .required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const resetPasswordValidator = (req, res, next) => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const schema = Joi.object({
    Password: Joi.string()
      .regex(passwordPattern)
      .message(
        'password must be at least 8 characters long and contain at least one special' +
          ' character, one uppercase letter, one lowercase letter, and one numeric character'
      )
      .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const forgotPassword = async (req, res, next) => {
  const schema = Joi.object({
    Email: Joi.string().email().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
