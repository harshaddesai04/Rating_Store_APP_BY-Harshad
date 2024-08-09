import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardCard = ({ heading, number }) => {
  return (
    <div className="bg-white border w-full h-full max-w-[300px] max-h-56 p-8 rounded-3xl shadow-xl flex flex-col gap-4">
      <div className="text-4xl">{heading}</div>
      <div className="text-xl">{number}</div>
    </div>
  );
};

const Dashboard = () => {
  const [counts, setCounts] = useState({
    usersCount: 0,
    storesCount: 0,
    submittedRatings: 0,
  });
  useEffect(() => {
    async function getCounts() {
      const result = await axios.get("/api/countsForAdminDashboard");
      // //console.log(result.data.counts);
      setCounts(result.data.counts);
    }
    getCounts();
  }, []);
  return (
    <div className=" min-h-[inherit] flex flex-col md:flex-row justify-center items-center gap-7 p-7">
      <DashboardCard heading={"Total Users"} number={counts.usersCount} />
      <DashboardCard heading={"Total Stores"} number={counts.storesCount} />
      <DashboardCard
        heading={"Total Ratings"}
        number={counts.submittedRatings}
      />
    </div>
  );
};

export default Dashboard;
