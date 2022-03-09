/* Implement authenticated routes to store,
 * get (all and by id), and update, and delete
 * wikipedia posts you will get calling wikipedia api
 * */
// import Wiki from "../models/wikiRecords";
import { IWiki } from "../models/wikiRecords";
import Wiki from "../models/wikiRecords";

export default {
  async insertWikiRecord(data: IWiki) {
    // Your logic here
    const { pageid, title, extract } = data;
    const record = await Wiki.create({ pageid, title, extract });
    return record;
  },

  async getAllWikiRecords() {
    // Your logic here
    const records = await Wiki.find({});
    return records;
  },

  async getWikiRecordById(id: number) {
    // Your logic here
    const record = await Wiki.findOne({ pageid: id });
    return record;
  },

  async updateWikiRecords(id: number, title: string, extract: string) {
    // Your logic here
    const record = await Wiki.findOneAndUpdate(
      { pageId: id },
      { $set: { extract, title } },
      { new: true }
    );
    return record;
  },

  async deleteWikiRecord(id: any) {
    //your logic here
    const record = await Wiki.deleteOne({ pageid: id });
    return record;
  },
};
