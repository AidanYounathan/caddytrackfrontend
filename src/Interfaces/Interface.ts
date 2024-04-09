
export interface IUser {
    Username: string,
    Password: string

}

export interface IToken {
    token: string
}

export interface IUserInfo {
    Username: string,
    Password: string,
    Email: string
}

export interface IForgot {
    Username: string,
    NewPassword: string

}