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

export interface TrackerDTO {
    name: string,
    stockYardage: number,
    maxYardage: number,
    confidenceLevel: number
}