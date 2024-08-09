import axios from "axios";
import googleAuthURIs from "@/utils/googleAuthURIs";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const googleapikey = process.env.GOOGLE_API_KEY;
const SIGNINURL = `${googleAuthURIs.SignInUrl}${googleapikey}`;
export default async function handler(req, res) {
  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("users");
    const query = { email: req.body.email };
    const userInfo = await collection.findOne(query);
    const { email, password } = req.body;
    try {
      const result = await axios.post(SIGNINURL, {
        email,
        password,
        returnSecureToken: true,
      });
      res
        .status(200)
        .json({ message: "success", data: result.data, userData: userInfo });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in backend sign in api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}
