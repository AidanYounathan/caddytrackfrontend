'use client'
import Image from "next/image";
import BareNavBarComponent from "../Components/BareNavBarComponent";
import { Button } from "flowbite-react";
import leftGolfer from '@/Assets/lftGolfer.png'
import TRClubs from '@/Assets/TRClubs.png'
import BRClubs from '@/Assets/30BRClubs.png'
import { useRouter } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { motion } from "framer-motion"

export default function Home() {

  const router = useRouter()

  const startTracking = () => {
    router.push('/Login')
  }


  return (
    <main className="">
      <BareNavBarComponent />

      <div className="mt-[44px] lg:mt-[65px] mx-[31px]  lg:mx-[3%] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Side */}
          <div   className="flex flex-col mb-[50px] lg:justify-center ">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: .8 }} className="">
              <p className=" text-[54px] TxtGr font-bold lg:mb-[33px] lg:text-7xl xl:text-9xl">Caddy Track</p>
              <p className="text-[40px] lg:mb-[33px] lg:text-7xl xl:text-8xl">Elevate Your Game</p>
              <p className="text-[#6B7280] mb-3 lg:mb-[33px] text-2xl lg:text-5xl">Track your clubs effortlessly</p>
              <Button onClick={startTracking} className="bg-[#84CC16] shadow-lg w-[277px] md:w-[434px] xl:w-[545px] md:h-[82px] lg:text-[40px] text-[20px]" ><span className="lg:text-[40px] text-[20px]">Start Tracking</span></Button>
            </motion.div>
          </div>
          {/* Right Side */}





          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: .8 }} className="grid grid-cols-2 gap-[18px] lg:gap-[20px]">
            {/* left side */}
            <div>
              <Image className="rounded-[10px] lg:rounded-[25px] h-full" src={leftGolfer} alt="Man Swinging Golf Club"></Image>
            </div>
            {/* Right Side */}
            <div className="">
              <div><Image className="rounded-[10px] lg:rounded-[25px] mb-[16px] lg:mb-[28px]" src={TRClubs} alt=""></Image></div>
              <div><Image className="rounded-[10px] lg:rounded-[25px]" src={BRClubs} alt=""></Image></div>
              <Analytics />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
