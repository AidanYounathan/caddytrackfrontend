'use client'
import LoginComponent from "@/Components/LoginComponent";
import BareNavBarComponent from "@/Components/BareNavBarComponent";


export default function Home() {

  return (
    <>
      <BareNavBarComponent/>
      <div className="background w-screen h-screen flex">
         <div className="w-[400px] m-auto">
          <LoginComponent/>
          </div>
      </div>
    
    </>
   
  );
}
