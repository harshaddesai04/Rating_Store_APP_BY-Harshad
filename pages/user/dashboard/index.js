import axios from "axios";
import { useEffect, useState } from "react";
import storeImg from "../../../public/store3d.jpg";
import Image from "next/image";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import Popup from "./Popup";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const Dashboard = () => {
  const [storeList, setStoreList] = useState([]);
  const [popupInfo, setPopupInfo] = useState({});
  useEffect(() => {
    async function getStoresList() {
      const result = await axios.post("/api/getAllStores", {
        test: "test",
      });
      setStoreList(result.data.storesList);
    }
    getStoresList();
  }, []);
  return (
    <div className=" min-h-[inherit] p-5 flex border justify-center items-start ">
      {popupInfo.name && <Popup {...popupInfo} close={setPopupInfo} />}
      <div className=" grid grid-cols-1 gap-2 place-items-center sm:grid-cols-2 md:grid-cols-3 max-w-6xl ">
        {storeList.map((store) => {
          const { name, email, store_name, overall_rating, address } = store;
          return (
            <div
              key={name}
              className="bg-white shadow-md border w-fit h-fit p-7 rounded-xl flex flex-col gap-3 max-w-[300px] max-h-[500px]"
            >
              <div className="image">
                <Image
                  className="rounded-xl"
                  src={storeImg}
                  alt="store image"
                  height={200}
                  width={300}
                />
              </div>
              <div>
                <p className="text-3xl">{store_name}</p>
                <p className="text-sm text-gray-400">{name}</p>
              </div>
              <div>
                <p className=" text-lg">Contact</p>
                <p className="text-gray-400">{email}</p>
              </div>
              <div>
                <p className=" text-lg">Rating</p>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={overall_rating}
                  itemStyles={myStyles}
                  radius="small"
                  readOnly
                />
              </div>
              <button
                onClick={() => {
                  setPopupInfo(store);
                }}
                className="p-3 text-center w-full bg-black text-white rounded-xl"
              >
                Rate this store
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
