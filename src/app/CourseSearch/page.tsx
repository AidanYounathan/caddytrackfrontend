'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import CourseSearchComponent from '@/Components/CourseSearchComponent'
import React from 'react'
import '@/app/CourseSearch/styles.css'

const Page = () => {
  return (
    <>
    <div className='bg-[#274632] h-screen DashBG'>
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

export default Page
