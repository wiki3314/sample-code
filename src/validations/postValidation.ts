import Joi from "@hapi/joi";
import { Request } from "express";
const updatePost = Joi.object({
  id: Joi.number().required(),
  title: Joi.string(),
  extract: Joi.string(),
});

class Validation {
  constructor() {}
  updatePost = async (req: Request) => {
    try {
      const value = await updatePost.validateAsync(req.body);
      return { err: null, value };
    } catch (err) {
      return { err, value: null };
    }
  };
}

export default Validation;
