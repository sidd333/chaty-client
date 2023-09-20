import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Home = () => {
  //

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="relative h-screen overflow-y-clip">
      <div className="absolute top-0 z-10 bg-[rgba(1,1,1,.5)] w-full h-full">
        <div className="">
          {" "}
          <h1 className="text-gray-100 text-6xl text-center mt-40 mb-12">
            Come join our Network!
          </h1>
          <ul className="text-gray-100 text-center">
            <li className="my-1 text-2xl">Chat with friends</li>
            <li className="my-1 text-3xl">Create Groups</li>
            <li className="my-1 text-2xl">Share your Ideas</li>
            <li className="my-1 text-3xl">Join other groups</li>

            <li className="mt-10 text-5xl">
              Navigate to chat to begin your journey
            </li>
          </ul>
        </div>
      </div>
      <img
        className="w-full"
        src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt=""
      />
    </div>
  );
};

export default Home;
