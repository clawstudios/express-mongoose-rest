
// Deps
import { Express } from 'express';
import { Route } from './route';
import { HTTP_METHODS } from './methods';

// Routes
import { USER_ROUTES } from '../user';

export class Router {

    static ROUTES:Array<Array<Route>> = [
        USER_ROUTES
    ];

    public static registerRoutes(app:Express) {
        this.ROUTES.forEach((routes) => {
            routes.forEach((route) => {
                let method = this.resolveMethod(route.method);

                if (route.middlewares.length > 0) {
                    route.middlewares.forEach((middleware) => {
                        app.use(route.url, middleware.canActivate);
                    });
                }

                app[method](route.url, route.controller);
            });
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