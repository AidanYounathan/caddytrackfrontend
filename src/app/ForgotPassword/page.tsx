'use client'

import React, { useState } from 'react'
import { Label, TextInput, Button } from "flowbite-react";
import { ForgotPassword } from '@/DataServices/DataServices';
import { useRouter } from 'next/navigation';

const Page = () => {

  const [username, setUsername] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [result, setResult] = useState<string>("");

  const router = useRouter();

  const Forgot = async () => {

    if(pass == "" || username == ""){
      setResult("Please fill out all fields.");
      return;
    }

    const r:boolean = await ForgotPassword(username, pass);
    
    if(r){
      setResult("Password changed successfully");
    }else{
      setResult("Password could not be changed");
    }
  }

  const GoToLogin = () => {
    router.push("/Login");
  }

  return (
    <div>
    <h1>Forgot Password</h1>
    <h1 className={result == "Password changed successfully" ? "text-green-400" : "text-red-600"}>{result}</h1>

    <div className="mb-2 block">
      <Label htmlFor="username1" value="Username" />
    </div>
    <TextInput
      type="text"
      className="w-72 border-black"
      onChange={(e) => {setUsername(e.target.value)}}
      required
    />

    <div className="mb-2 block">
      <Label htmlFor="username1" value="Password" />
    </div>
    <TextInput
      type="password"
      className="w-72 border-black"
      onChange={(e) => {setPass(e.target.value)}}
      required
    />

    <Button onClick={Forgot}>Submit</Button>
    <a className="underline text-[#0744A0] text-sm text-center" onClick={GoToLogin} >Return to Login</a>

    </div>
  )
}

export default Page