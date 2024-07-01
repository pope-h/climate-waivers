import { useForm } from "react-hook-form";
//import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accountcard from "./Accountcard";

export default function Createpost() {
  const { register, handleSubmit, reset } = useForm();

  //const formError = formState.errors;

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  //const modelResponseUrl = import.meta.env.VITE_APP_MODEL_RESPONSE_URL;
  const accessToken = Cookies.get("token");
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  //const username = Cookies.get("username");

  useEffect(() => {
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          toast(error, {
            autoClose: 1500,
          });
        }
      );
    } else {
      toast("Geolocation is not supported by your browser", {
        autoClose: 2500,
      });
    }
  }, []);
  /*
  const aiAnalyze = async (data, postId) => {
    data["username"] = username;
    data["message"] = data.text;
    if (data.image) {
      data["image"] = data.picture[0];
    }
    data["postId"] = postId;
    data["location"] = location
      ? `${location.longitude},${location.latitude}`
      : "53.6,42.3";
    await axios
      .post(`${modelResponseUrl}/api/chatbot`, data)
      .then((response) => {
        console.log(response.data);
        Cookies.set("access_token", response.data.access_token);
        toast.success("DisaX just analyzed your report, check it out", {
          autoClose: 2500,
        });
      })
      .catch((error) => console.log(error));
  };
*/
  const onSubmit = (data) => {
    // Send data to API if needed
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
    navigate(-1)
  };


  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-3 md:p-6 bg-white rounded-md shadow-md flex flex-col"
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
        className="  p-0 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("image", { required: false })}
        />
        <button
          className="px-10 py-1 bg-linear text-white rounded-full cursor-pointer z-10"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
    </>
  );
}
