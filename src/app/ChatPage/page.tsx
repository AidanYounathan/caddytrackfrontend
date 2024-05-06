'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import ChatComponent from '@/Components/ChatComponent'
import React, { useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAppContext } from '@/Context/Context';
import { Button } from 'flowbite-react';

const Page = () => {

  const data = useAppContext();
  const [messages, setMessages] = useState<object[]>([]);

  const JoinChatroom = async (username:string, chatroom:string) => {
    try{

        const conn = new HubConnectionBuilder().withUrl("https://caddytrackapi.azurewebsites.net/Chat").configureLogging(LogLevel.Information).build();
      
        conn.on("JoinSpecificChat", (username:string, msg:string) => {
          console.log("msg: ", msg);
        })

        conn.on("ReceiveSpecificMessage", (username:string, msg:string) => {
          setMessages(messages => [...messages, {username, msg}])
        })

        await conn.start();
        await conn.invoke("JoinSpecificChat", {username, chatroom}); 
    }
    catch(e){
      console.log(e);
    }
  }

  return (

    <>
    <div className='h-screen'>
      <NavbarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
         <Button onClick={() => {JoinChatroom(data.user, "Chat")}}>Join</Button>
         <ChatComponent/>
          </div>
      </div>
    </div>
    </>
    
  )
}

export default Page