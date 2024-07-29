import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  console.log(req.body);
  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("users");
    let query = { role: roles.STOREOW };
    let dblist = "";
    dblist = await collection.find(query);
    // console.log("dblist", dblist);
    const list = [];
    for await (const doc of dblist) {
      list.push(doc);
    }
    // console.log("list", list);
    try {
      res.status(200).json({ message: "success", storesList: list });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      console.log("error in backend get user list api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
