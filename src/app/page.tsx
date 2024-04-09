'use client'
import Image from "next/image";
import BareNavBarComponent from "../Components/BareNavBarComponent";
import { Button } from "flowbite-react";
import leftGolfer from '../Assets/lftGolfer.png'
import TRClubs from '../Assets/TRClubs.png'
import BRClubs from '../Assets/30BRClubs.png'
import {useRouter} from 'next/navigation'

export default function Home() {

  const router = useRouter()


  return (
    <main className="">
      <BareNavBarComponent/>

      <div className="mt-[65px] mx-[3%] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-full">
          {/* Left Side */}
          <div className="flex flex-col mb-[50px] lg:justify-center lg:mt-[-45%]">
            <div className="">
              <p className="text-[40px] lg:mb-[33px] lg:text-8xl">Elevate Your Game</p>
            <p className="text-[#6B7280] mb-2 lg:mb-[33px] lg:text-5xl">Track your clubs effortlessly</p>
            <Button className="bg-[#84CC16] lg:w-[545px] lg:h-[82px] lg:text-[40px] text-[20px]" ><span className="lg:text-[40px] text-[20px]">Start Tracking</span></Button>
            </div>
          </div>
          {/* Right Side */}
          <div className="grid grid-cols-2 gap-[18px] lg:gap-[20px]">
            {/* left side */}
            <div>
              <Image className="rounded-[10px] lg:rounded-[25px] lg:h-[70%]" src={leftGolfer} alt="Man Swinging Golf Club"></Image>
            </div>
            {/* Right Side */}
            <div className="">
              <div><Image className="rounded-[10px] lg:rounded-[25px] mb-[16px] lg:mb-[28px]" src={TRClubs} alt=""></Image></div>
              <div><Image className="rounded-[10px] lg:rounded-[25px]" src={BRClubs} alt=""></Image></div>
            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
