import { Button } from 'flowbite-react'
import React from 'react'

type iObject = {
  name: string,
  stock: number,
  max: number,
  confidence: number
}

const ClubTrackerComponent = (props: iObject) => {
  return (
    <div className='flex justify-between '>
      <p>{props.name}</p>
      <p>{props.stock}</p>
      <p>{props.max}</p>
      <p>{props.confidence}</p>
      
      <Button color="blue">Edit Club</Button>
      <hr className=" h-[2px] bg-white" />
    </div>
    
  )
}

export default ClubTrackerComponent
