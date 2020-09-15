import data from "@forestry/pages/home.json";

export default function HomeMePage() {
  return data.sections.map(({ template }) => {
    return <p>{template}</p>;
  });
}
