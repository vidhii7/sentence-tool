
import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Header } from "@/components/sentence-construction/Header";
import { Stats } from "@/components/sentence-construction/Stats";
import { ActionButtons } from "@/components/sentence-construction/ActionButtons";

const Index: React.FC = () => {
  return (
    <div className="items-stretch bg-[#F8F8F8] flex flex-col overflow-hidden pb-[201px] max-md:pb-[100px]">
      <Navbar />
      <main className="self-center flex w-[627px] max-w-full flex-col items-center mt-[138px] max-md:mt-10">
        <div className="flex min-h-[366px] w-full max-w-[627px] flex-col items-stretch max-md:max-w-full">
          <Header />
          <Stats />
        </div>
        <ActionButtons />
      </main>
    </div>
  );
};

export default Index;
