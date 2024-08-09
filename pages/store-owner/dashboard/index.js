import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating, RoundedStar } from "@smastrom/react-rating";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const Dashboard = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const { user } = useSelector((state) => state.userData);
  //console.log(user);
  const { name, email } = user;

  useEffect(() => {
    async function getStoreStats() {
      const result = await axios.post("/api/storeStats", {
        name,
        email,
      });
      //console.log("result", result.data);
      setOverallRating(result.data.rating);
      setUsersList(result.data.userList);
    }
    if (email) getStoreStats();
  }, []);
  return (
    <div className="min-h-[inherit] border flex gap-5 justify-center items-center">
      <div className="p-5 shadow-xl rounded-lg text-center">
        <div className="text-3xl">Overall Rating</div>
        <div>
          <Rating
            style={{ maxWidth: 150 }}
            value={overallRating}
            itemStyles={myStyles}
            radius="small"
            readOnly
          />
        </div>
      </div>
      <div className="p-5 shadow-xl rounded-lg text-center">
        <div className="text-3xl">User Ratings</div>
        <div className="flex flex-col gap-5">
          {usersList.map((user) => {
            //console.log(user);
            return (
              <div key={user._id} className="">
                <div> {user.user_name}</div>
                <div>
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={user.rating}
                    itemStyles={myStyles}
                    radius="small"
                    readOnly
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
