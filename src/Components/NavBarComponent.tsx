'use client'

import React from 'react'
import Image from 'next/image'
import logo from '@/Assets/LOGO.png'
import { Button } from 'flowbite-react'

const NavbarComponent = () => {

    const hello = () => {
        console
    }


    return (
        <div className='bg-[#E0E0E0] shadow-sm bg-opacity-50  flex'>
            <div className='my-2 lg:my-4 ml-2 lg:ml-5 flex items-center'>
                <Image src={logo} alt='Caddy Track logo' className='w-12 lg:w-24 h-auto' />
            </div>
            <div className=' ml-[40px] lg:ml-[95px] lg:text-2xl text-[14px] flex items-center '>
                <p className='mr-2 cursor-pointer' onClick={() => { alert('hello') }}>Home</p>
                <p className='mr-2'>Course Search</p>
                <p className='mr-2'> Chat</p>
            </div>

        </div>
    )
}

export default NavbarComponent
