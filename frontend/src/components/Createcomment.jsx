import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { MdOutlinePhotoCamera } from "react-icons/md";
import Accountcard from "./Accountcard";

const Createcomment = ({ postId, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);


  //const formError = formState.errors;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");
  const page =  import.meta.env.VITE_APP_URL

  console.log(useParams());
  const onSubmit = (data) => {
    // Send data to API if needed
    const posterFn = async () => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
      data.post = postId;
      if (!data.image[0]) {
        delete data.image;
        console.log(data);
      } else {
        data.image = data.image[0];
      }
      await axios
        .post(`${backendUrl}/api/comment/`, data, {
          headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    };
    toast.promise(
      posterFn,
      {
        pending: "Submitting comment..",
        success: "Comment posted 👌",
        error: "An Error occured 🤯",
      },
      {
        autoClose: 200,
      }
    );
    // Reset the form after submission
    reset();
    closeModal()
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-3 md:p-6 bg-white rounded-md d flex  w-[30vw] max-md:w-[80vw] flex-col"
      >
        <div className=" flex justify-between gap-4 ">
          {/* <Accountcard user={user} /> */}
          <img src="../../pic1.png" alt="" className="w-10 h-10" />
          <select
            className=" rounded-full p-2 mb-3 border text-sm text-[#008080] focus:border-green focus:outline-none"
            {...register("category", { required: true })}
          >
            <option value="community">Community</option>
            <option value="education">Educational</option>
            <option value="happening">Disaster Report</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <textarea
          type="text"
          placeholder="Comment"
          className=" p-8 mb-3 border text-black rounded-2xl h-40 max-h-70 overflow-y-auto focus:border-[#000000] focus:outline-gray-500"
          {...register("comment", { required: true })}
        />
        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <div className=" flex justify-between items-center ">
          <label htmlFor="image">
            <MdOutlinePhotoCamera size={22} color={"#008080"} />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="p-0 mb-1 hidden border rounded focus:border-green focus:outline-none"
            {...register("image", { required: false })}
            onChange={handleImageChange}
          />

          <button
            className="px-10 py-1 mx-1 bg-[#008080] text-white rounded-full cursor-pointer z-10"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

Createcomment.propTypes = {
  postId: PropTypes.string,
};

export default Createcomment;
