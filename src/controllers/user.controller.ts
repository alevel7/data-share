import { Request, Response } from "express";
import { loginValidator, RegisterValidator } from '../validators';
import * as userService from '../services/user.service';
let Validator = require('validatorjs');


class UserController {
    async register(req: Request, res: Response) {

        let validation = new Validator(req.body, RegisterValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }

        const serviceResponse = await userService.registerUser(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async login(req: Request, res: Response) {
        let validation = new Validator(req.body, loginValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }

        const serviceResponse = await userService.loginUser(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async allUsers(req: Request, res: Response) {
        const serviceResponse = await userService.getAllUsers();
        return res.status(serviceResponse.code).json(serviceResponse);
    }
}

export default new UserController();