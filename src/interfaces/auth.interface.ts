import { Request, Response } from "express";

export interface AuthRequest extends Request {
    user?: DecodedUser;
    userLocalData?: User | null;
}
export interface DecodedUser {
    iss: string;
    aud: string;
    auth_time: number;
    user_id?: string;
    sub: string;
    iat: number;
    exp: number;
    email?: string;
    email_verified?: boolean,
    uid: string;
}


export interface ILoginCredential {
    email: string;
    password: string;
}

export interface IRegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    createdAt: Date;
}