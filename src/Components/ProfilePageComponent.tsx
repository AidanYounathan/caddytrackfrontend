"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarComponent from "./NavBarComponent";
import { useAppContext } from "@/Context/Context";
import defaultPFP from "../../public/defaultPFP.jpg";
import Image from "next/image";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import {
  CreateAccountDTO,
  LoginDTO,
} from "@/DataServices/Interfaces/Interfaces";
import { EditUser } from "@/DataServices/DataServices";

const ProfilePageComponent = () => {
  const data = useAppContext();
  const router = useRouter();

  const [image, setImage] = useState<any>("");
  const [newName, setNewName] = useState<string>(data.user);
  const [password, setPassword] = useState<string>("");

  const [res, setRes] = useState<boolean | null>(null);

  const handleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const file = e.target.files?.[0];

    if (file) {
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const changeProfile = async () => {

      const update = {
        Username: newName,
        Password: password,
        ProfilePicture: image
    }

    const result = await EditUser(data.user, update);
    setRes(result); 
    data.setUserItems(newName);
  }

  return (
    <>
      <div className="bg-white opacity-95 rounded-xl py-5 flex justify-center">
        <div className="w-4/5 md:w-3/5 lg:w-2/5 ">
          <h1 className="text-3xl text-center pb-4 tracking-wide">
            {data.user}
          </h1>

          <div className="flex justify-center">
            <Image
              className="w-14 mr-2 lg:w-16 h-14 lg:h-16  rounded-full"
              src={
                data.userInfo.profilePicture == "" ||
                data.userInfo.profilePicture == null
                  ? defaultPFP
                  : data.userInfo.profilePicture
              }
              width={100}
              height={100}
              alt=""
            />
          </div>
          <br />
              <p className={res ? "text-green-400" : "text-red-600"}> { res != null ? {res} ? "Profile changed successfully!" : "Could not update your profile. Please try again" : ""} </p>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Change User Name" />
            </div>
            <TextInput id="name" type="text" placeholder="New User Name" value={newName} onChange={(e) => {setNewName(e.target.value); setRes(null)}} />
          </div>

          <br />

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Change Password" />
            </div>
            <TextInput id="password" type="text" placeholder="New Password" value={password} onChange={(e) => {setPassword(e.target.value); setRes(null)}} />
          </div>

          <div className=" mb-8 mx-auto block mt-4">
            <Label htmlFor="file-upload" value="Update Profile Picture" />
            <FileInput id="file-upload" onChange={(e) => {handleFileSubmit(e); setRes(null)}} />
          </div>
          <div className="flex space-x-6 mb-4 mx-auto">
            <Button className="w-36 text-white border-black" color="blue" onClick={changeProfile}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageComponent;
