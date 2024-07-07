import React, { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Postcomponent from "./Postcomponent";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Profile = () => {
  const [category, setCategory] = useState("");
  // const user = JSON.parse(Cookies.get("user"));
  // const [profile, setprofile] = useState(user);

  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const {
    isPending,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profile = await axios.get(`${BACKENDURL}/api/user/me/`, {
        headers: headers,
        withCredentials: true,
      });
      return profile.data;
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.dismiss();
      toast.info("Fetching Profile...", {
        autoClose: 200,
      });
    }

    if (error) {
      toast.dismiss();
      toast.error("An error fetching profile");
    }
  });

  console.log(profile);

  return (
    <div className="text-2xl text-center pt-1 md:pt-5  ">
      <h2 className="pb-1 md:pb-3 text-center ml-4 text-lg md:text-xl font-semibold flex flex-row items-center  ">
        {profile?.first_name} {profile?.last_name}
      </h2>
      <div
        className={`h-[240px] relative bg-cover bg-center`}
        style={{
          backgroundImage: `url(${
            profile?.cover ? `${profile.cover}` : "../../environ.jpeg"
          })`,
        }}
      >
        <img
          src={
            profile?.profile_pic ? `${profile.profile_pic}` : "../../pic1.png"
          }
          className="absolute bottom-0 left-0 w-28 ml-2 mb-2 "
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-row ml-3 mt-3 ">
          <h2 className="text-center ml-4 text-lg md:text-xl font-semibold flex flex-row items-center  ">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <h2 className=" text-center ml-4 text-sm md:text-md font-semibold flex flex-row items-center text-gray-500 ">
            @{profile?.username}
          </h2>
        </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {profile?.bio}
        </p>
        <div className="font-normal text-left white  ml-2 text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            United States
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            {profile?.profession ? profile.profession : "Climate Analyst"}
          </p>
        </div>
      </div>
      <div>
        <div className="text-white flex flex-row justify-center text-base gap-8 border-0 border-b-[1px] border-gray-500 ">
          <h2
            className={`cursor-pointer ${
              category === "reports" ? "border-b-[2px] border-[#008080]" : null
            } `}
            onClick={() => {
              setCategory("reports");
            }}
          >
            Disaster Reports
          </h2>
          <h2
            className={`cursor-pointer ${
              category === "education"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("education");
            }}
          >
            Education
          </h2>
          <h2
            className={`cursor-pointer ${
              category === "community"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
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
