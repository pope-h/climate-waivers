import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import PropTypes from "prop-types";

const Accountcard = ({ user }) => {
  const [isFollow, setIsFollow] = useState(false);
  //const [followStyle, setFollowStyle] = useState('bg-black text-xs text-white font-semibold py-2 px-3 ml-2 rounded-xl')

  //const unfollowStyles = ' after:content-[Unfollow] after:bg-white-100 after:outline after:outline-3 after:outline-black-500 after:text-white-500 '
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");
  // const cachedUser = Cookies.get("user");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  const follow = async (userId) => {
    await axios
      .post(
        `${backendUrl}/api/following/`,
        { user: userId },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const unfollow = async (userId) => {
    await axios
      .delete(
        `${backendUrl}/api/following/`,
        { user: userId },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleFollow = async (userId) => {
    if (!isFollow) {
      await follow(userId);
    } else {
      await unfollow(userId);
    }
  };

  return (
    <div className="flex flex-row items-center px-3 py-1 justify-between ">
      <div className="flex flex-row items-center self-center ">
        <img
          src={user?.profile_pic ? user.profile_pic : "../../pic1.png"}
          className="mr-2 rounded-full h-12"
          alt="Profile Pic"
        />{" "}
        <div className="text-sm flex flex-col">
          <h3>
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-xs text-left text-gray-500">@{user?.username}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsFollow(!isFollow);
          handleFollow(user?.id);
        }}
        // style={followStyle}
        className={`bg-purple-500 text-xs text-white font-semibold py-2 px-3 ml-2  rounded-xl ${
          isFollow &&
          "bg-stone-100 outline outline-2 outline-stone-500 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
        } `}
      >
        {isFollow === true ? "Following" : "Follow"}
      </button>
    </div>
  );
};

Accountcard.propTypes = {
  user: PropTypes.object,
};

export default Accountcard;
