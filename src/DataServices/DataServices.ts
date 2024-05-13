import { CreateAccountDTO, IUserInfo, LoginDTO, TrackerDTO, UpdateUserDTO } from "./Interfaces/Interfaces"

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

const AddTracker = async (name: string, tracker:TrackerDTO) => {

    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/TrackerController/AddTracker/${name}`, {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tracker)
    });
    const data = await promise.json();
    return data;

}

const GetTrackers = async(name: string) => {
    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/TrackerController/GetTrackersByUser/${name}`);
    const data = await promise.json();
    return data;
}

const EditTracker = async(name:string, id:number, update:TrackerDTO) => {

    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/TrackerController/EditTracker/${name}/${id}`, {
        method:'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    });
    const data = await promise.json();
    return data;

}

const DeleteTracker = async(name:string, id:number) => {

    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/TrackerController/DeleteTracker/${name}/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    });
    const data = await promise.json();
    return data;

}

const GetUserData = async (user:string) => {

    try{
        const promise = await fetch(`https://caddytrackapi.azurewebsites.net/UserController/GetUserInfoByName/${user}`);
        const data:IUserInfo = await promise.json();
        return data;
    }
    catch(e){
        console.log("Cold not get user data for "+user);
        return {} as IUserInfo;
    }
}

const GetUserPfp = async (user:string) => {
    try{
        const promise = await fetch(`https://caddytrackapi.azurewebsites.net/UserController/GetUserPfp/${user}`);
        const data:string = await promise.text();
        return data;
    }
    catch(e){
        console.log(e);
        return "";
    }
}

const EditUser = async(name:string, update:UpdateUserDTO) => {

    const promise = await fetch(`https://caddytrackapi.azurewebsites.net/UserController/UpdateUser/${name}`, {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    });
    const data = await promise.json();
    return data;

}


export {Login, CreateAccount, ForgotPassword, AddTracker, GetTrackers, EditTracker, DeleteTracker, GetUserData, GetUserPfp}