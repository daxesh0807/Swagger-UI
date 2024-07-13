import React from "react";
import LoginForm from "src/components/LoginForm";

const page = ({ params }) => {
  const currentLang = params?.lang || "en";
  return <LoginForm currentLang={currentLang} />;
};

export default page;
