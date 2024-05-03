'use client'
import { IUserInfo } from "@/DataServices/Interfaces/Interfaces";
import { createContext, useContext, useState } from "react"
export const Context = createContext<IContextValue>({} as IContextValue);

interface IContextValue {
    user: string,
    setUser: (user: string) => void,
    userInfo: IUserInfo,
    setUserInfo: (user: IUserInfo) => void
}


export const AppWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [user, setUser] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);

    return (
        <Context.Provider value={{user, setUser, userInfo, setUserInfo}}>
            {children}
        </Context.Provider>
    )
    
}

export const useAppContext = () => {
    return useContext(Context);
}