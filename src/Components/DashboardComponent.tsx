import React from 'react'
import defaultPFP from '../../public/defaultPFP.jpg'
import Image from 'next/image'

const DashboardComponent = () => {
  return (
    <div className=''>
      <div className='grid lg:grid-cols-2'>

        <div>
            <div className='bg-[#274632] w-1/2  py-8'>
            <Image className='w-14 mr-2 lg:w-16 h-auto rounded-full' src={defaultPFP} alt='' />
            
            </div>
        </div>

        <div>

        </div>

      </div>
    </div>
  )
}

export default DashboardComponent
