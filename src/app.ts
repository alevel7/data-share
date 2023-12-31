import express from 'express'
import { companyRoutes, userRoutes } from './routes';
import authMiddleware from './middlewares/auth.middleware'

const cors = require('cors');
class App {
    public server;

    constructor() {
        this.server = express();
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use('/uploads', express.static('uploads'));
        this.server.use(cors())
    }

    routes() {
        this.server.use('/api/users', userRoutes);
        this.server.use('/api/companies', authMiddleware, companyRoutes);
    }
}

export default new App().server;