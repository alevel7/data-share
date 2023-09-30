import { Router } from "express";
import UserController from "../controllers/user.controller";



const routes = Router();

routes.post('/register', UserController.register)
routes.post('/login', UserController.login);
routes.get('/', UserController.allUsers);

export default routes;