import express, { Express } from 'express';
import cors from 'cors';

// Middlewares added to Express App should go here.
export const coreMiddlewares = [
    cors(),
    express.json()
];

export class Kernel {
    
    public static registerCoreMiddlewares(app:Express) {
        coreMiddlewares.forEach((middleware) => {
            app.use(middleware);
        });
    }

}