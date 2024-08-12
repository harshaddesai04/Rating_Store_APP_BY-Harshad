import FormMessage from "@/components/UI/FormComponents/FormMessage/FormMessage";
import FormPage from "@/components/UI/FormComponents/FormPage/FormPage";
import Form from "@/components/UI/FormComponents/Form/Form";
import InputContainer from "@/components/UI/FormComponents/InputContainer/InputContainer";
import Input from "@/components/UI/FormComponents/Input/Input";
import FormButton from "@/components/UI/FormComponents/FormButton/FormButton";
import { useState } from "react";
import axios from "axios";
import toastMsg from "@/utils/DisplayToast";
import roles from "@/utils/roles";
import { useRouter } from "next/router";
import Head from "next/head";

function passwordValidation(value, setPasswordError, setIsValid) {
  if (value.length < 8) {
    setPasswordError("Password should have more than 8 characters");
    return;
  }
  if (!value.match(/[0-9]/)) {
    setPasswordError("Password should have a number [0-9]");
    return;
  }
  if (!value.match(/[a-z]/)) {
    setPasswordError("Password should have a Lowercase letter");
    return;
  }
  if (!value.match(/[A-Z]/)) {
    setPasswordError("Password should have an Uppercase letter");
    return;
  }
  if (!value.match(/\W/)) {
    setPasswordError("Password should have a Special character");
    return;
  }
  if (value.length > 16) {
    setPasswordError(
      "Password should have less than or equal to 16 characters"
    );
    return;
  }
  setIsValid(true);
}

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const [isValid, setIsValid] = useState();
  const [emailerror, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function changeHandler(event, name) {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validation(e) {
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setAddressError("");

    e.preventDefault();
    const emailip = e.target["signup-email"];
    const passwordip = e.target["signup-password"];
    const nameip = e.target["signup-name"];
    const addressip = e.target["signup-address"];
    const { email, password, name, address } = formData;

    if (name.length < 20) {
      setNameError("Name should be 20 characters or above");
      return;
    }
    if (name.length > 60) {
      setNameError("Name should be 60 characters or below");
      return;
    }

    if (address.length < 10) {
      setAddressError("Address should be more than 10 characters");
    }

    if (address.length > 400) {
      setAddressError("Maximum 400 characters are allowed");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid Email");
      return;
    }

    passwordValidation(password, setPasswordError, setIsValid);

    if (isValid) requestSignUp(emailip, passwordip, nameip, addressip);
  }
  async function requestSignUp(emailip, passwordip, nameip, addressip) {
    emailip.disabled = true;
    passwordip.disabled = true;
    nameip.disabled = true;
    addressip.disabled = true;
    const { email, password, name, address } = formData;
    if (isValid) {
      const res = await axios.post("/api/signup", {
        email,
        password,
        name,
        address,
        role: roles.USER,
      });
      emailip.value = "";
      passwordip.value = "";
      nameip.value = "";
      addressip.value = "";
      const { message, data } = res.data;
      if (message === "error") {
        toastMsg("error", data);
      } else {
        toastMsg("success", "Account created Successfully !!");
        router.replace("/auth/sign-in");
      }
    }
    emailip.disabled = false;
    passwordip.disabled = false;
    nameip.disabled = false;
    addressip.disabled = false;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="border min-h-[inherit] flex justify-center items-center">
        <FormPage>
          <FormMessage
            header="Create a new account"
            subtext="Or"
            routetext="login to your existing account"
            route="/auth/sign-in"
          />
          <Form submitFunction={validation}>
            <InputContainer>
              <Input
                id="signup-name"
                label="Name"
                type="text"
                errorMessage={nameError}
                value={formData.name}
                onChange={(e) => changeHandler(e, "name")}
              />
              <Input
                id="signup-email"
                label="Email Address"
                type="text"
                errorMessage={emailerror}
                value={formData.email}
                onChange={(e) => changeHandler(e, "email")}
              />
              <Input
                id="signup-password"
                label="Password"
                type="password"
                errorMessage={passwordError}
                value={formData.password}
                onChange={(e) => changeHandler(e, "password")}
              />
              <Input
                label="Address"
                name={"signup-address"}
                id={"signup-address"}
                value={formData.address}
                onChange={(e) => changeHandler(e, "address")}
                as="textarea"
                errorMessage={addressError}
              />
            </InputContainer>
            <FormButton type="submit" label="Sign Up" />
          </Form>
        </FormPage>
      </div>
    </>
  );
};

export default SignUp;
