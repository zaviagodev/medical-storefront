"use client";

import { useState, useEffect, Fragment } from "react";
import {
  getLocales,
  Locale,
  getSelectedLocale,
  setSelectedLocale,
} from "../../../../lib/data/locale";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { clx } from "@medusajs/ui";
import { GlobeEurope } from "@medusajs/icons";

export const LocaleSelect = ({ className }: { className?: string }) => {
  const [locales, setLocales] = useState<Locale[]>([]);
  const [locale, setLocale] = useState<Locale | undefined>();

  useEffect(() => {
    getLocales().then(({ locales }) => {
      setLocales(locales as Locale[]);
    });
  }, []);

  useEffect(() => {
    if (!locales.length || locale) {
      return;
    }

    getSelectedLocale().then((locale) => {
      const localeDetails = locales.find((l) => l.code === locale);
      setLocale(localeDetails);
    });
  }, [locales]);

  useEffect(() => {
    if (locale) {
      setSelectedLocale(locale.code);
    }
  }, [locale]);

  const handleChange = (locale: Locale) => {
    setLocale(locale);
  };

  return (
    <div className={clx("relative", className)}>
      <Listbox as="div" value={locale} onChange={handleChange}>
        {({ open }) => (
          <>
            <ListboxButton
              className={clx(
                "text-white px-0 py-0 bg-transparent border-none shadow-none focus:outline-none cursor-pointer flex items-center justify-center gap-x-2",
                "uppercase"
              )}
              style={{ minWidth: 32 }}
            >
              <GlobeEurope className="-mr-1 w-4 h-4" />
              {locale ? locale.code : ""}
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                className="absolute right-0 mt-2 w-24 bg-white rounded shadow-lg z-50"
                static
              >
                {locales?.map((l, index) => (
                  <ListboxOption
                    key={index}
                    value={l}
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black"
                  >
                    {l.code}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default LocaleSelect;
