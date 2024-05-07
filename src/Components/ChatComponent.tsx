'use client'
import { useAppContext } from '@/Context/Context'
import { GetUserData } from '@/DataServices/DataServices'
import { IMsg, IUserInfo } from '@/DataServices/Interfaces/Interfaces'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { PiPaperPlaneRightBold, PiPlusBold } from 'react-icons/pi'
import { VscAdd } from 'react-icons/vsc'
import { MessageComponent } from './MessageComponent'

//JoinChatroom(data.user, "Chat")

const ChatComponent = () => {

  const data = useAppContext();

  const [connection, setConnection] = useState<any>();
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {

    if(data.user != ""){
      JoinChatroom(data.user, "Fairway Chat");
    }

  }, [data.user])

  const JoinChatroom = async (username:string, chatroom:string) => {

    try
    {
        const conn = new HubConnectionBuilder().withUrl("https://caddytrackapi.azurewebsites.net/Chat").configureLogging(LogLevel.Information).build();
      
        conn.on("JoinSpecificChat", (username:string, msg:string) => {
          setMessages(messages => [...messages, {username, msg}])
        })

        conn.on("ReceiveSpecificMessage", (username:string, msg:string) => {
          setMessages(messages => [...messages, {username, msg}])
        })

        await conn.start();
        await conn.invoke("JoinSpecificChat", {username, chatroom}); 

        setConnection(conn);
    }
    catch(e){
      console.log(e);
    }
  }

  const sendMessage = () => {
    try
    {
      connection.invoke("SendMessage", message);

      const input = document.getElementById("input") as HTMLInputElement; // Reset text input
      input.value = "";

      const elem = document.getElementById("chatbox") as Element;
      elem.scrollTop = elem.scrollHeight+100;
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <div className="bg-black text-white rounded-xl py-5 w-full">
        <h1 className="text-3xl text-center pb-4 tracking-wide">Fairway Chats</h1>

{/* Message Box */}
        <div className='ml-5 overflow-y-scroll max-h-80 min-h-80' id="chatbox">

        { // Messages spawnpoint
          messages.map((msg:IMsg, index) => {
            return( // User with a different name message element
              <MessageComponent message={msg} BlankPfp={index > 0 && messages[index - 1].username != msg.username} key={index}></MessageComponent>
            );

          })
        }
          
        </div>
{/* Message Box */}

        <TextInput className='pl-10 pr-10 mt-10' id="input" type="text" icon={PiPlusBold} rightIcon={PiPaperPlaneRightBold} placeholder="Enter Text Here" onChange={(e) => {setMessage(e.target.value)}} onKeyDown={
          (e) => {
            if(e.key == "Enter"){
              sendMessage();
            }
          }
          } required />
      </div>
    </>
  )
}

export default ChatComponent