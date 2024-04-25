import Joi from '@hapi/joi';

export const newNotesValidator = (req, res, next) => {
  
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    color: Joi.string().optional(),
    isArchive:Joi.boolean(),
    isTrash: Joi.boolean(),
    createdBy: Joi.string().min(2).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};