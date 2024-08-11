import axios from "axios";
import googleAuthURIs from "@/utils/googleAuthURIs";
const googleapikey = process.env.GOOGLE_API_KEY;
const password_reset_url = `${googleAuthURIs.ChangePassword}${googleapikey}`;
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idToken, newPassword } = req.body;
    try {
      const result = await axios.post(password_reset_url, {
        idToken,
        password: newPassword,
        returnSecureToken: true,
      });
      res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      //console.log("error in password reset", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    }
  }
}
