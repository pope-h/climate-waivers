import React from "react";
import Accountcard from "./Accountcard";

const Popularaccounts = () => {
  const users = [
    {
    "first_name": "United Nations",
    // "last_name": "Nations",
    "profile_pic": "../../unn.png",
    "username": "unnnigeria"
    },
    {
    "first_name": "Red Cross ",
    // "last_name": "Cross",
    "profile_pic": "../../red.png",
    "username": "redcrossng"
    },
    {
    "first_name": "Lawma",
    "last_name": " ",
    "profile_pic": "../../lawma.png",
    "username": "lawma"
    },
    {
    "first_name": "UNFCCC",
    "last_name": " ",
    "profile_pic": "../../unfcc.png",
    "username": "unfcccnigeria"
    },
  ]
  
  return (
    <div>
      <div className="flex flex-col gap-2 text-white bg-linear list-none py-4 m-4 rounded-2xl ">
        <h2 className="text-lg font-semibold p-3">Popular accounts</h2>
        {
          users.map((user) => {
            return(
              <Accountcard user={user} />
            )
          })
        }
        {/* <Accountcard user={user} />
        <Accountcard user={user} /> */}
      </div>
    </div>
  );
};

export default Popularaccounts;
