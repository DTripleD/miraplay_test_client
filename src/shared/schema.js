import Joi from "joi-browser";

export const schema = {
  email: Joi.string().required().empty(false).email(),
  password: Joi.string().min(5).alphanum().required(),
};
