export default function Hero({ content }) {
  return (
    <div className="bg-black">
      <div className="relative isolate overflow-hidden">

        {/* ----- BACKGROUND IMAGE FROM CONTENTSTACK ----- */}
        <img src={content?.background_image?.url} className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-75"/>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
          <div className="text-center">

            {/* ----- HEADER & TEXT FROM CONTENTSTACK ----- */}
            <h5 className="text-5xl font-bold text-center tracking-widest text-white leading-relaxed" {...content?.$?.title}>
              {content.title}
            </h5>
            
            <p className="mx-5 mt-8 font-normal text-lg leading-8 text-left text-white tracking-wide" {...content?.$?.text}>
              {content.text}
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                type="button"
                className="rounded-md px-8 py-4 text-md tracking-widest uppercase font-bold shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 bg-gray-50 hover:text-white hover:bg-gray-700 hover:ring-0"
                {...content?.cta.$?.title}
              >
                {content.cta.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
