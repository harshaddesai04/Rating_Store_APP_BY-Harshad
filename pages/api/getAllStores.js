import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const { "arrange-by": arrangeBy, "sort-by": sortBy } = req.body;

  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("users");
    let query = { role: roles.STOREOW };
    let dblist = await collection
      .find(query)
      .sort({ [arrangeBy]: sortBy == "ascending" ? 1 : -1 });
    const list = [];
    for await (const doc of dblist) {
      list.push(doc);
    }
    try {
      res.status(200).json({ message: "success", storesList: list });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in backend get stores", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
