'use client'

import LoginComponent from "@/Components/LoginComponent";
import BareNavBarComponent from "@/Components/BareNavBarComponent";
import '@/app/Login/styles.css'

export default function Home() {

  return (
    <>
    <div className="bg">
      <BareNavBarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
          <LoginComponent/>
          </div>
      </div>
    </div>
      
    
    </>
   
  );
}
