import { Route } from './core/route';

// Controllers
import { UserController } from '../controllers/user/user';

// Middlewares
import { HTTP_METHODS } from './core/methods';

export const USER_ROUTES:Array<any>  = [
    new Route({
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.GET,
        controller: UserController.get
    }),
    new Route({
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.POST,
        controller: UserController.create
    }),
    new Route({
        url: '/users/:id',
        middlewares: [],
        method: HTTP_METHODS.GET,
        controller: UserController.getUser
    }),
    new Route({
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.UPDATE,
        controller: UserController.update
    }),
    new Route({
        url: '/users/:id',
        middlewares: [],
        method: HTTP_METHODS.DELETE,
        controller: UserController.delete
    }),
];