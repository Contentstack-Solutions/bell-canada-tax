export default function ImageGallery({ content }) {
  return (
    <div className="max-w-7xl mx-auto mt-8 mb-8 px-8">
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">

        {/* ----- ITTERATING OVER ARRAY OF IMAGES COMING FROM CONTENTSTACK ----- */}
        {content.gallery_item.map((item, index) => (
          <div key={index} className="relative">
            <a href={item.page.length > 0 ? item.page[0].url : "#"}>
            <div className="bg-cover bg-bottom aspect-h-1 aspect-w-1 flex items-center justify-center" {...item?.$?.image}>
              <img src={item.image.url} className="object-cover" />
            </div>
            </a>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900" {...item?.$?.header}>
              {item.header}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}