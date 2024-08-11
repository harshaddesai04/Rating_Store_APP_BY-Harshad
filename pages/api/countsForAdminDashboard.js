import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  if (req.method === "GET") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("users");
    const usersCount = await collection.countDocuments();
    const storesCount = await collection.countDocuments({
      role: roles.STOREOW,
    });
    const submittedRatings = await database
      .collection("ratings")
      .countDocuments();
    try {
      res.status(200).json({
        message: "success",
        counts: { usersCount, storesCount, submittedRatings },
      });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in counts", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
