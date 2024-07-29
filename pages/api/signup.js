import axios from "axios";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
import googleAuthURIs from "@/utils/googleAuthURIs";
import roles from "@/utils/roles";
const APIKEY = process.env.GOOGLE_API_KEY;
const SIGNUP_URL = `${googleAuthURIs.SignUpUrl}${APIKEY}`;

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  const body = { ...req.body };
  if (req.method === "POST") {
    const { email, password, name, address } = req.body;

    try {
      const database = client.db("StoresRatingApp");
      const collection = database.collection("users");
      const result = await axios.post(SIGNUP_URL, {
        email,
        password,
        returnSecureToken: true,
      });
      delete body.password;
      if (body.role != roles.STOREOW) {
        delete body.store_name;
        delete body.overall_rating;
      }
      if (result.status == 200) {
        const mongoDB_result = await collection.insertOne({ ...body });
        res.status(200).json({ message: "success", data: result.data });
      }
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("Error in backund Signup api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
