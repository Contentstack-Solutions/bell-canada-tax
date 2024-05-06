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
  const [banners, setBanners] = useState([]);
  const [province, setProvince] = useState("");
  const [loading, SetLoading] = useState(true);

  const getContent = async () => {
    const entry = await Stack.getElementWithRefs(
      "bltcaca00efbb33dc3e",
      "home_page",
      ["hero_banner", "page_content.image_gallery.gallery_item.page"]
    );
    // console.log("homepage:", entry);

    const banners = await Stack.getAllEntriesByType("hero_banner");
    // console.log("homepage:", entry);
    setBanners(banners);

    setEntry(entry);
    SetLoading(false);
  };

  // const getBanners = async () => {

  // };

  useEffect(() => {

    onEntryChange(getContent);
  }, []);



  if (loading) {
    return;
  }

  console.log(banners);

  function ProvinceSelector() {
    const notificationMethods = [
      { id: "", title: "Default" },
      { id: "ontario", title: "Ontario" },
      { id: "quebec", title: "Quebec" },
    ];

    return (
      <div className="flex flex-row justify-center">
        <fieldset className="m-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            {notificationMethods.map((notificationMethod) => (
              <div key={notificationMethod.id} className="flex items-center">
                <input
                  id={notificationMethod.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={notificationMethod.id == province}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onClick={(e) => {setProvince(notificationMethod.id)}}
                />
                <label
                  htmlFor={notificationMethod.id}
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  {notificationMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  function BannerWrapper() {
    if (province === "") {
      const result = banners[0].filter(banner => !banner.taxonomies);
      return  <Hero content={result[0]} />
    }
    
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
