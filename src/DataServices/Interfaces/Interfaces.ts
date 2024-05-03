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

export interface ITrackerModel {
    ID: number,
    UserModelID: number,
    Name: string,
    StockYardage: number,
    MaxYardage: number,
    ConfidenceLevel: number
}

export interface IUserInfo {
    UserID: number,
    Username: string,
    ProfilePicture: string,
    Trackers: ITrackerModel[]
}