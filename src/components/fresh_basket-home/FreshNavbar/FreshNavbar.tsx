"use client";

import { useFreshBasketStore } from "@/lib/stores/fresh-basket";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiSeedlingFill } from "react-icons/ri";
import FreshProductCart from "../FreshProductCart/FreshProductCart";
import { Flex, Link } from "@chakra-ui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FreshNavbar() {
  const { navigation, setNavigation } = useFreshBasketStore((state) => state);

  const handleSetNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setNavigation(href);
  };

  return (
    <Disclosure
      as="nav"
      className="fixed bg-gray-800 z-10 top-0 left-0 right-0"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <IoMdMenu
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <IoCloseSharp
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <Link href="/" className="flex shrink-0 items-center">
              <RiSeedlingFill size={40} color={"white"} />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={(e) => handleSetNavigation(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Flex className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <FreshProductCart />
          </Flex>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
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
    </Disclosure>
  );
}
