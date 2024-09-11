import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please Fill All The Feilds");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password Do Not Match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://mern-chat-app-backend-ofyf.onrender.com/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      toast.success("Registration Successful");
      localStorage.setItem("User", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
      toast.success("Sign up successful!");
    } catch (error) {
      toast.error(`Error Occured :${error.message}`);
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.error("Please select an image to upload.");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "deepakkevlani");
      fetch("https://api.cloudinary.com/v1_1/deepakkevlani/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.error("Please select an image to upload.");
      setLoading(false);
      return;
    }
  };

  return (
    <div className="mt-3 w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="email"
        />
        <div className="relative w-full">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 text-gray-700"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative w-full">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 text-gray-700"
          >
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <input
          type="file"
          name="pic"
          onChange={(e) => {
            setPic(e.target.files[0]);
            if (e.target.files[0]) postDetails(e.target.files[0]);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
