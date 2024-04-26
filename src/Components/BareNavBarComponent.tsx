'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/Assets/LOGO.png'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'


const BareNavBarComponent = () => {
  return (
    <Navbar className='bg-[#cccccc] shadow-lg bg-opacity-50' fluid >
      <Navbar.Brand href="https://flowbite-react.com">
        <Image src={logo} className="mr-2 w-10 lg:w-16 h-auto" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">CaddyTrack</span>
      </Navbar.Brand>
    </Navbar>
  )
}

export default BareNavBarComponent
