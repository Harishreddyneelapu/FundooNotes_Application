import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
  
  const schema = Joi.object({
    titleDescription: Joi.string().min(2).required(),
    color: Joi.string().min(2).required(),
    isArchive:Joi.string().min(2).required(),
    isTrash: Joi.string().min(2).required(),
    createdBy: Joi.string().min(2).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};