"use client";

import { NextIntlClientProvider } from "next-intl";

const IntlProvider = ({ children, locale, messages }) => {
  console.log("local:::::::::", locale)
  console.log("messages:::::::::", messages)
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
