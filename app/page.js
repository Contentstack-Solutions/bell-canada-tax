"use client";
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "../lib/index";
import Footer from "./components/Footer";
import TextBlock from "./components/TextBlock";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ImageGallery from "./components/ImageGallery";

export default function Home({ params }) {
  const [entry, setEntry] = useState({});

  // Array of all banners, coming from the line 29 call
  const [banners, setBanners] = useState([]);

  // State object that holds the current selected province
  const [province, setProvince] = useState("default");

  const [loading, SetLoading] = useState(true);

  const getContent = async () => {
    const entry = await Stack.getElementWithRefs(
      "bltcaca00efbb33dc3e",
      "home_page",
      ["hero_banner", "page_content.image_gallery.gallery_item.page"]
    );

    // API call to Contentstack calling all hero_banner entries
    const banners = await Stack.getAllEntriesByType("hero_banner");
    setBanners(banners);

    setEntry(entry);
    SetLoading(false);
  };

  useEffect(() => {
    onEntryChange(getContent);
  }, []);

  if (loading) {
    return;
  }

  function ProvinceSelector() {
    const provinces = [
      { id: "default", title: "Default" },
      { id: "ontario", title: "Ontario" },
      { id: "quebec", title: "Quebec" },
    ];

    return (
      <div className="flex flex-row justify-center">
        <fieldset className="m-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">

            {/* Mapping over hard-coded province options */}
            {provinces.map((provinceItem) => (
              <div key={provinceItem.id} className="flex items-center">
                <input
                  id={provinceItem.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={provinceItem.id == province}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"

                  // Setting the province state, which will be used to filter through all hero_banner entries
                  onClick={(e) => {setProvince(provinceItem.id)}}
                />
                <label
                  htmlFor={provinceItem.id}
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  {provinceItem.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  function BannerWrapper() {

    // If there is no province selected, use the default hero banner which has no taxonomy
    if (province === "default") {
      const result = banners[0].filter(banner => !banner.taxonomies);
      return  <Hero content={result[0]} />
    }
    
    // If there is a province selected, map through the hero banners and find the one that matches the taxonomy selected
    else {
      const result = banners[0].filter(banner => !!banner.taxonomies)
      .filter((banner) => banner.taxonomies[0].term_uid == province);
      return <Hero content={result[0]} />
    }
  }

  return (
    <>
      <NavBar />

      <ProvinceSelector />

      <BannerWrapper />

      {entry.page_content?.map((item, index) => {
        if (item.hasOwnProperty("text_block")) {
          return <TextBlock key={index} content={item.text_block} />;
        }
        if (item.hasOwnProperty("image_gallery")) {
          return <ImageGallery key={index} content={item.image_gallery} />;
        }
      })}

      <Footer />
    </>
  );
}
