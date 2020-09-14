import data from "@forestry/pages/home.json";

export default function AboutMePage() {
  return <pre className="p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>;
}
