"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStart } from "src/redux/userSlice";
import LoadingState from "./Loading";

const CasinoView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserStart());
  }, [dispatch]);

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
        {loading ? (
          <div className="mt-10 text-center text-2xl leading-9 tracking-tight text-black dark:text-white">
            <LoadingState />
          </div>
        ) : (
          <>
            <h5 className="mt-10 text-center text-2xl leading-9 tracking-tight text-black dark:text-white">
              User Name: {data?.Username}
            </h5>
            <h5 className="mt-10 text-center text-2xl leading-9 tracking-tight text-black dark:text-white">
              Full Name: {data?.Firstname} {data?.Surname}
            </h5>
            <h5 className="mt-10 text-center text-2xl leading-9 tracking-tight text-black dark:text-white">
              Email: {data?.Email}
            </h5>
          </>
        )}
      </div>
    </div>
  );
};

export default CasinoView;
