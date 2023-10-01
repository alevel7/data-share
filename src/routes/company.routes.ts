import { Router } from "express";
import CompanyController from "../controllers/company.controller";
import { fileUpload } from "../middlewares/fileUpload.middleware";
import { isAdmin } from "../middlewares/auth.middleware";


const routes = Router();

routes.get('/', CompanyController.getAllCompanies);
routes.get('/:companyId', CompanyController.getOneCompany);
routes.post('/', CompanyController.addCompany)
routes.put('/:companyId', isAdmin, fileUpload, CompanyController.uploadCompanyLogo);

export default routes;