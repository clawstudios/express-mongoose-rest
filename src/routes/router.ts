// Deps
import { Express } from 'express';

// Controllers
import { UserController } from '../controllers/user/user';

// Middlewares


export enum HTTP_METHODS {
    GET,
    POST,
    UPDATE,
    DELETE
}

export const ROUTES:Array<any>  = [
    {
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.GET,
        controller: UserController.get
    },
    {
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.POST,
        controller: UserController.create
    },
    {
        url: '/users/:id',
        middlewares: [],
        method: HTTP_METHODS.GET,
        controller: UserController.getUser
    },
    {
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.UPDATE,
        controller: UserController.update
    },
    {
        url: '/users/:id',
        middlewares: [],
        method: HTTP_METHODS.DELETE,
        controller: UserController.delete
    },
];

export class Router {
    
    public static registerRoutes(app:Express) {
        ROUTES.forEach((route) => {
            let method = this.resolveMethod(route.method);

            if (route.middlewares.length > 0) {
                route.middlewares.forEach((middleware) => {
                    app.use(route.url, middleware.canActivate);
                });
            }

            app[method](route.url, route.controller);
        });
    }

    private static resolveMethod(enumMethod) {
        let out;
        
        switch(enumMethod) {
            case HTTP_METHODS.GET:
                out = 'get';
                break;
            case HTTP_METHODS.POST:
                out = 'post';
                break;
            case HTTP_METHODS.UPDATE:
                out = 'put';
                break;
            case HTTP_METHODS.DELETE:
                out = 'delete';
                break;
            default:
                out = 'get';
                break;
        }

        return out;
    }
}