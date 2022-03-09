import express, { Request, Response } from "express";
// import errMessages from "../../../constants/errorMessages.js";
import userController from "../../../controllers/userController";

const userRouter = express.Router();

// get all user birthday
userRouter.get("/birthday", async (req: Request, res: Response) => {
  try {
    console.log("from birthday");
    const result = await userController.getAllUsersBirthday();
    return res
      .status(200)
      .send({ success: true, birthday: result !== null ? result : [] });
  } catch (err) {
    return res.status(400).send({
      success: false,
      // err: err.message || errMessages.errors.GENERIC_ERROR,
      err,
    });
  }
});

// ages of student in days
userRouter.get("/ages", async (req: Request, res: Response) => {
  try {
    const result = await userController.birthYear();
    return res.status(200).send({ success: true, students: result });
  } catch (err) {
    return res.status(400).send({
      success: false,
      // err: err.message || errMessages.errors.GENERIC_ERROR,
      err,
    });
  }
});

// edit post
userRouter.delete("/female/delete", async (req: Request, res: Response) => {
  try {
    const result = await userController.softDeleteFemaleUsers();
    return res.status(200).send({ success: true, females: result });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
      // err: err.message || errMessages.errors.GENERIC_ERROR,
    });
  }
});

export default userRouter;
