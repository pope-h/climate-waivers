import { useForm } from "react-hook-form";
//import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accountcard from "./Accountcard";
import { getAuthToken } from "../utils/factory";
import { getUser } from "../utils/factory";
import { uploadFiles } from "../services/upload.service";



const rs_backend_url = import.meta.env.VITE_APP_BACKEND_URL

export default function Createpost({closeModal}) {
  const { register, handleSubmit, reset } = useForm();

  //const formError = formState.errors;
  const user = getUser()

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  //const modelResponseUrl = import.meta.env.VITE_APP_MODEL_RESPONSE_URL;
  const accessToken = getAuthToken()
  const navigate = useNavigate();

  //const username = Cookies.get("username");

  useEffect(() => {
    // This code is not needed anymore, location is gotten from ip address, add a text to tell user to turn off vpn if he is using one.

    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       // Extract latitude and longitude from the position object
    //       const { latitude, longitude } = position.coords;
    //       setLocation({ latitude, longitude });
    //     },
    //     (error) => {
    //       toast(error, {
    //         autoClose: 1500,
    //       });
    //     }
    //   );
    // } else {
    //   toast("Geolocation is not supported by your browser", {
    //     autoClose: 2500,
    //   });
    // }


  }, []);



  const onSubmit = (data) => {
    // Send data to API if needed
    handleReportSubmission()
    const posterFn = async () => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
      if (!data.image[0]) {
        delete data.image
        console.log(data)
      }
      else {
        data.image = data.image[0];
      }
      await axios
        .post(`${backendUrl}/api/post/`, data, {
          headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          //if (data.category == "Happening") {
            //aiAnalyze(data, response.data.posts.id);
          //}
        })
        .catch((error) => console.log(error));
    };
    toast.promise(
      posterFn,
      {
        pending: "Submitting post..",
        success: "Post Successful 👌",
        error: "An Error occured 🤯",
      },
      {
        autoClose: 800,
      }
    );
    // Reset the form after submission
    reset();
    closeModal()
    // navigate("/")
  };

  const formRef = useRef()

  async function handleReportSubmission(){
    const formData = new FormData(formRef.current)
    const entries = Object.fromEntries(formData.entries())
    let imageUrl
    if(entries.image){
      imageUrl = await uploadFiles(entries.image)
    }
    const data = {...entries}
    if(data.category !== "happening")return
    if(imageUrl){
      if(imageUrl.length == 1){
        data.image = imageUrl[0]
      }else{
        data.image = imageUrl
      }
    }
    try{
      const url = rs_backend_url + "/posts"

    const payload = {...data, username: getUser().username, userId: getUser().id, body: data.content, content: undefined, category: undefined}

    const res = await axios.post(url, payload)
    closeModal()
      
    }catch(err){
      console.log(err, err.response)
    }
  }


  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-3 md:p-6 bg-white rounded-md shadow-md flex flex-col"
      ref={formRef}
    >
      <div className=" flex justify-between gap-4 ">
        {/* <Accountcard user={user} /> */}
        <img src="../../pic1.png" alt="" className="w-10 h-10" />
        <select
          className=" rounded-full p-2 mb-3 border text-sm focus:border-green focus:outline-none"
          {...register("category", { required: true })}
       >  
          <option value="">Select Category</option>
          <option value="community">Community</option>
          <option value="education">Educational</option>
          <option value="happening">Disaster Report</option>
          {/* Add more options as needed */}
        </select>
      </div>
      
      <textarea
        type="text"
        placeholder="Description"
        className=" p-2 mb-3 border text-black rounded-2xl focus:border-green focus:outline-none"
        {...register("content", { required: true })}
      />
      <div className=" flex justify-between items-center ">
        <input
        type="file"
        className="  p-0 mb-1 border rounded focus:border-green focus:outline-none"
        {...register("image", { required: false })}
        />
        <button
          className="px-10 py-1 mx-1 bg-linear text-white rounded-lg cursor-pointer z-10"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
    </>
  );
}
