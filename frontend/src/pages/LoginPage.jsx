import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

//const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
//const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

const Loginpage = () => {
  const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL

  return (
    <div className="text-white grid md:grid-cols-[3fr_4fr] grid-cols-[1fr] bg-gradient-to-r from-slate-900 to-slate-700 items-center ">
      {/* from-fuchsia-500 to-purple-600 */}
      {/* bg-gradient-to-r relative from-slate-100 via-slate-50 to-purple-200 */}
      <div className="bg-radial2  grid place-content-center h-[80vh] md:h-[100vh]   ">
        <img src="../../logolargewhite.png" alt="" className=" z-10"  />
        {/* Two bg boxes */}
        {/* <div className="absolute -top-5 -right-6 w-[700px] h-[700px] bg-radial-gradient opacity-95 rounded-full backdrop-blur-xl -z-0 border-none "></div> */}
        {/* <div className="absolute bottom-5 left-6 bg-black w-60 h-60 "></div> */}
      </div>
      <div className="flex flex-col text-center text-black items-center gap-4 -mt-[550px] md:mt-0 bg-white border md:border-0 border-gray-300 h-screen justify-center w-[90%] md:w-[100%] justify-self-center p-3 ">
        <><div className="flex flex-row mb-2 items-center md:text-xl text-base  font-semibold bg-linear text-white p-4 rounded-full  ">
            {/* outline outline-1 ---> Styles removed text-white p-4 rounded-full -----> Styles added */}
            <FcGoogle className="mr-2 bg-white p-2 rounded-full " size={32} /> Continue in with Google
          </div>
          <div className="flex flex-row gap-6 items-center  p-4 justify-center  py-1 ">
            <a href={`${oauthUrl}/api/v1/auth/github`} >
              <BsGithub color="black" size={34} />
              {/* <img className="w-[35px]" src="../../github.png" alt="" /> */}
            </a>
            <a href={`${oauthUrl}/api/v1/auth/facebook`}  >
              {/* className="p-1 rounded-full bg-white " */}
              <BsFacebook color="black" size={34} />
              {/* <img className="w-[35px]" src="../../fb.jpg" alt="" /> */}
            </a>
            <a href={`${oauthUrl}/api/v1/auth/linkedin`} >
              <FaLinkedin color="black" size={34} />
              {/* <img className="w-[35px]" src="../../link.png" alt="" /> */}
            </a>
          </div>
          <p>or</p>
          <Login />
          <Link to={"/forgotpassword"}>
            <p className="text-lg font-semibold hover:cursor-pointer ">
              Forgot password?
            </p>
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="underline text-green">
              Sign up
            </Link>{" "}
          </p>
        </>
      </div>
    </div>
  );
};

export default Loginpage;
