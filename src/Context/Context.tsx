'use client'
import { GetUserData } from "@/DataServices/DataServices";
import { IUserInfo } from "@/DataServices/Interfaces/Interfaces";
import { createContext, useContext, useEffect, useState } from "react"
import {useRouter, usePathname} from "next/navigation";
export const Context = createContext<IContextValue>({} as IContextValue);

interface IContextValue {
    user: string
    setUser: (user: string) => void
    userInfo: IUserInfo,
    setUserInfo: (user: IUserInfo) => void
    setUserItems: (n: string) => void
    logout: () => void
    resetUserInfo:() => void
    setToken: (n:string) => void
    checkToken: () => void
    error: string
    setError: (n:string) => void
}


export const AppWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [user, setUser] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const path = usePathname();

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
        router.push("/Login");
        sessionStorage.clear();
        setUser("");
        setUserInfo({} as IUserInfo);
    }

    async function resetUserInfo() {
        const d = await GetUserData(user);
        setUserInfo(d);
    }

    function setToken(n: string){
        sessionStorage.setItem("token", n);
    }

    function checkToken(){
        if(path != "/Login" && path != "/"){

            const token = sessionStorage.getItem("token");
            if(token  == undefined){
                router.push("/Login");
                setError("Please Login.");
            }

        }
    }

    useEffect(() => {
        getSessionStorage();
        checkToken();
    }, [])

    return (
        <Context.Provider value={{user, setUser, userInfo, setUserInfo, setUserItems, logout, resetUserInfo, setToken, checkToken, error, setError}}>
            {children}
        </Context.Provider>
    )
    
}

export const useAppContext = () => {
    return useContext(Context);
}