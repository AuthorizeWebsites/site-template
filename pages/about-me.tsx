import data from "@forestry/pages/about-me.json";

export default function AboutMePage() {
  return (
    <div className="p-8 mx-auto prose divide-y-4 divide-gray-500 max-w-7xl">
      <div>Header: {data.header}</div>
      <div>
        Headshot: <img src={data.headshot} />
      </div>
      <div>
        Life Story:{" "}
        <div dangerouslySetInnerHTML={{ __html: data.your_life_story }} />
      </div>
    </div>
  );
}
