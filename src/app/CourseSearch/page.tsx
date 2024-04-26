'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import CourseSearchComponent from '@/Components/CourseSearchComponent'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='bg-[#274632] h-screen'>
      <NavbarComponent/>
      <div className="background w-auto  flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
          <CourseSearchComponent/>
          </div>
      </div>
    </div>
      
    
    </>
  )
}

export default page
