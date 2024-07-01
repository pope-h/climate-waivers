import Menu from "./Menu";
import Cookies from "js-cookie";

const Leftsidebar = () => {
  const user = JSON.parse(Cookies.get("user"));
  console.log(user);

  return (
    <div className=" border-r-[1px] border-gray-500 hidden md:block pt-5 ">
      {/* Logo */}
      <div className=" flex gap-3 items-center justify-self-center md:justify-self-start ">
        <div className="w-[70px]">
          <img src="../../Vector.png" />
        </div>
        <div className="flex flex-col  font-semibold text-[24px]">
          <h1>DisaXta</h1>
        </div>
      </div>
      <Menu />
      {/* Name box */}
      <div className="flex flex- items-center my-7 self-center ">
        <img
          src={user.profile_pic ? user.profile_pic : "../../avatar.png"}
          className="mr-2 rounded-full h-12"
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
