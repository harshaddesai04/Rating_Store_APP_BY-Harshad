import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const { store_name, user_name, name, rating } = req.body;
  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("ratings");
    let query = { user_name, store_name, name };

    let ratingInfo = await collection.findOne(query);
    try {
      let result;
      if (ratingInfo != null) {
        result = await collection.updateOne(
          { _id: ratingInfo._id },
          { $set: { rating } }
        );
      } else {
        result = await collection.insertOne({
          store_name,
          user_name,
          name,
          rating,
        });
      }
      let calculateAverage = await collection
        .aggregate([
          { $match: { store_name } },
          {
            $group: {
              _id: "$store_name",
              averageRating: { $avg: "$rating" },
            },
          },
        ])
        .toArray();
      const overall_rating = calculateAverage[0].averageRating;
      const updateAverage = await database
        .collection("users")
        .updateOne({ store_name, name }, { $set: { overall_rating } });
      res.status(200).json({ message: "success", result });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in backend submit Rating api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
