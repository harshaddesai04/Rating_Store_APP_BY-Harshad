import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("users");
    const query = { email: req.body.email };
    try {
      const user = await collection.findOne(query);
      const listofusers = await database
        .collection("ratings")
        .find({ name: req.body.name })
        .toArray();
      res.status(200).json({
        message: "success",
        rating: user.overall_rating,
        userList: listofusers,
      });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in backend get stats", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
