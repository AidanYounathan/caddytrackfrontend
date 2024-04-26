import { TextInput } from 'flowbite-react'
import React from 'react'
import { PiPaperPlaneRightBold, PiPlusBold } from 'react-icons/pi'
import { VscAdd } from 'react-icons/vsc'

const ChatComponent = () => {
  return (
    
    <>
   
    <div className="bg-black text-white rounded-xl py-5">
    <h1 className="text-3xl text-center pb-4 tracking-wide">Fairway Chats</h1>

    <div className='ml-5'>Chats here</div>

    <TextInput className='pl-10 pr-10 mt-10' id="" type="text" icon={PiPlusBold} rightIcon={PiPaperPlaneRightBold} placeholder="Enter Text Here" required />
    </div>
    
    
    
    
    
    
    
    </>
  )
}

export default ChatComponent