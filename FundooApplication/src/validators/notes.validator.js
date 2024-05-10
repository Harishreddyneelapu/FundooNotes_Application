import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNotesValidator = (req, res, next) => {
  
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    color: Joi.string().optional(),
    isArchive:Joi.boolean(),
    isTrash: Joi.boolean(),
    createdBy: Joi.string().min(2)

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success:false,
      message:`${error}`
    });
  } else {
    next();
  }
};


