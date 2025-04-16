import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="justify-between items-center shadow-[0px_2px_36px_0px_rgba(0,0,0,0.08)] backdrop-blur-[25px] bg-[rgba(248,248,248,0.75)] flex w-full gap-[40px_100px] flex-wrap px-20 max-md:max-w-full max-md:px-5">
      <div className="self-stretch flex items-center gap-2 w-[136px] my-auto">
        <div className="self-stretch flex min-h-16 gap-2 my-auto" />
      </div>
      <div className="self-stretch min-h-16 gap-4 text-lg text-[#414343] font-medium tracking-[-0.18px] leading-loose w-[193px] my-auto rounded-lg">
        Sentence Construction
      </div>
      <div className="self-stretch flex items-center gap-2 w-[136px] my-auto">
        <div className="self-stretch flex min-h-16 w-16 items-center gap-2.5 justify-center my-auto rounded-lg">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fc9e1ea1f5754895d03be90f63e13a4b8740470?placeholderIfAbsent=true"
            alt="Navigation icon"
            className="aspect-[1] object-contain w-6 self-stretch my-auto"
          />
        </div>
      </div>
    </nav>
  );
};
