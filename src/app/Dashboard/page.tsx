'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import DashboardComponent from '@/Components/DashboardComponent'
import React from 'react'

const page = () => {

  return (

    <>
    <div >
      <NavbarComponent/>

      <div className="background w-auto h-screen flex">
         <div>
         <DashboardComponent/>
          </div>
      </div>
      
    </div>
    
    </>
    
  )
}

export default page
