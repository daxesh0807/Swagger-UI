"use client";

import { Provider } from "react-redux";
import store from "src/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children, lang }) {
  const router = useRouter();
  useEffect(() => {
    const sessionId = Cookies.get("sessionID");

    if (!sessionId) {
      router.push(`/${lang}/login`);
    }
  }, [router]);
  return <Provider store={store}>{children}</Provider>;
}
