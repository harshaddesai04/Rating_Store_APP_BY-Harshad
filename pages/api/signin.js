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
    const dblist = await collection.find(query);
    const list = [];
    for await (const doc of dblist) {
      list.push(doc);
    }
    const { email, password } = req.body;
    try {
      const result = await axios.post(SIGNINURL, {
        email,
        password,
        returnSecureToken: true,
      });
      res
        .status(200)
        .json({ message: "success", data: result.data, userData: list[0] });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      console.log("error in backend sign in api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    }
  }
}
