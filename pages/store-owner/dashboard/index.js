import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import Loader from "@/components/UI/Icons/Loader";
import AuthHOC from "@/pages/AuthHOC";
import Head from "next/head";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const { user } = useSelector((state) => state.userData);
  const { name, email } = user;

  useEffect(() => {
    async function getStoreStats() {
      setIsLoading(true);
      const result = await axios.post("/api/storeStats", {
        name,
        email,
      });
      setOverallRating(result.data.rating);
      setUsersList(result.data.userList);
      setIsLoading(false);
    }
    if (email) getStoreStats();
  }, []);
  return (
    <>
      <Head>
        <title>Store Dashboard</title>
      </Head>
      <div className="min-h-[inherit] grid grid-cols-1 md:grid-cols-2 border  gap-5 p-7">
        {isLoading && (
          <div className="fixed top-0 left-0 bg-black/60 w-screen h-screen z-50 grid place-items-center">
            <Loader color="white" size="3em" />
          </div>
        )}
        <div className="p-5 shadow-xl rounded-lg text-center min-w-80 min-h-80 flex flex-col items-center justify-center">
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
        <div className="p-5 shadow-xl rounded-lg text-center min-w-80 min-h-80">
          <div className="text-3xl mb-5">User Ratings</div>
          <div className="flex flex-col gap-5 ">
            {usersList.map((user) => {
              return (
                <div
                  key={user._id}
                  className="flex flex-col justify-center items-center gap-1 border p-1 rounded-lg  "
                >
                  <div className="font-semibold"> {user.user_name}</div>
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
    </>
  );
};

export default AuthHOC(Dashboard);
