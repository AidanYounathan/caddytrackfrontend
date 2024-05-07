import { GetUserPfp } from '@/DataServices/DataServices'
import { IMsg } from '@/DataServices/Interfaces/Interfaces'
import React, { useEffect, useState } from 'react'

interface props {
    message: IMsg
    BlankPfp: boolean
}

export const MessageComponent = (props: props) => {

    const [messagePfp, setMessagePfp] = useState<string>("");

    useEffect(() => {
        getPfp(props.message.username);
    })

    async function getPfp(n:string) {
        const pfp = await GetUserPfp(n);
    
        if(pfp != null && pfp != ""){
          setMessagePfp(pfp);
        }
        else
          setMessagePfp('../../public/defaultPFP.jpg');
    }    

if(props.BlankPfp) 
  return (
    <div>
        
    <div className='flex pt-4'>
        <img className='w-12 mr-2 lg:w-12 h-auto rounded-full' src={messagePfp} width={100} height={100} alt='' />
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
    <img className='w-12 mr-2 lg:w-12 h-auto rounded-full' src="" alt='' />
    <p> {props.message.msg} </p>
    </div>
)

}