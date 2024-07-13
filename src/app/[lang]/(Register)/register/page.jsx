import RegisterForm from "src/components/RegisterForm";

export default function RegisterPage({ params }) {
  const currentLang = params?.lang || "en";
  return <RegisterForm currentLang={currentLang} />;
}
