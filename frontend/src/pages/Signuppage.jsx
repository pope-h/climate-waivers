import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import Signupform from "../components/Signupform";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

import "./styles/signup-page.css";

const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

const Signuppage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="grid signup  md:grid-cols-[3fr_4fr] grid-cols-[1fr] bg-gradient-to-r from-slate-900 to-slate-700  items-center text-black ">
        <div className=" bg-radial2  grid place-content-center h-[80vh] md:h-[100vh] banner ">
          <div className="writeup">
            <h2>Join Climate Wavers</h2>
            <p>
              Connect on our AI-driven social network for effectiive climate disaster
              responses, donate to relief efforts, and together we plant
              trees around the world. Be part of the solution — Sign up Now!
            </p>
          </div>
          <img src="../../Vector.svg" alt="" className=" fill-[#008080]"/>
        </div>
        <div className="form-main flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-white border md:border-0 border-gray-300 h-screen  w-[90%] md:w-[100%] justify-self-center rounded-none p-3 ">
          {isFormOpen === false ? (
            <>
              {/* <h1 className="text-2xl text-grey font-semibold mb-3 mt-8 md:mt-0 ">
                Sign up
              </h1> */}
              <Signupform/>
              <p className="or">or</p>
              {/* <a href={`${oauthUrl}/api/v1/auth/new-google`}>
                <div
                  className="google-btn mb-3 items-center md:text-xl text-base  font-semibold bg-linear text-white p-4 rounded-full rounded-full "
                  // onClick={() => googleSigninFunction()}
                >
                  <FcGoogle className="mr-2  icn" size={32} /> Continue in with
                  Google
                </div>
              </a> */}
              <div className="social-wrapper flex flex-row gap-6 items-center  p-4 justify-center  py-1 ">
                <a href={`${oauthUrl}/api/v1/auth/new-google`}>
                  <FcGoogle color="black" size={34} />
                  {/* <img className="w-[35px]" src="../../github.png" alt="" /> */}
                </a>
                <a href={`${oauthUrl}/api/v1/auth/github`}>
                  <BsGithub color="black" size={34} />
                  {/* <img className="w-[35px]" src="../../github.png" alt="" /> */}
                </a>
                <a href={`${oauthUrl}/api/v1/auth/facebook`}>
                  {/* className="p-1 rounded-full bg-white " */}
                  <BsFacebook color="black" size={34} />
                  {/* <img className="w-[35px]" src="../../fb.jpg" alt="" /> */}
                </a>
                <a href={`${oauthUrl}/api/v1/auth/linkedin`}>
                  <FaLinkedin color="black" size={34} />
                  {/* <img className="w-[35px]" src="../../link.png" alt="" /> */}
                </a>
              </div>
              {/* <button
                className="md:text-xl text-base font-semibold bg-white hover:bg-gray-200 text-black  p-4 rounded-full w-[50%] "
                onClick={() => setIsFormOpen(true)}
              >
                Sign Up
              </button> */}
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="underline text-green">
                  Sign in
                </Link>{" "}
              </p>
            </>
          ) : (
            <div className="bg-white to-slate-850 max-w-md mx-auto p-3 md:p-6 rounded-md shadow-md flex flex-col ">
              <AiOutlineClose
                className="mb-3"
                size={28}
                onClick={() => setIsFormOpen(false)}
              />
              <Signupform />
            </div>
          )}

          {isFormOpen === true ? (
            <button
              onClick={() => handleResendEmail()}
              className="w-[20%] p-2 bg-green text-white rounded cursor-pointer z-10 absolute -bottom-[100px] right-2 "
            >
              Resend email
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Signuppage;
