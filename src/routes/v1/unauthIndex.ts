import express, { Request, Response } from "express";
import userController from "../../controllers/userController";
import Validation from "../../validations/userValidation";
const validation = new Validation();

const login = async (req: Request, res: Response) => {
  const { err, value } = await validation.login(req);
  if (err) {
    return res.status(400).json({ message: "Invalid parameters", err });
  }
  console.log("login body: ", value);
  const result = await userController.login(value);
  console.log("login result: ", result);

  if (result) {
    return res
      .status(200)
      .json({ success: true, token: result.token, user: result });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "email or password incorrect" });
  }
};

const unAuthV2Router = express.Router();
unAuthV2Router.post("/login", login);

unAuthV2Router.post("/register", async (req: Request, res: Response) => {
  try {
    const { err, value } = await validation.register(req);
    if (err) {
      return res.status(400).json({ message: "Invalid parameters", err });
    }
    console.log("register body: ", value);

    const result = await userController.registerUser(value);
    if (result) {
      return res.status(200).send({ success: true, user: result });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "email already exits, try another" });
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
    });
  }
});

export default unAuthV2Router;
