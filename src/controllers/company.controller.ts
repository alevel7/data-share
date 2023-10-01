import { Request, Response } from "express";
import prisma from "../services/prisma";
import { AuthRequest, DecodedUser } from "../interfaces/auth.interface";
import * as companyService from '../services/company.service';
import { Company } from "../interfaces/company.interface";
import { NewCompanyValidator } from "../validators";

let Validator = require('validatorjs');

class CompanyController {
    async addCompany(req: AuthRequest, res: Response) {
        const payload = req.body;

        let validation = new Validator(req.body, NewCompanyValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }
        const serviceResponse = await companyService.addCompany(req.body, req.user as DecodedUser);
        return res.status(serviceResponse.code).json(serviceResponse);

    }
    async getOneCompany(req: AuthRequest, res: Response) {
        const serviceResponse = await companyService.getOneCompany(req.params.companyId, req.user as DecodedUser);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async getAllCompanies(req: AuthRequest, res: Response) {
        const serviceResponse = await companyService.getAllCompanies(req.user as DecodedUser);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async uploadCompanyLogo(req: Request, res: Response) {
        if (!req.params.companyId) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "company id must be specified"
            })
        }
        const serviceResponse = await companyService.uploadCompanyLogo(req.file, req.params.companyId);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
}

export default new CompanyController();