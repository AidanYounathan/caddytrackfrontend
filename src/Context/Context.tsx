'use client'
import { GetUserData } from "@/DataServices/DataServices";
import { IUserInfo } from "@/DataServices/Interfaces/Interfaces";
import { createContext, useContext, useEffect, useState } from "react"
import {useRouter} from "next/navigation";
export const Context = createContext<IContextValue>({} as IContextValue);

interface IContextValue {
    user: string
    token: string
    setUser: (user: string) => void
    userInfo: IUserInfo,
    setUserInfo: (user: IUserInfo) => void
    setUserItems: (n: string) => void
    logout: () => void
    resetUserInfo:() => void
    setToken: (n: string) => void
}


export const AppWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);
    const router = useRouter();

    async function getSessionStorage() {

        const item = sessionStorage.getItem("user");

        if(item != "" && item != null){
            setUser(item);
            setUserInfo(await GetUserData(item));
        }
        

    }

    async function setUserItems(n:string){
        setUser(n);
        setUserInfo(await GetUserData(n));
        sessionStorage.setItem("user", n);
    }

    function logout() {
        sessionStorage.clear();
        setUser("");
        setUserInfo({} as IUserInfo);
        router.push("/Login");
    }

    async function resetUserInfo() {
        const d = await GetUserData(user);
        setUserInfo(d);
    }

    useEffect(() => {
        getSessionStorage();
    }, [])

    return (
        <Context.Provider value={{user, setUser, userInfo, setUserInfo, setUserItems, logout, resetUserInfo, token, setToken}}>
            {children}
        </Context.Provider>
    )
    
}

export const useAppContext = () => {
    return useContext(Context);
}