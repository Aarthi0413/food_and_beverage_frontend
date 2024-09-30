import React, { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
      console.log(response);
      // setSuccess("Signup successful!");
      setError("");
      setData({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      // setError(error.response ? error.response.data.message : "An error occurred");
      // setSuccess("");
      const errorMessage = error.response ? error.response.data.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div id="signup" className="font-serif signup-background">
      <div className="mx-auto container p-4">
        <div className="bg-transparent p-5 w-full max-w-sm ml-auto">
          <form className="pt-6 pb-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <h1 className="text-orange-500 text-center text-lg font-bold">Signup</h1>
              <label className="block text-white text-sm font-bold mb-2">Name</label>
              <div className="bg-white-100 p-2 flex border rounded shadow mb-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent text-white"
                />
              </div>
            </div>
            <div className="grid">
              <label className="block text-white text-sm font-bold mb-2">Email</label>
              <div className="bg-white-100 p-2 flex border rounded shadow mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-bold mb-2">Password</label>
              <div className="bg-white-100 p-2 flex border rounded shadow mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent text-white"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-bold mb-2">Confirm Password</label>
              <div className="bg-white-100 p-2 flex border rounded shadow mb-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent text-white"
                />

                <div
                  className="cursor-pointer text-xl bg-transparent"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <p className="my-5 text-white">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-orange-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
