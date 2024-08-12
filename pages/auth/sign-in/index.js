import FormMessage from "@/components/UI/FormComponents/FormMessage/FormMessage";
import FormPage from "@/components/UI/FormComponents/FormPage/FormPage";
import Form from "@/components/UI/FormComponents/Form/Form";
import InputContainer from "@/components/UI/FormComponents/InputContainer/InputContainer";
import Input from "@/components/UI/FormComponents/Input/Input";
import FormButton from "@/components/UI/FormComponents/FormButton/FormButton";
import { useState } from "react";
import axios from "axios";
import toastMsg from "@/utils/DisplayToast";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "@/redux-store/userDataSlice";
import { useRouter } from "next/router";
import roles from "@/utils/roles";
import Head from "next/head";
const SignIn = () => {
  const { user } = useSelector((state) => state.userData);
  const { name, role } = user;

  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  if (name) {
    router.replace(
      role == roles.ADMIN
        ? "/admin/dashboard"
        : role == roles.USER
        ? "/user/dashboard"
        : "/store-owner/dashboard"
    );
  }
  const [emailerror, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function changeHandler(event, name) {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function validation(e) {
    setEmailError("");
    setPasswordError("");
    e.preventDefault();
    const emailip = e.target["signin-email"];
    const passwordip = e.target["signin-password"];
    const email = formData.email;
    const password = formData.password;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid Email");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should have more than 8 characters");
      return;
    }
    requestSignin(emailip, passwordip);
  }

  async function requestSignin(emailip, passwordip) {
    emailip.disabled = true;
    passwordip.disabled = true;
    const { email, password } = formData;
    try {
      const res = await axios.post(`/api/signin`, {
        email,
        password,
      });
      const { message, data, userData } = res.data;
      if (message === "error") {
        toastMsg("error", data);
      } else {
        dispatch(userDataActions.saveUserData({ ...userData, ...data }));
        toastMsg("success", "Sign In Success !!");
        router.push(
          userData.role == roles.ADMIN
            ? "/admin/dashboard"
            : userData.role == roles.USER
            ? "/user/dashboard"
            : "/store-owner/dashboard"
        );
      }
    } catch (error) {
      //console.log("error in sign in:", error);
    } finally {
      emailip.disabled = false;
      passwordip.disabled = false;
    }
  }
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="min-h-[inherit] flex justify-center items-center">
        <FormPage>
          <FormMessage
            header="Sign in to your account"
            subtext="Or"
            routetext="register a new account"
            route="/auth/sign-up"
          />
          <Form submitFunction={validation}>
            <InputContainer>
              <Input
                id="signin-email"
                label="Email Address"
                type="text"
                errorMessage={emailerror}
                value={formData.email}
                onChange={(e) => changeHandler(e, "email")}
              />
              <Input
                id="signin-password"
                label="Password"
                type="password"
                errorMessage={passwordError}
                value={formData.password}
                onChange={(e) => changeHandler(e, "password")}
              />
            </InputContainer>
            <FormButton type="submit" label="Sign In" />
          </Form>
        </FormPage>
      </div>
    </>
  );
};

export default SignIn;
