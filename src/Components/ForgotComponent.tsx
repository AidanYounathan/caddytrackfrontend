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

        if (pass == "" || username == "") {
            setResult("Please fill out all fields.");
            return;
        }

        const r: boolean = await ForgotPassword(username, pass);

        if (r) {
            setResult("Password changed successfully");
        } else {
            setResult("Password could not be changed");
        }
    }

    const GoToLogin = () => {
        router.push("/Login");
    }

    return (
        <>

            <div className="bg-white opacity-95 rounded-xl py-5">
                <h1 className="text-3xl text-center pb-4 tracking-wide">Forgot Password</h1>
                <h1 className={result == "Password changed successfully" ? "text-green-400" : "text-red-600"}>{result}</h1>

                <form className="flex flex-col gap-4">

                    <div className="mx-auto">
                        <div className="mb-2 block">
                            <Label htmlFor="username1" value="Username" />
                        </div>
                        <TextInput
                            type="text"
                            className="w-72 border-black"
                            onChange={(e) => { setUsername(e.target.value) }}
                            required
                        />


                    </div>

                    <div className="mx-auto">
                        <div className="mb-2 block">
                            <Label htmlFor="username1" value="Password" />
                        </div>
                        <TextInput
                            type="password"
                            className="w-72 border-black"
                            onChange={(e) => { setPass(e.target.value) }}
                            required
                        />



                    </div>

                    <div className="flex space-x-6 mb-4 mx-auto">
                        <Button className="w-36 text-white border-black"
                            color="blue" onClick={Forgot}>Change</Button>
                        <a className="underline text-[#0744A0] text-sm text-center cursor-pointer" onClick={GoToLogin} >Return to Login</a>

                    </div>






                </form>
            </div>
        </>
    )
}

export default Page