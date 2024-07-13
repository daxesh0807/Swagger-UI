"use client";

import { NextIntlClientProvider } from "next-intl";

const IntlProvider = ({ children, locale, messages }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
