"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import LoadingState from "./Loading";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie] = useCookies(["sessionID", "universalID"]);
  const validationSchema = yup.object({
    username: yup.string().required("Username must be required."),
    password: yup.string().required("Password is required"),
  });

  const [isLoading, startTransition] = React.useTransition();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const currentLang = pathname.split("/")[1] || "en";
      startTransition(async () => {
        try {
          const response = await axios.post(
            "https://pazuru-com-api.stage.norway.everymatrix.com/v1/player/login/Player",
            values
          );
          console.log("response.data", response.data);
          setCookie("sessionID", response.data?.sessionID, {
            path: "/",
            maxAge: 20 * 60 * 60, // 20 hours in seconds
          });

          setCookie("universalID", response.data?.universalID, {
            path: "/",
            maxAge: 20 * 60 * 60, // 20 hours in seconds
          });
          toast.success("User Login Successfully!!!");
          router.push(`/${currentLang}/casino`);
        } catch (error) {
          const message = error?.response?.data?.error || error?.message;
          const splitArrayMessage = message.split(", ")?.[2];
          toast.error(splitArrayMessage);
        }
      });
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
          Log In to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-black dark:text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                {...formik.getFieldProps("username")}
                className={
                  "block w-full rounded-md border-0 px-2.5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                  (formik.errors.username && formik.touched.username
                    ? " ring-red-500"
                    : "")
                }
              />
              {formik.errors.username && formik.touched.username && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.username}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-black dark:text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...formik.getFieldProps("password")}
                className={
                  "block w-full rounded-md px-2.5 border-0 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                  (formik.errors.password && formik.touched.password
                    ? " ring-red-500"
                    : "")
                }
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={
                "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" +
                (isLoading ? " cursor-not-allowed" : "")
              }
              disabled={isLoading == true ? true : false}
            >
              {isLoading ? <LoadingState /> : " Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
