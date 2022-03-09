/*Define a wiki schema here*/
import { model, Schema, Model, Document } from "mongoose";

// const WikiSchema = new mongoose.Schema({
//   pageid: Number,
//   title: String,
//   extract: String,
// });

// const wikiModel = mongoose.model("Wiki", WikiSchema);
// export default wikiModel;

export interface IWiki extends Document {
  pageid: number;
  title: string;
  extract: string;
}

const WikiSchema = new Schema<IWiki>({
  pageid: Number,
  title: String,
  extract: String,
});

const Wiki: Model<IWiki> = model("Wiki", WikiSchema);

export default Wiki;
