import { BsPerson, BsFillHouseFill, BsBookmark, BsRobot, BsPeople } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { useState } from "react";
import { FaDonate } from "react-icons/fa";


const Menu = () => {
  const user = JSON.parse(Cookies.get("user"));
  const [isModalOpen, setIsModalopen] = useState(false)

  return (
    <div className="flex flex-col px-6">
      {/* Menu */}
      <div className="list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear"
              : "flex items-center rounded-full p-2  hover:bg-linear"
          }
        >
          <BsFillHouseFill className="mr-1" color="" />
          Home
        </NavLink>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : "flex items-center rounded-full p-2  hover:bg-linear "
          }
        >
          <BsPeople className="mr-1" />
          Community
        </NavLink>
        <NavLink
          to={`/${user.id}/disaX`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : "flex items-center rounded-full p-2  hover:bg-linear "
          }
        >
          <BsRobot className="mr-1" />
          DisaX
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : "flex items-center rounded-full p-2  hover:bg-linear "
          }
        >
          <BsPerson className="mr-1" />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : "flex items-center rounded-full p-2  hover:bg-linear "
          }
        >
          <BsBookmark className="mr-1" />
          Bookmarks
        </NavLink>
        <NavLink
          to={`/wallet`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : "flex items-center rounded-full p-2  hover:bg-linear "
          }
        >
          <FaDonate className="mr-1" />
          Wallet
        </NavLink>
      </div>
      {/* Post btn */}
      <Link
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-white text-black shadow-md shadow-white  hover:from-fuchsia-600 hover:to-purple-700 p-3 rounded-full"
        onClick={() => setIsModalopen(true)}
      >
        Post
      </Link>
      {
        isModalOpen && 
        <Modal closeFn={() => setIsModalopen(false)}> 
          <Createpost />
        </Modal> 
      }
    </div>
  );
};

export default Menu;
