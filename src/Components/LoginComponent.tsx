'use client'

import React, { useEffect, useState } from "react";
import { Label, TextInput, Button, FileInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { CreateAccountDTO, LoginDTO } from "../DataServices/Interfaces/Interfaces";
import { Login, CreateAccount, GetUserData } from "../DataServices/DataServices";
import { useAppContext } from "@/Context/Context";

const LoginComponent = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [image, setImage] = useState<any>('');

  const [switchBool, setSwitchBool] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const data = useAppContext();

  useEffect(() => {
    setError(data.error);
    data.setError('');
  }, [])

    const changeBool = () => {
      setSwitchBool(!switchBool)
      setError('');
    }
  
    const handleSubmit = async () => {
      if(switchBool){
        // Login
        
        const login:LoginDTO = {
          Username: username,
          Password: password
        }
        const result = await Login(login);
  
        if(result.token != undefined){
          router.push("/Dashboard");
          data.setToken(result);
          getUserData();
        }
        else{
          setError("Username or password incorrect. Please try again.");
        }
      }
      else
      {
        // Create Acc
  
        if(username == "" || password == ""){
          setError("Please enter a username and password.");
          return;
        }
  
        const newUser:CreateAccountDTO = {
          ID:0,
          Username: username,
          Password: password,
          ProfilePicture: image
        }
  
        const result = await CreateAccount(newUser);

        if(result){
          changeBool();
        }
        else{
          setError("Could not create your account. Please try again.");
        }
      }
    }
  
    const handleFileSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
      let reader = new FileReader();
      const file = e.target.files?.[0]
  
      if(file){
        reader.onload = () => {
          setImage(reader.result);
        }
        reader.readAsDataURL(file);
      }
    }

    const handleForgot = () => {
        router.push('/ForgotPassword')
    }

    async function getUserData() {
      data.setUserItems(username);
    }

  return (
    <>
    <div className="bg-white opacity-95 rounded-xl py-5">
      <p className="text-3xl text-center pb-4 tracking-wide">{switchBool ? "Login" : "Create Account"}</p>

      <h1 className= "text-red-600 text-center px-2">{error}</h1>
      
      <form className="flex flex-col gap-4">
            <div className="mx-auto">
              <div className="mb-2 block">
                <Label htmlFor="username1" value="Username" />
              </div>
              <TextInput
                id="email1"
                type="text"
                className="w-72 border-black"
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            </div>
            <div className="mb-8 mx-auto">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                className="w-72 border-black"
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />

              <div className={switchBool ? "hidden" : "block mt-4"}>
                <Label htmlFor="file-upload" value="Add a Profile Picture" />
                <FileInput id="file-upload" onChange={e => handleFileSubmit(e)}/>
              </div>
            </div>        

            <div className="flex space-x-6 mb-4 mx-auto">
              <Button
                className="w-36 text-white border-black"
                color="blue"
                onClick={handleSubmit}
              >
                {switchBool ? "Log In" : "Create Account"}
              </Button>
              <a onClick={handleForgot} className={switchBool ? "underline text-sm my-auto cursor-pointer" : "hidden"}>
                Forget Password?
              </a>
            </div>
            <div className="mx-auto">
              <a
                className="underline text-[#0744A0] text-sm text-center cursor-pointer"
                onClick={changeBool}
              >
                {switchBool ? "Don't Have An Account? Click Here" : "Already have an account? Click Here"}
              </a>
            </div>
          </form>
          </div>
    </>
    
  )
}

export default LoginComponent