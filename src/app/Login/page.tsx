'use client'
import LoginComponent from "@/Components/LoginComponent";
import BareNavBarComponent from "@/Components/BareNavBarComponent";
import '@/app/Login/styles.css'

export default function Home() {

  return (
    <>
      <BareNavBarComponent/>
      <div className="background w-screen h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
          <LoginComponent/>
          </div>
      </div>
    
    </>
   
  );
}
