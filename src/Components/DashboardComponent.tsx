import React, { useState } from 'react'
import defaultPFP from '../../public/defaultPFP.jpg'
import Image from 'next/image'

const DashboardComponent = () => {
    const [username, setUsername] = useState<string>('Username')


    return (
        <div className='lg:mx-[72px] mt-16'>
            <div className='grid justify-center lg:justify-normal lg:grid-cols-2'>

                <div className=''>
                    <div className='bg-[#274632] w-[162px] md:w-[372px]  flex flex-col items-center rounded-[20px] py-8'>
                        <Image className='w-14 mr-2 lg:w-16 h-auto rounded-full mb-3' src={defaultPFP} alt='' />
                        <p className='text-white text-xl md:text-4xl'>{username}</p>
                    </div>
                </div>

                <div>
                    
                </div>

            </div>
        </div>
    )
}

export default DashboardComponent
