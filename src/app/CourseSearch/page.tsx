'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import CourseSearchComponent from '@/Components/CourseSearchComponent'
import React from 'react'

const Page = () => {
  return (
    <>
    <div className='bg-[#274632]'>
      <NavbarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
          <CourseSearchComponent/>
          </div>
      </div>
    </div>
    </>
  )
}

export default Page
