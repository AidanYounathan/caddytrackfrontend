'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import DashboardComponent from '@/Components/DashboardComponent'
import React from 'react'
import Image from 'next/image'
import '@/app/Dashboard/styles.css'

const Page = () => {

  return (
    <div className='DashBG h-[100vh]'>
    <NavbarComponent/>
    <DashboardComponent/>
    
    </div>
      
    
    
  )
}

export default Page
