import data from "@forestry/pages/about-me.json";

export default function AboutMePage() {
  return (
    <div className="flex flex-col items-center px-4 pt-8 space-y-8">
      <h1 className="text-4xl font-semibold leading-tight tracking-wider text-gray-800">
        {data.header}
      </h1>
      <div className="max-w-6xl mx-auto">
        <img
          src={data.headshot}
          className="float-left w-full mb-4 mr-4 rounded-md shadow-lg sm:h-96 sm:w-auto"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.yourLifeStory }}
          className="prose sm:prose-lg max-w-none"
        ></div>
      </div>
    </div>
  );
}
