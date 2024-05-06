import {
  GlobeEuropeAfricaIcon,
  SunIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/20/solid";

export default function TextBlock({ content }) {
  function icon() {
    if (content.icon == "Globe") {
      return (
        <GlobeEuropeAfricaIcon
          className="h-10 w-10 flex-none text-cyan-600"
          aria-hidden="true"
          {...content?.$?.icon}
        />
      );
    } else if (content.icon == "Sun") {
      return (
        <SunIcon
          className="h-10 w-10 flex-none text-cyan-600"
          aria-hidden="true"
          {...content?.$?.icon}
        />
      );
    } else if (content.icon == "Euro") {
      return (
        <CurrencyEuroIcon
          className="h-10 w-10 flex-none text-cyan-600"
          aria-hidden="true"
          {...content?.$?.icon}
        />
      );
    } else if (content.icon == "None") {
      return <></>;
    }
  }

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <dt className="flex items-center gap-x-3 text-base font-semibold text-gray-900 justify-center">
            {/* ----- ICON COMING FROM SELECT MENU IN CONTENTSTACK ----- */}
            {icon()}
          </dt>

          <h5
            className="mt-8 text-2xl font-bold text-center tracking-widest text-neutral-700"
            {...content?.$?.header}
          >
            {content.header}
          </h5>

          <p
            className="mx-5 mt-8 font-normal text-left leading-8 text-gray-700 text-block whitespace-pre-line"
            {...content?.$?.text}
          >
            {content.multi}
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="rounded-md  px-8 py-4 text-md tracking-widest uppercase font-bold text-cyan-600 shadow-sm ring-2 ring-inset ring-cyan-600 hover:text-white hover:bg-cyan-600"
              {...content?.cta[0].$?.title}
            >
              <a href={content.cta[0].href}>{content.cta[0].title}</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
