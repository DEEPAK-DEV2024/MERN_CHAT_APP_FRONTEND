import React, { useEffect, useState } from "react";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="w-[300px] md:w-96 m-auto flex flex-col justify-center items-center rounded-md md:rounded-none">
      <div className="text-4xl mt-8 bg-white w-full text-center p-4 text-black rounded-lg shadow-md">
        Talk To Everyone
      </div>
      <div className="bg-white w-[300px] md:w-96 p-1 mt-4 rounded-md font-bold text-lg mb-10">
        <div className="flex w-full">
          <button
            className={`p-2 rounded-s-md hover:bg-blue-600 hover:text-gray-300 transition duration-300 w-6/12 ${
              showSignIn
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-blue-500"
            }`}
            onClick={() => setShowSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`p-2 rounded-e-md hover:bg-blue-600 hover:text-gray-300 transition duration-300 w-6/12 ${
              !showSignIn
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-blue-500"
            }`}
            onClick={() => setShowSignIn(false)}
          >
            Sign Up
          </button>
        </div>
        {showSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Home;
