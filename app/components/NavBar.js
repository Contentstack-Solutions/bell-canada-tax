"use client";
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "../../lib/index";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [entry, setEntry] = useState({});
  const [loading, SetLoading] = useState(true);

  const getContent = async () => {
    const entry = await Stack.getElementWithRefs(
      "blt72f3cc1b5ff28c4a",
      "menu",
      [""]
    );
    console.log("header:", entry);
    setEntry(entry);
    SetLoading(false);
  };

  useEffect(() => {
    onEntryChange(getContent);
  }, []);

  if (loading) {
    return;
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">

            {/* ----- LOGO IMAGE SERVED FROM CONTENTSTACK ----- */}
            <img
              className="h-8 w-auto"
              src={entry?.logo?.url}
              alt=""
              {...entry?.$?.logo}
            />

          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">

          {/* ----- ITTERATE OVER ARRAY FROM CONTENTSTACK ----- */}
          {entry.menu_items?.map((item) => (
            <a
              key={item.menu_item.title}
              href={item.menu_item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
              {...item?.menu_item?.$?.title}
            >
              {item.menu_item.title}
            </a>
          ))}

        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="https://www.contentstack.com/docs/developers"
            target="__blank"
          >
            <InformationCircleIcon
              className="h-6 w-6 flex-none text-neutral-800"
            />
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">

            {/* ----- LOGO FROM CONTENTSTACK FOR MOBILE MENU ----- */}
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={entry?.logo?.url} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 ">
              <div className="space-y-2 py-6">

                {/* ----- ITTERATE OVER ARRAY FROM CONTENTSTACK FOR MOBILE MENU ----- */}
                {entry?.menu_item?.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    {...item?.$?.title}
                  >
                    {item.title}
                  </a>
                ))}
                <a
                  key={"docs"}
                  href="https://www.contentstack.com/docs/developers"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
