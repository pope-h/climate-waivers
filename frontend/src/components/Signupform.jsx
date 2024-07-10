import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

export default function Signupform() {
  const {
    register,
    handleSubmit,
    reset,
    //formState
  } = useForm();

  //const formError = formState.errors;
  const inputStyle = {
    height: "55px",
    padding: "8px",
    margin: "18px 0px"
  }

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const onSubmit = (data) => {
    console.log(data);
    // Send data to API if needed
    const posterFn = async () => {
      await axios
        .post(`${backendUrl}/api/user/register/`, data)
        .then((response) => {
          Cookies.set("token", response.data.token);
          // Cookies.set("confirmationLink", response.data.confirmation_url);
          Cookies.set("userId", response.data.id);
        })
        .catch((error) => console.log(error));
    };
    toast.promise(posterFn, {
      pending: "Signing Up...",
      success: "Succesful 👌 Please confirm your account in your email",
      error: "An Error occured 🤯",
    });
    // Reset the form after submission
    reset({
      first_name: "",
      last_name: "",
      mobileNumber: "",
      password: "",
      username: "",
      email: "",
      bio: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto text-black p-3 md:p-6 mt-8 bg-linear rounded-md shadow-2xl shadow-indigo-700 flex flex-col"
      style={{
        padding: "45px 35px",
        width: "95%",
        maxWidth: "600px"
        
      }}
    >
      <h1 className="text-2xl text-white font-semibold mb-6 mt-8 md:mt-0 ">
                Sign up
              </h1>
      {/* Your input fields go here with register calls */}
      <div className="flex flex-row gap-2 ">
        <input
          type="text"
          className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
          placeholder="First name"
          {...register("first_name", { required: true, maxLength: 80 })}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Last name"
          className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
          {...register("last_name", { required: true, maxLength: 100 })}
          style={inputStyle}
        />
      </div>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("username", { required: true, maxLength: 100 })}
        style={inputStyle}
      />{" "}
      {/* <input
        type="text"
        placeholder="Bio"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("bio", { required: false })}
        style={inputStyle}
      /> */}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("password", { required: true, maxLength: 20 })}
        style={inputStyle}
      />
      {/* {formError.password && formError.password.type === "maxLength" && (
        <span className="text-red-500 text-sm mb-4 ">
          Password length is too long
        </span>
      )} */}
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        style={inputStyle}
      />
      {/* {formError.email && formError.email.type === "pattern" && (
        <span className="text-red-500 text-sm mb-4 ">
          This is not a valid email!
        </span>
      )} */}
      {/* <input
        type="tel"
        placeholder="Mobile number"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("mobileNumber", {
          required: true,
          minLength: 6,
          maxLength: 12,
          pattern: /^\d+$/,
        })}
        style={inputStyle}
      /> */}
      {/* {formError.mobileNumber &&
        formError.mobileNumber.type === "maxLength" && (
          <span className="text-red-500 text-sm mb-4 ">
            Phone number is too long{" "}
          </span>
        )}
      {formError.mobileNumber &&
        formError.mobileNumber.type === "minLength" && (
          <span className="text-red-500 text-sm mb-4 ">
            Phone number is too short{" "}
          </span>
        )}
      {formError.mobileNumber && formError.mobileNumber.type === "pattern" && (
        <span className="text-red-500 text-sm mb-4 ">
          Please make sure this is a valid phone number{" "}
        </span>
      )} */}
      <button
        className="w-full p-2 bg-purple-500 text-white rounded cursor-pointer z-10"
        type="submit"
        style={{
          fontSize: "20px",
          fontWeight: "580",
          marginTop: "25px",
          height: "55px"
        }}
      >
        Submit
      </button>
    </form>
  );
}
