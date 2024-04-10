export interface CreateAccountDTO {
    ID: number
    Username: string
    Password: string
    ProfilePicture: string
}

export interface LoginDTO {
    Username: string
    Password: string
}

export interface Message {
    id: number,
    userID: number,
    chatroomModelID: number,
    message: string,
    publisherName: string
}

export interface MessageDTO {
    message: string
}