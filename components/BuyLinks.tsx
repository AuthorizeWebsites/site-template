export function BuyLinks({ buyLinks }: { buyLinks: any[] }) {
  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-xl">
      <h1 className="px-4 pt-4 text-4xl font-semibold leading-tight tracking-wider text-center text-white uppercase sm:text-left">
        Available Here
      </h1>
      <div className="flex flex-col items-stretch p-2 sm:flex-row sm:flex-wrap">
        {buyLinks?.map((buyLink) => (
          <div key={buyLink.link} className="p-2 ">
            <a
              href={buyLink.link}
              target="_blank"
              rel="noopener"
              className="block px-4 py-2 text-2xl font-bold leading-tight tracking-widest text-center text-white uppercase bg-orange-500 rounded-md shadow-xl hover:bg-orange-400"
            >
              {buyLink.platform === "Other"
                ? buyLink.customPlatformName
                : buyLink.platform}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
