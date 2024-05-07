'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import ChatComponent from '@/Components/ChatComponent'
import React, { useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAppContext } from '@/Context/Context';
import { Button } from 'flowbite-react';

const Page = () => {

  return (
    <>
    <div className='h-screen'>
      <NavbarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[800px] mx-auto mt-[69px] lg:mt-[74px]">
         <ChatComponent/>
          </div>
      </div>
    </div>
    </>
    
  )
}

export default Page