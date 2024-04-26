import NavbarComponent from '@/Components/NavBarComponent'
import ChatComponent from '@/Components/ChatComponent'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='h-screen'>
      <NavbarComponent/>

      <div className="background w-auto  flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
         <ChatComponent/>
          </div>
      </div>
      
      
    </div>
    
    
    </>
    
  )
}

export default page