import { userDataActions } from "@/redux-store/userDataSlice";
import toastMsg from "@/utils/DisplayToast";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.userData);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { name, email, address, role } = user;
  const [changePassword, setChangePassword] = useState(false);
  const { idToken } = user;
  function logout() {
    dispatch(userDataActions.logout());
    router.replace("/auth/sign-in");
  }
  function passwordValidation(e, setErrorMessage) {
    setErrorMessage("");
    e.preventDefault();
    const value = e.target.password.value;
    if (value.length < 8) {
      setErrorMessage("Password should have more than 8 characters");
      return;
    }
    if (!value.match(/[0-9]/)) {
      setErrorMessage("Password should have a number [0-9]");
      return;
    }
    if (!value.match(/[a-z]/)) {
      setErrorMessage("Password should have a Lowercase letter");
      return;
    }
    if (!value.match(/[A-Z]/)) {
      setErrorMessage("Password should have an Uppercase letter");
      return;
    }
    if (!value.match(/\W/)) {
      setErrorMessage("Password should have a Special character");
      return;
    }
    if (value.length > 16) {
      setErrorMessage(
        "Password should have less than or equal to 16 characters"
      );
      return;
    }
    requestPasswordChange(value);
  }
  async function requestPasswordChange(newPassword) {
    const res = await axios.post("/api/password_reset", {
      newPassword,
      idToken,
    });
    if (res.data.message == "error") {
      toastMsg(res.data.message, res.data.data);
    } else {
      toastMsg("success", "Password was changed successfully");
      logout();
    }
  }
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <section className="min-h-[inherit] flex justify-center items-center">
        <div className="md:min-w-[500px] p-7 flex flex-col gap-7 *:flex *:gap-5 md:text-3xl ">
          <div>
            <p className="font-bold">Name:</p>
            <p> {name}</p>
          </div>
          <div>
            <p className="font-bold">E-mail:</p>
            <p> {email}</p>
          </div>
          <div>
            <p className="font-bold">Address:</p>
            <p> {address}</p>
          </div>
          {changePassword && (
            <form onSubmit={(e) => passwordValidation(e, setErrorMessage)}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="outline outline-1 focus:outline-gray-500 rounded md:rounded-lg md:p-5 p-1"
                />
                <button
                  type="button"
                  className="absolute top-[50%] -translate-y-[50%] right-[10%] text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-1 rounded md:px-5 md:py-5 md:rounded-lg border border-transparent hover:border-black"
              >
                Reset
              </button>
            </form>
          )}
          {changePassword && <p className="text-red-500">{errorMessage}</p>}
          <div>
            <button
              onClick={() => setChangePassword(!changePassword)}
              className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-1 md:px-5 md:py-5 rounded-lg border border-transparent hover:border-black"
            >
              {changePassword ? "Cancel" : "Change Password"}
            </button>
            <button
              onClick={() => logout()}
              className="bg-black text-white hover:bg-white hover:text-black transition-colors duration-250 p-1 md:px-5 md:py-5 rounded-lg border border-transparent hover:border-black"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
