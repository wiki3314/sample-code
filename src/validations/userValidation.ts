import Joi from "@hapi/joi";
import { Request } from "express";
const register = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  gender: Joi.string(),
  phoneNumber: Joi.string(),
  birthdate: Joi.number(),
  username: Joi.string(),
  title: Joi.string(),
  picture: Joi.string(),
  location: Joi.object().keys({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    postcode: Joi.string(),
  }),
});

const login = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

class Validation {
  constructor() {}
  register = async (req: Request) => {
    try {
      const value = await register.validateAsync(req.body);
      return { err: null, value };
    } catch (err) {
      return { err, value: null };
    }
  };
  login = async (req: Request) => {
    try {
      const value = await login.validateAsync(req.body);
      return { err: null, value };
    } catch (err) {
      return { err, value: null };
    }
  };
}

export default Validation;
