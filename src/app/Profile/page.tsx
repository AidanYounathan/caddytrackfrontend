import NavbarComponent from '@/Components/NavBarComponent'
import React from 'react'
import '@/app/Profile/styles.css'
import ProfilePageComponent from '@/Components/ProfilePageComponent'

// stop being capital
const page = () => {
  return (
    <div className='h-[100vh] DashBG'>
        <NavbarComponent/>
        <div className="md:w-[500px] lg:w-[600px] xl:w-[700px] mx-5 md:mx-auto mt-[69px] lg:mt-[14px]">
          <ProfilePageComponent />
        </div>
        
    </div>
  )
}

export default page