import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex h-[198px] w-full flex-col items-stretch text-center max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e5b6ade105c746f96924b802a97bc45cec57ce5?placeholderIfAbsent=true"
        alt="Sentence Construction"
        className="aspect-[1] object-contain w-[72px] self-center"
      />
      <div className="w-full mt-8 max-md:max-w-full">
        <h1 className="text-[#0F1010] text-[40px] font-semibold leading-none max-md:max-w-full">
          Sentence Construction
        </h1>
        <p className="text-[#7C8181] text-xl font-normal leading-7 tracking-[-0.2px] mt-3 max-md:max-w-full">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </div>
    </header>
  );
};
