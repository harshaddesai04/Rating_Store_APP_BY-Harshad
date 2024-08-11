import Image from "next/image";
import React, { useEffect } from "react";
import storeImg from "../../../public/store3d.jpg";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const Popup = ({ name, store_name, email, address, overall_rating, close }) => {
  const [edit, setEdit] = useState(false);
  const [rateDisabled, setRateDisabled] = useState(true);
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.userData);
  const {
    name: user_name,
    email: user_email,
    address: user_address,
    role,
  } = user;
  useEffect(() => {
    async function getUserRating() {
      const result = await axios.post("/api/getUserRating", {
        store_name,
        user_name,
        name,
      });
      if (result.data.ratingInfo) {
        setRating(result.data.ratingInfo.rating);
      }
    }
    getUserRating();
    setRateDisabled(false);
  }, []);
  return (
    <div className="fixed top-0 left-0 bg-black/80 w-screen h-screen flex justify-center items-center z-[999]">
      <div className="bg-white p-5 w-full rounded-lg max-w-[500px] min-h-[500px]">
        <div className="header border-b text-xl flex justify-between items-center">
          <div>Store Details</div>
          <button onClick={() => close({})}>close</button>
        </div>
        <div className="body flex flex-col gap-3">
          <div className="">
            <Image
              className="object-cover h-36 rounded-lg my-2 object-center"
              src={storeImg}
              alt="store-image"
            />
          </div>
          <div>
            <div className="text-3xl font-bold">{store_name}</div>
            <div className="text-sm text-gray-400">{name}</div>
          </div>
          <div className=" flex flex-col gap-1 my-3">
            <div className="text-xl font-semibold">
              <div>Contact info</div>
            </div>
            <div>
              <div className="font-semibold">Email:</div> {email}
            </div>
            <div>
              <div className="font-semibold">Address:</div>
              <div>{address}</div>
            </div>
          </div>
          <div>
            <div className="text-xl">Rating</div>
            <Rating
              style={{ maxWidth: 150 }}
              value={overall_rating}
              itemStyles={myStyles}
              radius="small"
              readOnly
            />
          </div>
          <div>
            <div className="text-xl">Your Rating</div>
            <div className="flex gap-3">
              <Rating
                isDisabled={rateDisabled}
                className={edit ? "border-black border" : ""}
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={(rating) => {
                  setRateDisabled(true);
                  async function submitRating() {
                    try {
                      const result = await axios.post("/api/submitRating", {
                        rating,
                        store_name,
                        user_name,
                        name,
                      });
                      setRating(rating);
                    } catch (error) {
                      //console.log(error);
                    } finally {
                      setRateDisabled(false);
                    }
                  }
                  submitRating();
                }}
                itemStyles={myStyles}
                radius="small"
                readOnly={!edit}
              />
              <button
                onClick={() => setEdit(!edit)}
                className="p-1 px-4 border-black border rounded-full hover:bg-black hover:text-white"
              >
                {edit ? "Done" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
