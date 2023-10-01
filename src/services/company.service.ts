import { DecodedUser, User } from "../interfaces/auth.interface";
import { getAuth, Auth } from "firebase/auth";
import { firebaseApp } from '../configs/firebase';
import prisma from "../services/prisma";
import { IRegisterCompany } from "../interfaces/company.interface";

const auth: Auth = getAuth(firebaseApp);

export const addCompany = async (payload: IRegisterCompany, user: DecodedUser) => {
    try {
        const current_user = await prisma.user.findUnique({
            where: { email: user.email },
        }) as User;

        const company = await prisma.company.create({
            data: {
                ...payload,
                userId: current_user.id,
            },
        });

        return {
            code: 200,
            success: true,
            message: "successfully added new company",
            data: company
        };
    } catch (error: any) {
        if (error && error?.name === "PrismaClientValidationError") {
            return {
                code: 400,
                success: false,
                message: "One or more Invalid value",
                error: error
            }
        }
        return {
            code: 500,
            success: false,
            message: "Error occurred adding company",
            error: error
        }
    }

}

export const getOneCompany = async (companyId: string, user: DecodedUser) => {
    const current_user = await prisma.user.findUnique({
        where: { email: user?.email },
    });
    const query: { [key: string]: any } = { id: companyId };

    if (!current_user?.isAdmin) {
        query.userId = current_user?.id
    }
    const allCompanies = await prisma.company.findFirst(
        {
            where: query
        }
    )
    return {
        code: 200,
        success: true,
        message: 'all users',
        data: allCompanies
    }
}

export const getAllCompanies = async (user: DecodedUser) => {
    const current_user = await prisma.user.findUnique({
        where: { email: user?.email },
    });
    const allCompanies = !current_user?.isAdmin ?
        await prisma.company.findMany(
            {
                where: {
                    userId: current_user?.id
                }
            }
        ) : await prisma.company.findMany()

    return {
        code: 200,
        success: true,
        message: "all companies",
        data: allCompanies
    }

}

export const uploadCompanyLogo = async (file: Express.Multer.File | undefined, companyId: string) => {
    if (!file) {
        return {
            code: 400,
            success: false,
            message: "No file uploaded or file format is invalid"
        }
    }

    const updatedCompany = await prisma.company.update({
        where: { id: companyId },
        data: { logo: file?.path },
        include: { user: true },
    });

    return {
        code: 200,
        success: true,
        message: "successfully uploaded company logo",
        data: updatedCompany
    }
}