import FormMessage from "@/components/UI/FormComponents/FormMessage/FormMessage";
import FormPage from "@/components/UI/FormComponents/FormPage/FormPage";
import Form from "@/components/UI/FormComponents/Form/Form";
import InputContainer from "@/components/UI/FormComponents/InputContainer/InputContainer";
import Input from "@/components/UI/FormComponents/Input/Input";
import FormButton from "@/components/UI/FormComponents/FormButton/FormButton";
import { useEffect, useState } from "react";
import axios from "axios";
import toastMsg from "@/utils/DisplayToast";
import roles from "@/utils/roles";
import Loader from "@/components/UI/Icons/Loader";
import AuthHOC from "@/pages/AuthHOC";
import Head from "next/head";
const menu = {
  ADD_USER: "add-user",
  VIEW_USER: "view-user",
};
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

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("add-user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    role: roles.ADMIN,
    store_name: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [emailerror, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storeNameError, setStoreNameError] = useState("");

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

    const { email, password, name, address } = formData;

    if (name.length < 20) {
      setNameError("Name should be 20 characters or above");
      return;
    }
    if (name.length > 60) {
      setNameError("Name should be 60 characters or below");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid Email");
      return;
    }

    passwordValidation(password, setPasswordError, setIsValid);
    if (!isValid) return;
    if (address.length < 10) {
      setAddressError("Address should be more than 10 characters");
      return;
    }

    if (address.length > 400) {
      setAddressError("Maximum 400 characters are allowed");
      return;
    }

    if (isValid) requestSignUp(e);
  }
  async function requestSignUp(e) {
    let inputs = e.target;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
    const { email, password, name, address, role, store_name } = formData;
    if (isValid) {
      const res = await axios.post("/api/signup", {
        email,
        password,
        name,
        address,
        role,
        store_name,
        overall_rating: 0,
      });
      setFormData({
        email: "",
        password: "",
        name: "",
        address: "",
        role: roles.ADMIN,
        store_name: "",
      });
      // for (let i = 0; i < inputs.length; i++) {
      //   inputs[i].value = "";
      // }
      const { message, data } = res.data;
      if (message === "error") {
        toastMsg("error", data);
      } else {
        toastMsg("success", "Account created Successfully !!");
      }
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = false;
    }
  }
  /////////////////////// View Users Tab
  const [filter, setFilter] = useState({
    "arrange-by": "name",
    "sort-by": "ascending",
    role: "all",
  });
  function filterHandler(e, name) {
    setFilter((prev) => ({ ...prev, [name]: e.target.value }));
  }
  const select = "border rounded-lg p-3";
  const select_container = "flex gap-3 items-center justify-between";
  const [userList, setUserList] = useState([]);
  async function getUsersList() {
    setIsLoading(true);
    const res = await axios.post("/api/getAllUsers", {
      filter: "ascending",
    });
    setUserList(res.data.usersList);
    setIsLoading(false);
  }
  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function filterUserData() {
      const result = await axios.post("/api/getAllUsers", {
        ...filter,
      });
      setUserList(result.data.usersList);
      setIsLoading(false);
    }
    filterUserData();
  }, [filter]);
  ///////////////////////////
  return (
    <>
      <Head>
        <title>User List</title>
      </Head>
      <div className="relative w-full">
        <nav className="flex  top-0 left-0 w-full bg-white justify-around items-center ">
          <button
            className={`p-5 w-full h-full hover:bg-gray-100 border-b-2 ${
              display == menu.ADD_USER
                ? "border-b-blue-500 bg-gray-100"
                : "border-b-gray-500"
            }`}
            onClick={() => setDisplay(menu.ADD_USER)}
          >
            Add User
          </button>
          <button
            className={`p-5 w-full h-full hover:bg-gray-100 border-b-2 ${
              display == menu.VIEW_USER
                ? "border-b-blue-500 bg-gray-100"
                : "border-b-gray-500"
            }`}
            onClick={() => setDisplay(menu.VIEW_USER)}
          >
            View All Users
          </button>
        </nav>
        <div className=" w-full">
          {display == menu.ADD_USER && (
            <div className=" flex justify-center items-center">
              <FormPage>
                <FormMessage header="Create a new account" />
                <Form submitFunction={validation}>
                  <div className="w-full">
                    <label>Make an account for:</label>
                    <select
                      onChange={(e) => changeHandler(e, "role")}
                      className="w-full px-3 py-2 border  border-gray-300  rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus: outline-none resize-none disabled:bg-gray-100"
                      value={formData.role}
                    >
                      <option value={roles.ADMIN}>System Admin</option>
                      <option value={roles.USER}>Normal User</option>
                      <option value={roles.STOREOW}>Store Owner</option>
                    </select>
                  </div>
                  <InputContainer>
                    <Input
                      id="signup-name"
                      label="Name"
                      type="text"
                      errorMessage={nameError}
                      value={formData.name}
                      onChange={(e) => changeHandler(e, "name")}
                    />
                    {formData.role === roles.STOREOW && (
                      <Input
                        id="signup-store-name"
                        label="Store Name"
                        type="text"
                        errorMessage={storeNameError}
                        value={formData.store_name}
                        onChange={(e) => changeHandler(e, "store_name")}
                      />
                    )}
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
          )}
          {display == menu.VIEW_USER && (
            <div className="relative">
              <div className="filter p-4 md:h-20 border flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-around md:items-center">
                <div className={`${select_container}`}>
                  <label htmlFor="arrange-by">Arrange By</label>
                  <select
                    value={filter["arrange-by"]}
                    onChange={(e) => filterHandler(e, "arrange-by")}
                    className={select}
                    id="arrange-by"
                  >
                    <option value={"name"}>Name</option>
                    <option value={"email"}>Email</option>
                    <option value={"address"}>Address</option>
                  </select>
                </div>
                <div className={select_container}>
                  <label htmlFor="sort-by">Sort By</label>
                  <select
                    value={filter["sort-by"]}
                    onChange={(e) => filterHandler(e, "sort-by")}
                    className={select}
                    id="sort-by"
                  >
                    <option value={"ascending"}>Ascending</option>
                    <option value={"descending"}>Descending</option>
                  </select>
                </div>
                <div className={select_container}>
                  <label htmlFor="select-role">Select Role</label>
                  <select
                    value={filter["role"]}
                    onChange={(e) => filterHandler(e, "role")}
                    className={select}
                    id="select-role"
                  >
                    <option value={"all"}>All</option>
                    {Object.values(roles).map((val) => {
                      const role_name =
                        val == roles.ADMIN
                          ? "System Admin"
                          : val == roles.STOREOW
                          ? "Store Owner"
                          : "Normal User";
                      return (
                        <option key={val} value={val}>
                          {role_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="overflow-auto">
                {isLoading ? (
                  <div className=" h-screen max-h-96 grid place-items-center">
                    <Loader size="3em" />
                  </div>
                ) : (
                  <table>
                    <thead className="">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Address</th>
                        <th>E-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.length > 0 &&
                        userList.map((user, index) => (
                          <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                              {user.role == roles.ADMIN
                                ? "System Admin"
                                : user.role == roles.STOREOW
                                ? "Store Owner"
                                : "Normal User"}
                            </td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthHOC(Users);
