
import React from "react";
import { useGame } from "@/contexts/GameContext";

export const ActionButtons: React.FC = () => {
  const { startGame } = useGame();

  return (
    <div className="flex items-center gap-4 text-base font-medium whitespace-nowrap text-center tracking-[-0.16px] leading-none mt-16 max-md:mt-10">
      <button
        className="self-stretch min-h-[42px] gap-2 text-[#453FE1] w-[140px] my-auto px-6 py-2.5 rounded-lg max-md:px-5 hover:bg-[#453FE1]/5 transition-colors"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <button
        className="self-stretch bg-[#453FE1] min-h-[42px] gap-2 text-white w-[140px] my-auto px-6 py-2.5 rounded-lg max-md:px-5 hover:bg-[#453FE1]/90 transition-colors"
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
};
