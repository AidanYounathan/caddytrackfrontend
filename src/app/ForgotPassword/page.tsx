'use client'

import BareNavBarComponent from "@/Components/BareNavBarComponent";
import ForgotComponent from "@/Components/ForgotComponent";
import '@/app/ForgotPassword/styles.css'

export default function Home() {

  return (
    <>
      <BareNavBarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
          <ForgotComponent/>
          </div>
      </div>
    
    </>
   
  );
}

