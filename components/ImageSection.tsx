import React from "react";

export interface ImageSectionProps {
  imgUrl: string;
  children?: React.ReactNode;
}

export function ImageSection({ imgUrl, children }: ImageSectionProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 py-32 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-inner opacity-50">
        <img
          src={imgUrl}
          className="object-cover object-center w-full h-auto BIG-BLUR"
          style={{ minHeight: "120%", minWidth: "120%" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden shadow-inner opacity-25">
        <img
          src={imgUrl}
          className="object-cover object-center w-full h-auto BLUR"
          style={{ minHeight: "120%", minWidth: "120%" }}
        />
      </div>
      <style jsx>{`
        .BLUR {
          filter: blur(25px) saturate(200%);
        }
        .BIG-BLUR {
          filter: blur(100px) saturate(200%);
        }
      `}</style>
      <img
        src={imgUrl}
        className="relative z-10 w-auto rounded-md shadow-lg max-h-96"
      />
      <div className="z-10">{children}</div>
    </div>
  );
}
