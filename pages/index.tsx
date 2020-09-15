import data from "@forestry/pages/home.json";

interface HeroSectionProps {
  background: string;
}

function HeroSection({ background }: HeroSectionProps) {
  return (
    <pre className="relative px-4 py-56 bg-cool-gray-600">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img src={background} />
        <style jsx>{`
          img {
            min-height: 120%;
            min-width: 120%;
          }
        `}</style>
      </div>
    </pre>
  );
}

interface ShortBiographySectionProps {}

function ShortBiographySection(props: ShortBiographySectionProps) {
  return <pre className="p-4">{JSON.stringify(props, null, 2)}</pre>;
}

interface NewsletterSignUpSectionProps {}

function NewsletterSignUpSection(props: NewsletterSignUpSectionProps) {
  return <pre className="p-4">{JSON.stringify(props, null, 2)}</pre>;
}

export default function HomeMePage() {
  return data.sections.map(({ template, ...props }) => {
    switch (template) {
      case "hero-section":
        return <HeroSection {...props} />;
      case "short-biography-section":
        return <ShortBiographySection {...props} />;
      case "newsletter-sign-up-section":
        return <NewsletterSignUpSection {...props.customization} />;
    }
    return <p>{template}</p>;
  });
}
