"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStart } from "src/redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";

const CasinoView = () => {
  // const dispatch = useDispatch();
  // const { data, isLoading, error } = useSelector((state) => state.someReducer);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserStart());
  }, [dispatch]);

  useEffect(() => {
    console.log("data:::::::::::", data);
    console.log("loading:::::::::::", loading);
    console.log("error:::::::::::", error);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
          Casino Page
        </h2>
      </div>
    </div>
  );
};

export default CasinoView;
