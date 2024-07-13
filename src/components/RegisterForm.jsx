"use client";
import axios from "axios";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LoadingState from "./Loading";

const RegisterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const [isLoading, startTransition] = React.useTransition();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username must be required."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email must be required."),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Password must be required."),
    }),
    onSubmit: (values) => {
      startTransition(async () => {
        try {
          const response = await axios.put(
            "https://pazuru-com-api.stage.norway.everymatrix.com/v1/player/quickRegister",
            values
          );
          console.log("response.data", response.data);
          localStorage.setItem("registerInfo", JSON.stringify(response.data));
          toast.success("User Register Successfully!!!");
          router.push(`/${currentLang}/login`);
        } catch (error) {
          const message = error?.response?.data?.error || error?.message;
          const splitArrayMessage = message.split(", ")?.[2];
          toast.error(splitArrayMessage);
        }
      });
    },
  });
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-10 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-black dark:text-white"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                {...formik.getFieldProps("username")}
                className={
                  "block w-full rounded-md border-0 px-2.5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                  (formik.errors.username && formik.touched.username
                    ? " ring-red-500"
                    : "")
                }
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-black dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
                className={
                  "block w-full rounded-md border-0 px-2.5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                  (formik.errors.email && formik.touched.email
                    ? " ring-red-500"
                    : "")
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
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
                {...formik.getFieldProps("password")}
                className={
                  "block w-full rounded-md border-0 px-2.5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                  (formik.errors.password && formik.touched.password
                    ? " ring-red-500"
                    : "")
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className={`flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading == true ? true : false}
          >
            {isLoading ? <LoadingState /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
