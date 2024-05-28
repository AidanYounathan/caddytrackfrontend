'use client'
import { useAppContext } from '@/Context/Context'
import { IMsg } from '@/DataServices/Interfaces/Interfaces'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { PiPaperPlaneRightBold, PiPlusBold } from 'react-icons/pi'
import { MessageComponent } from './MessageComponent'
import defaultPfp from "../../public/defaultPFP.jpg";
import { GetUserPfp } from '@/DataServices/DataServices'
import { Spinner } from "flowbite-react";

//JoinChatroom(data.user, "Chat")

const ChatComponent = () => {

  const data = useAppContext();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [connection, setConnection] = useState<any>(null);
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {

    if(loaded){
      if(data.user != ""){
        if(connection == null)
          JoinChatroom(data.user, "Fairway Chat");
      }
  
      const chatbox = document.getElementById("chatbox") as Element;
      chatbox.scrollTop = chatbox.scrollHeight;
    }
    else
      setLoaded(true);

  }, [data.user, messages])

  const JoinChatroom = async (username:string, chatroom:string) => {

    try
    {
        const conn = new HubConnectionBuilder().withUrl("https://caddytrackapi.azurewebsites.net/Chat").configureLogging(LogLevel.Information).build();
      
        conn.on("JoinSpecificChat", async (username:string, msg:string) => {
          const pfp = await getPfp(username);
          setMessages(messages => [...messages, {username, msg, pfp}])
          setJoined(true);
        })

        conn.on("ReceiveSpecificMessage", async (username:string, msg:string) => {
          const pfp = await getPfp(username);
          setMessages(messages => [...messages, {username, msg, pfp}])
        })

        await conn.start();
        await conn.invoke("JoinSpecificChat", {username, chatroom}); 

        setConnection(conn);
    }
    catch(e){
      console.log(e);
    }
  }

  async function getPfp(n:string) {
    const pfp = await GetUserPfp(n);

    if(pfp != null && pfp != ""){
      return (pfp);
    }
    else{
      return (defaultPfp.src);
    }
}    

  const sendMessage = async () => {
    try
    {
      await connection.invoke("SendMessage", message);
      setMessage('');
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <div className="bg-[#D0D1D1] opacity-[98%] text-black rounded-xl py-5 w-full">
        <h1 className="text-3xl text-center pb-4 tracking-wide">Fairway Chats</h1>

{/* Message Box */}
        <div className='ml-5 overflow-y-scroll overflow-x-hidden max-h-80 min-h-80 break-normal' id="chatbox">
          <div className={`flex flex-col space-y-4 justify-center items-center p-20 ${joined ? "hidden" : ""} `}>
            <Spinner aria-label="Default status example" size="xl" />
            <p className={`${data.user == "" ? "hidden" : ""}`}>Joining Fairway Chats as {data.user}...</p>
          </div>
        { // Messages spawnpoint
          messages.map((msg:IMsg, index) => {
            return( // User with a different name message element
              <MessageComponent message={msg} BlankPfp={(index > 0 && messages[index - 1].username != msg.username) || index == 0} key={index}></MessageComponent>
            );

          })
        }
          
        </div>
{/* Message Box */}

        <TextInput className='pl-10 pr-10 mt-10' id="input" type="text" icon={PiPlusBold} rightIcon={PiPaperPlaneRightBold} placeholder="Enter Text Here" value={message} onChange={(e) => {setMessage(e.target.value)}} onKeyDown={
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