import { NavLink } from "react-router-dom";

const Communityselector = () => {
  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-10 text-white list-none  m-4 rounded-2xl ">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-white bg-opacity-25 rounded-b-none rounded-2xl"
            : "hover:bg-graydark p-2"
        }
        to={"/"}
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-white bg-opacity-25  "
            : "hover:bg-graydark p-2"
        }
        to={"/community"}
      >
        Community
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-white bg-opacity-25   "
            : "hover:bg-graydark p-2"
        }
        to={"/education"}
      >
        Education
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-white bg-opacity-25   "
            : "hover:bg-graydark p-2"
        }
        to={"/happeningnow"}
      >
        Disaster Reports
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-white bg-opacity-25 rounded-t-none  rounded-2xl "
            : "hover:bg-graydark p-2"
        }
        to={"/disaX"}
      >
        DisaX
      </NavLink>
    </div>
  );
};

export default Communityselector;
