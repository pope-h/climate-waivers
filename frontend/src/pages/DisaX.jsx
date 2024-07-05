import React from "react";
import Leftsidebar from "../components/Leftsidebar";
import Topbar from "../components/Topbar";
import { BsRobot } from "react-icons/bs";
import Chatcomponent from "../components/Chatcomponent";

const DisaXBot = () => {
  return (
    <div className="bg-bgGradient text-white ">
      <div className=" block md:hidden ">
        <Topbar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-3 md:px-20 h-[100vh] ">
        <Leftsidebar />
        <div className="text-xl text-center md:pt-5 items-center ">
          <div className="md:pb-3 px-[40%] md:pt-5 text-lg md:text-xl border-gray-500 border-b-2 font-semibold flex flex-row items-center">
            <BsRobot className="mr-2" />
            <h>WaverX</h>
          </div>
          <Chatcomponent />
        </div>
        <div className=" border-l-[1px] border-gray-500 hidden md:block pt-5 ">
          {/* Search btn */}
          <div className="  md:pl-6 ">
            <input
              className="bg-graylight p-1 ml-2 md:p-2 border-2 border-graydark rounded-full text-graydark w-[80%]"
              type="text"
              placeholder="🔍Search"
            />
          </div>
          <div className="bg-graydark min-h-[200px] m-4 rounded-xl ">
            <button className="bg-transparent outline outline-1 outline-[#008080] rounded-xl p-2  w-[100%] ">
              {" "}
              + New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisaXBot;
