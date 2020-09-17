export interface HeroProps {
  background: string;
  primaryText: string;
  secondaryText: string;
  isTopSection: boolean;
}

export function Hero({
  background,
  primaryText,
  secondaryText,
  isTopSection,
}: HeroProps) {
  return (
    <div
      className={`${
        isTopSection ? "" : "sm:mt-16 mt-4"
      } relative flex items-center justify-center px-4 py-48 bg-black sm:py-64`}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-inner">
        <img
          src={background}
          className="object-cover min-w-full min-h-full opacity-50"
        />
      </div>
      <div className="z-10 flex flex-col items-center max-w-4xl">
        {primaryText && (
          <h1 className="text-5xl font-semibold leading-tight tracking-wider text-center text-white">
            {primaryText}
          </h1>
        )}
        {secondaryText && (
          <h2 className="text-4xl font-semibold leading-tight tracking-wider text-center text-gray-300">
            {secondaryText}
          </h2>
        )}
      </div>
    </div>
  );
}
