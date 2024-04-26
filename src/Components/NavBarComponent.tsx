'use client'

import React, { use, useState } from 'react'
import Image from 'next/image'
import logo from '@/Assets/LOGO.png'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import defaultPFP from '../../public/defaultPFP.jpg'


const NavbarComponent = () => {

    const [pfp, setPfp] = useState<string>('../../public/defaultPFP.jpg')
    const [userName, setUsername] = useState<string>('User');
    const [email, setEmail] = useState<string>('UserEmail@Email.com');

    return (
    <Navbar fluid className='bg-[#cccccc] shadow-lg bg-opacity-50' >
    <Navbar.Brand >
      <Image src={logo} className="mr-2 w-14 lg:w-16 h-auto" alt="Caddy Track Logo"/>
      <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">CaddyTrack</span>
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Image className='w-14 mr-2 lg:w-16 h-auto rounded-full' src={defaultPFP} alt='' />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{userName}</span>
          <span className="block truncate text-sm font-medium">{email}</span>
        </Dropdown.Header>
        
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse className='md:ml-[-10%] lg:ml-[-7%]'>
      <Navbar.Link href="#" className='text-xl'>Home</Navbar.Link>
      <Navbar.Link href="#" className='text-xl'>Course Search</Navbar.Link>
      <Navbar.Link href="#" className='text-xl'>Chat</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>



    )
}

export default NavbarComponent
