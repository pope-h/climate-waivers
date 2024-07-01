import React, { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Postcomponent from "./Postcomponent";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [swittcher, setSwittcher] = useState(false);
  const [category, setCategory] = useState("");
  const user = JSON.parse(Cookies.get("user"));
  const [userProfile, setUserProfile] = useState(user);

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  useEffect(() => {
    async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/me`, {
          headers: headers,
          withCredentials: true,
        });
        setUserProfile(res.data);
        return res.data;
      } catch (error) {
        console.log(error.message);
      }
    };
  });

  return (
    <div className="text-2xl text-center pt-1 md:pt-5  ">
      <h2 className="pb-1 md:pb-3 text-center ml-4 text-lg md:text-xl font-semibold flex flex-row items-center  ">
       { userProfile.first_name} {userProfile.last_name}
      </h2>
      <div
        className={`h-[240px] relative bg-cover bg-center`}
        style={{
          backgroundImage: `url(${
            userProfile?.cover ? `${userProfile.cover}` : "../../environ.jpeg"
          })`,
        }}
      >
        <img
          src={
            userProfile?.profile_pic
              ? `${userProfile.profile_pic}`
              : "../../pic1.png"
          }
          className="absolute bottom-0 left-0 w-28 ml-2 mb-2 "
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-row gap-2 ml-3 mt-3 ">
          <h2 className="font-semibold text-xl text-capitalize">{userProfile?.username}</h2>
          <h2 className=" text-lg ">{userProfile.email}</h2>
        </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {userProfile?.bio}
        </p>
        <div className="font-normal text-left white  ml-2 text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            United States
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            {userProfile.profession
              ? userProfile.profession
              : "Climate Analyst"}
          </p>
        </div>
      </div>
      <div>
        <div className="text-white flex flex-row justify-center text-base gap-8 border-0 border-b-[1px] ">
          <h2
            className={`cursor-pointer ${
              swittcher === false ? "text-purple" : null
            } `}
            onClick={() => {
              setSwittcher(!swittcher);
              setCategory("disaster_reports");
            }}
          >
            Disaster Reports
          </h2>
          <h2
            className={`cursor-pointer ${
              swittcher === false ? "text-purple" : null
            } `}
            onClick={() => {
              setSwittcher(!swittcher);
              setCategory("education");
            }}
          >
            Education
          </h2>
          <h2
            className={`cursor-pointer ${
              swittcher === true ? "text-purple" : null
            } `}
            onClick={() => {
              setSwittcher(!swittcher);
              setCategory("community");
            }}
          >
            Community
          </h2>
        </div>
        <Postcomponent category={category} />
      </div>
    </div>
  );
};

export default Profile;
