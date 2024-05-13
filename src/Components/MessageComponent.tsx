'use client'
import { IMsg } from '@/DataServices/Interfaces/Interfaces'
import React from 'react'
interface props {
    message: IMsg
    BlankPfp: boolean
}

export const MessageComponent = (props: props) => {

if(props.BlankPfp) 
  return (
    <div>
        
    <div className='flex pt-4'>
        <img className='w-12 mr-2 h-auto rounded-full' src={props.message.pfp} width={100} height={100} alt='' />
        <div>
        <h1 className='font-bold'>{props.message.username}</h1>
        <p> {props.message.msg} </p>
        </div>
    </div>

    </div>
  )
else
  return(
    <div className='flex p-0 m-0'>
      <img className='w-12 mr-2 h-auto rounded-full' src="" alt='' />
      <p> {props.message.msg} </p>
    </div>
)

}