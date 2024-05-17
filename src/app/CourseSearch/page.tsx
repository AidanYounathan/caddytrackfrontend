'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import CourseSearchComponent from '@/Components/CourseSearchComponent'
import React from 'react'
import '@/app/CourseSearch/styles.css'

const Page = () => {
  return (
    <>
      <div className='bg-[#274632] h-screen DashBG'>
        <NavbarComponent />
        <CourseSearchComponent />
      </div>
    </>
  )
}

export default Page
