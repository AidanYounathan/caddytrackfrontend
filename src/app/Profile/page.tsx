import NavbarComponent from '@/Components/NavBarComponent'
import React from 'react'
import '@/app/Profile/styles.css'
import ProfilePageComponent from '@/Components/ProfilePageComponent'

// stop being capital
const page = () => {
  return (
    <div className='h-[100vh] DashBG'>
        <NavbarComponent/>
        <div className="w-[420px] mx-auto mt-[69px] lg:mt-[74px]">
          <ProfilePageComponent />
        </div>
        
    </div>
  )
}

export default page
