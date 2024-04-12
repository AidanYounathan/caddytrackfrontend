
import { CreateAccountDTO, LoginDTO, MessageDTO } from "./Interfaces/Interfaces"

const Login = async (loginDTO : LoginDTO) => {
    
    const promise = await fetch('https://caddytrackapi.azurewebsites.net/UserController/Login', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDTO)
    });
    const data = await promise.json();
    return data;
}

const CreateAccount = async(createDTO : CreateAccountDTO) => {

    const promise = await fetch('https://caddytrackapi.azurewebsites.net/UserController/AddUser', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createDTO)
    });
    const data = await promise.json();
    return data;

}

const GetChatMessages = async(chat: string) => {
    const promise = await fetch('https://caddytrackapi.azurewebsites.net/ChatroomController/GetMessagesFromChatroom/'+chat);
    const data = await promise.json();
    return data;
}

const SendMessage = async(message : MessageDTO) => {

}

const ForgotPassword = async(name:string, newPass:string) => {

    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/UserController/UpdateUserPassword/${name}/${newPass}`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    });
    const data = await promise.json();
    return data;
    
}

export {Login, CreateAccount, GetChatMessages, ForgotPassword}
