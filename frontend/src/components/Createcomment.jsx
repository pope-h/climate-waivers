import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const Createcomment = ({postId}) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  //const formError = formState.errors;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");

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
    navigate(`${postId}/comments`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-3 md:p-6 bg-stone rounded-md shadow-md flex flex-col"
    >
      <textarea
        type="text"
        placeholder="Comment"
        className="w-full p-2 mb-3 text-black border rounded focus:border-green focus:outline-none"
        {...register("content", { required: true })}
      />
      <input
        type="file"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("image", { required: false })}
      />
      <button
        className="w-full p-2 bg-green bg-purple-500 text-white rounded cursor-pointer z-10"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

Createcomment.propTypes = {
  postId: PropTypes.string,
};

export default Createcomment