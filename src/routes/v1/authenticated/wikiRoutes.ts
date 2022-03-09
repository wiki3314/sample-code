import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// import errMessages from "../../../constants/errorMessages";
import wikiController from "../../../controllers/wikiController";
import Wiki from "../../../models/wikiRecords";
import Validation from "../../../validations/postValidation";
const validation = new Validation();

const wikiRouter = express.Router();

// get all post
wikiRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await wikiController.getAllWikiRecords();
    return res
      .status(200)
      .send({ success: true, posts: result !== null ? result : [] });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
      // err: err.message || errMessages.errors.GENERIC_ERROR,s
    });
  }
});

//edit post
wikiRouter.put("/", async (req: Request, res: Response) => {
  try {
    const { err, value } = await validation.updatePost(req);
    if (err) {
      return res.status(400).json({ message: "Invalid parameters", err });
    }
    const { id, title, extract } = value;

    const result = await wikiController.updateWikiRecords(id, title, extract);
    return res.status(200).send({ success: true, posts: result });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
      // err: err.message || errMessages.errors.GENERIC_ERROR,
    });
  }
});

// delete post
wikiRouter.delete("/", async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const result = await wikiController.deleteWikiRecord(id);
    return res.status(200).send({ success: true, posts: result });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
      // err: err.message || errMessages.errors.GENERIC_ERROR,
    });
  }
});

// search wikipedia result
wikiRouter.get("/search", async (req: Request, res: Response) => {
  try {
    console.log("hiiii");
    const { titles } = req.query;
    const response = await axios.get(`${process.env.WIKI_API}${titles}`);
    console.log("axios result", response.data);
    // const record = response.data.query.pages;
    let dbRecord: any;
    for (const [key, value] of Object.entries(response.data.query.pages)) {
      console.log(`${key}: ${value}`);
      dbRecord = value;
    }
    const record = await Wiki.findOne({ pageid: dbRecord.pageid });
    if (record) {
      return res.status(200).send({ success: true, posts: dbRecord });
    } else {
    }
    // const result = await wikiController.getAllWikiRecords();
    return res.status(200).send({ success: true, posts: dbRecord });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err,
      // err: err.message || errMessages.errors.GENERIC_ERROR,s
    });
  }
});

export default wikiRouter;
