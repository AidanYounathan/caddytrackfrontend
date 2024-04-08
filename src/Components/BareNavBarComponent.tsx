'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/Assets/LOGO.png'


const BareNavBarComponent = () => {
  return (
    <div className='bg-[#E0E0E0] flex '>
      <div className='my-2 lg:my-4 ml-2 lg:ml-5 flex items-center'>
        <Image src={logo} alt='Caddy Track logo' className='w-12 lg:w-24 h-auto' />
      </div>
      <div className='flex-grow flex ml-[-12%] md:ml-[-5%] items-center justify-center'>
      <p className='FuturaHeavy text-center text-4xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl'>Caddy Track</p>
      </div>
    </div>
  )
}

export default BareNavBarComponent
