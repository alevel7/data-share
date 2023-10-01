import { ILoginCredential, IRegisterUser } from "../interfaces/auth.interface";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, Auth } from "firebase/auth";
import { firebaseApp } from '../configs/firebase';
import prisma from "../services/prisma";

const auth: Auth = getAuth(firebaseApp);

export const loginUser = async (payload: ILoginCredential) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        const user: { [key: string]: any } = userCredential.user;
        // fetch user data from db
        const userData = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        return {
            code: 200,
            success: true,
            message: `User ${user.email} is authenticated`,
            data: {
                email: user?.email,
                uid: user?.uid,
                accessToken: user?.stsTokenManager?.accessToken,
                refreshToken: user?.stsTokenManager?.refreshToken,
                ...userData
            },
        };
    } catch (error: any) {
        if (error?.code === 'auth/invalid-login-credentials') {
            return {
                code: 400,
                success: false,
                message: 'user name or password invalid'
            }
        }

        return {
            code: 500,
            success: false,
            message: "Authentication failed!,Try again",
            error: error
        }
    }

}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return {
        code: 200,
        success: true,
        message: 'all users',
        data: users
    }
}


export const registerUser = async (payload: IRegisterUser) => {
    try {
        const { email, password, firstName, lastName } = payload;
        const user = await prisma.user.upsert({
            where: { email: payload.email },
            update: { email, firstName, lastName },
            create: {
                email, firstName, lastName
            },
        });
        const newUser: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            code: 201,
            success: true,
            message: 'new user successfully added',
            data: user
        }
    } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
            return {
                code: 400,
                success: false,
                message: 'email already exists'
            }
        }
        return {
            code: 500,
            success: false,
            message: "Registration failed!,Try again",
            error: error
        }
    }
}