'use client'

import NavbarComponent from '@/Components/NavBarComponent'
import ChatComponent from '@/Components/ChatComponent'
import React, { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAppContext } from '@/Context/Context';

const page = () => {

  const data = useAppContext();
  const [conn, setConnection] = useState<any>();
  const [messages, setMessages] = useState<object[]>([]);

  useEffect(() => {
    JoinChatroom(data.user, "Chat");
  }, [])

  const JoinChatroom = async (username:string, chatroom:string) => {
    try{
      const conn = new HubConnectionBuilder().withUrl("http://localhost:3000").configureLogging(LogLevel.Information).build();
    
      conn.on("JoinSpecificChat", (username, msg) => {
        console.log("msg: ", msg);
      })

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatroom", {username: data.user, chat: "chatroom"}); 
      
      setConnection(conn);
    }
    catch(e){
      console.log(e);
    }
  }

  return (

    <>
    <div >
      <NavbarComponent/>
      <div className="background w-auto h-screen flex">
         <div className="w-[400px] mx-auto mt-[69px] lg:mt-[74px]">
         <ChatComponent/>
          </div>
      </div>
    </div>
    </>
    
  )
}

export default page