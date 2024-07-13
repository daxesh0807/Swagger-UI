"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Switch,
} from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const SideWithNav = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const navigation = [
    { name: t("login"), href: `/login`, current: pathname.endsWith("/login") },
    {
      name: t("register"),
      href: `/register`,
      current: pathname.endsWith("/register"),
    },
    {
      name: t("casino"),
      href: `/casino`,
      current: pathname.endsWith("/casino"),
    },
    {
      name: t("live-casino"),
      href: `/live-casino`,
      current: pathname.endsWith("/live-casino"),
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleChangeLanguage = (e) => {
    const newLocale = e.target.value;
    const currentRoute = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${currentRoute}`);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsDark(newTheme === "dark");
  };
  return (
    <>
      <Disclosure
        as="nav"
        className=" fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        {({ open }) => (
          <>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <div className="flex items-center lg:hidden">
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">{t("openMainMenu")}</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                  <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                    <img
                      alt={t("companyLogo")}
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-auto"
                    />
                    <span className="sm:flex hidden self-center text-xl ms-3 font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                      Swegger UI
                    </span>
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="lg:flex space-x-4 hidden">
                    {navigation.map((item, index) => {
                      if (index <= 1)
                        return (
                          <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={`/${currentLang}${item.href}`}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                          >
                            {item.name}
                          </DisclosureButton>
                        );
                    })}
                  </div>
                  <div className=" flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <select
                      id="language"
                      name="language"
                      className="block w-full mr-4 rounded-md border-0 py-1.5 text-gray-400 shadow-sm focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleChangeLanguage}
                      value={pathname.split("/")[1]}
                    >
                      <option value="en">{t("english")}</option>
                      <option value="ar">{t("arabic")}</option>
                    </select>
                  </div>
                  <Switch
                    checked={isDark}
                    onChange={handleThemeToggle}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                  >
                    <span className="sr-only">{t("toggleTheme")}</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ",
                        isRTL
                          ? "group-data-[checked]:-translate-x-3.5"
                          : "group-data-[checked]:translate-x-3.5"
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
            <DisclosurePanel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={`/${currentLang}${item.href}`}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {navigation.map((item, index) => {
              if (index >= 2)
                return (
                  <li key={item.name}>
                    <a
                      href={`/${currentLang}${item.href}`}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ms-3"> {item.name}</span>
                    </a>
                  </li>
                );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideWithNav;
