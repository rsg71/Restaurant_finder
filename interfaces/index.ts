export interface ISignupData {
    email: string;
    password: string
}

export interface ISignupSuccess extends ISignupData {
    msg: string
}

export interface ILoginData {
    email: string;
    password: string
}

export interface ILoggedInUser {
    "email": string;
    "id": number,
    "msg": string;
}

export interface IUserRequest {
    username: string;
    id: string;
}