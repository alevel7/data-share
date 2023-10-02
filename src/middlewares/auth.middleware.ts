// import * as firebase from "firebase-admin";
import firebase from "../configs/firebase.config";
import { NextFunction, Request, Response } from "express";
import { AuthRequest, User } from "../interfaces/auth.interface";
import prisma from "../services/prisma";

const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction) => {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.status(401).send({ message: "No token provided" }).status(401);
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        return response.status(401).send({ message: "Invalid token" }).status(401);
    }

    const token = headerToken.split(" ")[1];
    firebase
        .auth()
        .verifyIdToken(token)
        .then((decodeValue) => {
            // append user data from google to request object
            request.user = decodeValue
            // append user data from local db to request object
            prisma.user.findUnique({
                where: { email: decodeValue?.email },
            }).then((user: User | null) => {
                request.userLocalData = user;
                next();
            })
                .catch(() => response.status(401).send({ message: "User credential not found, pls Register" }))
        })
        .catch(() => response.status(403).send({ message: "Unable to verify user, pls login again" }));
}

export const isAdmin = (request: AuthRequest, response: Response, next: NextFunction) => {
    if (!request.userLocalData?.isAdmin) {
        return response.status(403).json({ message: "forbidden!" })
    }
}


export default authMiddleware;