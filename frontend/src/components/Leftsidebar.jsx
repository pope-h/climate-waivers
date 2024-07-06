import Menu from "./Menu";
import Cookies from "js-cookie";

const Leftsidebar = () => {
  const userCookie = Cookies.get("user")
  //made this changes just to get by to integrate the chatbot
  let user;
  if(!userCookie){ 

  }else{
    user = JSON.parse(userCookie);
  }

  
  // const user = {
  //   "name": "Abdul",
  // }
  // console.log(user);

  return (
    <div className=" border-r-[1px] border-gray-700 hidden md:block pt-5">
      {/* Logo */}
      <div className=" flex gap-3 items-center justify-self-center md:justify-self-start ">
        <div className="w-[70px]">
          <img src="../../Vector.png" />
        </div>
        <div className="flex flex-col  font-semibold text-[24px]">
          <h1>Climate Wavers</h1>
        </div>
      </div>
      <Menu />
      {/* Name box */}
      <div className="flex flex- items-center my-7 pt-8 self-center ">
        <img
          src={user?.profile_pic ? user.profile_pic : "../../pic1.png"}
          className="mr-2 rounded-full h-22"
          alt="Profile Pic"
        />
        <div>
          {<h3>{user?.first_name}</h3>}
          {<p>@{user?.username}</p>}
        </div>
      </div>
    </div>
  );
};

export default Leftsidebar;
