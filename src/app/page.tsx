'use client'
import Image from "next/image";
import BareNavBarComponent from "../Components/BareNavBarComponent";
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <main className="">
      <BareNavBarComponent/>

      <div className="mt-[65px] mx-[3%] h-lvh">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side */}
          <div className="flex flex-col lg:justify-center lg:mt-[-20%]">
            <p className="text-[40px] lg:text-8xl">Elevate Your Game</p>
            <p className="text-[#6B7280] lg:text-5xl">Track your clubs effortlessly</p>
            <Button className="bg-[#84CC16] lg:w-[545px] lg:h-[82px]" >Blue</Button>
          </div>
          {/* Right Side */}
          <div>

          </div>
        </div>
      </div>
    </main>
  );
}
