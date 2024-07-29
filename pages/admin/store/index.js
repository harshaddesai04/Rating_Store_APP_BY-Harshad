import React, { useEffect, useState } from "react";
import axios from "axios";
import roles from "@/utils/roles";
const StoreDisplay = () => {
  const [storesList, setStoresList] = useState([]);
  useEffect(() => {
    async function getStoresList() {
      const result = await axios.post("/api/getAllStores", {
        test: "test",
      });
      // //console.log(result);
      setStoresList(result.data.storesList);
    }
    getStoresList();
  }, []);
  return (
    <div>
      <div className="overflow-auto">
        <table>
          <thead className="">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Address</th>
              <th>E-mail</th>
              <th>Store Name</th>
              <th>Overall Rating</th>
            </tr>
          </thead>
          <tbody>
            {storesList.length > 0 &&
              storesList.map((store, index) => {
                const {
                  name,
                  email,
                  store_name,
                  overall_rating,
                  _id,
                  address,
                  role,
                } = store;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      {role == roles.ADMIN
                        ? "System Admin"
                        : role == roles.STOREOW
                        ? "Store Owner"
                        : "Normal User"}
                    </td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>{store_name}</td>
                    <td>{overall_rating}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* {storesList.map((store) => {
        const { name, email, store_name, overall_rating } = store;
        return <div>{name}</div>;
      })} */}
    </div>
  );
};

export default StoreDisplay;
