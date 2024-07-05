import React from "react";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Emailconfirmation = () => {
  // const user = useParams();
  // const token = Cookies.get("token");
  const location = useLocation();
  const pathname = location.pathname;
  const token = pathname.substring(pathname.lastIndexOf("/") + 1);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const [isValid, setValidity] = useState(false);

  // useEffect(() => {
  //     console.log(token)
  //     console.log(userToken)
  //     if (token === userToken){

  //     }
  // })

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      await axios
        .post(`${backendUrl}/api/user/check-token/`, { token })
        .then((res) => {
          console.log(res);
          setValidity(true);
        })
        .catch((error) => {
          console.log(error);
          setValidity(false);
        });
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.dismiss();
      toast.info("Confirming email...", {
        autoClose: 300,
      });
    }
    if (data) {
      toast.dismiss();
      toast.success(
        "Succesful 👌 You can now login to join the Climate family",
        {
          autoClose: 300,
        }
      );
    }
    if (error) {
      toast.dismiss();
      toast.error("Confirmation failed 🤯, Please try again");
    }
  }, [isFetching, isPending, error]);

  return (
    <div className="grid md:grid-cols-[3fr_4fr] grid-cols-[1fr] items-center ">
      <div className=" bg-gradient-to-r from-slate-900 to-slate-700">
       <div className="bg-radial2  grid place-content-center h-[80vh] md:h-[100vh]">
        <img src="../../../logolargewhite.png" alt="" className="  z-10" />
        {/* Two bg boxes */}
        {/* <div className="absolute -top-5 -right-6 w-[700px] h-[700px] bg-radial-gradient opacity-95 rounded-full backdrop-blur-xl -z-0 border-none "></div> */}
        {/* <div className="absolute bottom-5 left-6 bg-black w-60 h-60 "></div> */}
      </div>
      </div>
      {isValid ? (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Confirming email✔</h1>
          <BiWinkSmile size={180} color="#008080" />
        </div>
      ) : (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Awww Snap, invalid or expired token</h1>
          <FaRegSadTear size={180} color="#008080" />
        </div>
      )}
    </div>
  );
};

export default Emailconfirmation;
