import { Button } from 'flowbite-react'
import React from 'react'

type iObject = {
  id: number,
  name: string,
  stock: number,
  max: number,
  confidence: number,
  openEditTracker: (name: string, max:number, stock:number, confidence:number, id:number) => void
}

const ClubTrackerComponent = (props: iObject) => {
  return (
    <>
    <div className='grid grid-cols-5  pt-3 ml-28 '>
      <div><p>{props.name}</p></div>
      <div className='ml-[17%]'><p>{props.stock}</p></div>
      <div className='ml-[30%]'><p>{props.max}</p></div>
      <div className='text-center'><p>{props.confidence}</p></div>
      <div className='flex justify-center'><Button color="blue" onClick={() => {props.openEditTracker(props.name, props.max, props.stock, props.confidence, props.id)}}>Edit Club</Button></div>
    </div>
    <hr className="mt-3 h-[2px] bg-white" />
    </>
  )
}

export default ClubTrackerComponent
