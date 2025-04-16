import React from "react";
import { Divider } from "@/components/ui/Divider";
import { CoinIcon } from "@/components/icons/CoinIcon";

export const Stats: React.FC = () => {
  return (
    <div className="self-center flex items-center gap-8 font-medium flex-wrap mt-24 max-md:max-w-full max-md:mt-10">
      <div className="self-stretch text-center w-[177px] my-auto">
        <h2 className="text-[#2A2D2D] text-xl leading-[1.4]">
          Time Per Question
        </h2>
        <p className="text-[#7C8181] text-lg leading-loose tracking-[-0.18px] mt-4">
          30 sec
        </p>
      </div>
      <Divider />
      <div className="self-stretch text-center w-[161px] my-auto">
        <h2 className="text-[#2A2D2D] text-xl leading-[1.4]">
          Total Questions
        </h2>
        <p className="text-[#7C8181] text-lg leading-loose tracking-[-0.18px] mt-4">
          10
        </p>
      </div>
      <Divider />
      <div className="self-stretch flex flex-col items-stretch whitespace-nowrap w-[161px] my-auto">
        <h2 className="text-[#2A2D2D] text-center text-xl leading-[1.4]">
          Coins
        </h2>
        <div className="self-center flex items-center gap-1 text-base text-[#414343] tracking-[-0.16px] leading-none justify-center mt-4">
          <CoinIcon />
          <span className="self-stretch my-auto">0</span>
        </div>
      </div>
    </div>
  );
};
